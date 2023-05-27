import { useRouter } from "next/router"
import { useAuth } from "@/utils/lib/AuthUserProvider"

const WelcomeMember = () => {
    const router = useRouter();
    const {authUser}= useAuth();

  return (
    <div className="h-screen flex justify-center items-center">
        <h1>Hi, {authUser?.email} Your Sign Up Process Success !</h1>
        <div className="">
            <button className='bg-blue-300 rounded shadow-lg w-40 p-2 ml-6 mr-3' onClick={()=>router.push('./LogIn')}>Go to Log In</button>
        </div>
    </div>
  )
}

export default WelcomeMember