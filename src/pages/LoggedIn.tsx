import { useAuth } from "@/utils/lib/AuthUserProvider"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Search from "../components/Search";
import CreatePost from "../components/CreatePost";


const LoggedIn = () => {

    const { authUser, loading, signOut } = useAuth();
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    const showCreatePost = () => {
      setShowForm(true);
    };
    const closeCreatePost = () => {
      setShowForm(false);
    };
    
    useEffect(() => {
        if(!loading && !authUser)
            router.push('/')
    },[authUser, loading,router])

    return (
    <div className="h-screen">
      <div>
        <div className="flex justify-between mt-3">
          <button onClick={signOut} className='bg-blue-300 rounded shadow-lg w-40 p-2 mx-3'>Sign out</button>
          <button onClick={showCreatePost}>Create Post</button>
        </div>
        <Search />
      </div>

        {showForm && (() => (
          <div className="absolute w-screen h-screen bg-white bg-opacity-90 top-0 right-0 pt-40 z-50 flex justify-center items-center shadow-xl" >
              <button className="absolute top-20 right-20 p-2" onClick={closeCreatePost}>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fill-rule="evenodd" d="M12.7 10l6.65-6.65a1 1 0 1 0-1.42-1.42L11.3 8.58 4.65 1.93a1 1 0 0 0-1.42 1.42L8.88 10l-6.65 6.65a1 1 0 0 0 1.42 1.42L10 11.42l6.65 6.65a1 1 0 0 0 1.42-1.42L12.7 10z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <CreatePost />
            </div>
          ))()
        }
      {/* </div> */}

    </div>
    )
}

export default LoggedIn;