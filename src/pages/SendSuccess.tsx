import CreatePost from "../components/CreatePost";
import { useRouter } from "next/router";

const SendSuccess = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-6">Your snippet has been sent !</h1>
      <p>Sent another snippet</p>
        {/* <button className='bg-red-300 rounded shadow-lg w-40 p-2 ml-3 mb-5' type='button' onClick={showCreatePost}>Send Snippet</button> */}
      <p>Back to Main Page</p>
        <button className='bg-blue-300 rounded shadow-lg w-40 p-2 ml-3' type='button' onClick={() => router.push("/LoggedIn")}>Main Page</button>
    </div>
  )
}

export default SendSuccess
