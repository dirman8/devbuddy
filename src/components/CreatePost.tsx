import { useState } from 'react';
import algoliasearch from "algoliasearch";
import { useAuth } from '../utils/lib/AuthUserProvider';
import firebase from "../utils/db/firebaseConfig";
import 'firebase/firestore';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { authUser } = useAuth();

    const db = firebase.firestore();
    const algoliaClient = algoliasearch('76OUI9Z29U', '24edbfefcec4e973fedaf2dbfb5b2468')
    const algoliaIndex = algoliaClient.initIndex('member-search');

    async function handleSubmit(event) {
        console.log("form has been submitted");

        event.preventDefault();
        const postRef = await db.collection("users/${uid}/code").doc();
        console.log("post ref :", postRef)

        // Send the form data to Algolia
        const record = {
            User: authUser.uid,
            objectID:  postRef.id,
            title: title,
            content: content,
            searchableData: title + ' ' + content
        }

        await algoliaIndex.saveObject(record);

        // Send the form data (post) to Firestore
        postRef.set({
            User: authUser.uid,
            postId: postRef.id,
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then(() => {
            setTitle('');
            setContent('');
            })
            .catch((error) => {
            console.error("Error creating post: ", error);
        });
    }

    
    return (
        <div className="w-4/6 m-auto flex flex-col items-left pl-44 mt-20">
            <h1 className='font-bold text-2xl mb-6 pl-24'>Send your snippet</h1>
            <form className="flex flex-col " onSubmit={handleSubmit}>
                <label className='mb-4 ml-3' >
                Tittle: 
                <input className='w-72 p-2 rounded-sm border ml-8' type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <label className='mb-2 ml-3 flex items-top' >
                Content:
                <textarea className='w-72 p-2 rounded-sm border ml-3' value={content} onChange={(event) => setContent(event.target.value)} />
                </label>
                <button className='bg-red-300 rounded shadow-lg w-40 p-2 ml-32 mt-6' type="submit" >Submit</button>
            </form>
        </div>
    )
    }

export default CreatePost