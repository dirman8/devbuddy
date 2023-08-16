import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Dev Buddy</title>
        <meta name="description" content="A Web Developer Buddy " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/db.ico" />
      </Head>

      <main className={styles.main}>
        <div className='h-screen flex justify-center'>
          <div className='mt-56'>
            <h1 className='text-6xl text-center'>Welcome to Dev Buddy</h1>
            <h2 className='text-center mt-2'>A Buddy for Every Web Developer</h2>
            <div className='mt-5 flex justify-center'>
              <button className='bg-blue-300 rounded shadow-lg w-40 p-2 mr-3' type='button' onClick={() => router.push("/LogIn")} >Login</button>
              <button className='bg-red-300 rounded shadow-lg w-40 p-2 ml-3' type='button' onClick={() => router.push("/SignUp")}>Sign Up</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
