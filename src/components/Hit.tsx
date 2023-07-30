import React, { ReactNode, useEffect, useRef, useState } from 'react';

import CodeCard from './CodeCard';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import firebase from "../utils/db/firebaseConfig";
import 'firebase/firestore';
import { useAuth } from '../utils/lib/AuthUserProvider';
import algoliaIndex from "../utils/db/algoliaConfig";

const Hit = () => {
    const language = 'javascript';
    const gridRef = useRef(null);
    const {results} = useInstantSearch();
    const { authUser } = useAuth();
    const db = firebase.firestore();

      //This state to trigger rerender when delete button clicked
    const [rerenderTrigger, setRerenderTrigger] = useState(false);
      // This state to track the deleted object ID
    const [deletedObjectId, setDeletedObjectId] = useState(null);

    //Delete Post
    async function handleDelete(postId) {
    try {
        console.log(algoliaIndex)
        // await db.collection(`users/${authUser.uid}/code`).doc(postId).delete();
        await algoliaIndex.deleteObject(postId);
        setRerenderTrigger(prev => !prev);
        console.log("Post deleted successfully!");
        setDeletedObjectId(postId);
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
}

console.log("results :", results)

  useEffect(() => {
    const masonryLayout = async () => {
      if (typeof window!=='undefined' && gridRef.current) {
        const { default: Masonry } = await import('masonry-layout');
        new Masonry(gridRef.current, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: true,
          });
    }
  }
  masonryLayout();
  }, [results.hits]);

    return (
      <div ref={gridRef} className="grid">
        <div className='grid-sizer w-1/6'></div>
          {results.hits
          .filter((hit) => hit.objectID !== deletedObjectId)
          .map((hit)=>(
            <div key={hit.objectID} className='grid-item w-2/6 p-2 '>
              <h1 className='text-white text-center p-4 bg-indigo-950 rounded-t-md'>{hit.title as ReactNode}</h1>
              <CodeCard code={hit.content} language={language}/>
              <button className="bg-red-300 rounded shadow-lg w-40 p-2 ml-32 mt-2 mb-6" onClick={() => handleDelete(hit.objectID)}>Delete Snippet</button>
            </div>
          ))}
      </div>

    )
}

export default Hit