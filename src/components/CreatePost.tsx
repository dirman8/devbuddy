import { useState } from 'react';
import { useAuth } from '../utils/lib/AuthUserProvider';
import firebase from "../utils/db/firebaseConfig";
import algoliaIndex from "../utils/db/algoliaConfig";
import { useRouter } from "next/router";
import 'firebase/firestore';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { authUser } = useAuth();
    const db = firebase.firestore();
    const router = useRouter();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSnippetForm, setShowSnippetForm] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();
        const postRef = await db.collection(`users/${authUser.uid}/code`).doc();

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
            setShowSuccessMessage(true);
            setShowSnippetForm(false)
            })
            .catch((error) => {
            console.error("Error creating post: ", error);
        });
    }

    const sendAnotherSnippet = () => {
        setShowSnippetForm(true);
        setShowSuccessMessage(false)
    }

    
    return (
        <div className="w-4/6 m-auto flex flex-col items-left pl-44 mt-20">
            {showSnippetForm && <div>
                <h1 className='font-bold text-2xl mb-6 pl-24'>Send your snippet</h1>
                <form className="flex flex-col " onSubmit={handleSubmit}>
                    <label className='mb-4 ml-3' >
                    Title: 
                    <input className='w-72 p-2 rounded-sm border ml-10' type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </label>
                    <label className='mb-2 ml-3 flex items-top' >
                    Content:
                    <textarea className='w-72 p-2 rounded-sm border ml-3' value={content} onChange={(event) => setContent(event.target.value)} />
                    </label>
                    <button className='bg-red-300 rounded shadow-lg w-40 p-2 ml-32 mt-6' type="submit" >Submit</button>
                </form>
            </div>}
            {showSuccessMessage && 
            <div>
                <p className='ml-16 mt-6 text-2xl '>Your snippet has been sent!</p>
                <button className='bg-red-300 rounded shadow-lg w-40 p-2 ml-32 mt-6' onClick={sendAnotherSnippet} >Send another snippet</button>
            </div>
            }
        </div>
    )
    }

export default CreatePost