"use client"

import { useEffect, useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateButton() {
    const router = useRouter()
    const [toggle, setToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                router.push("/")
            }
        })

        return () => subs()
    }, [router])

    async function loginGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)

            toast.success("Login successfully.")
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                toast.error("Something went wrong.")
            }
        }
    }

    async function logOut() {
        try {
            await signOut(auth)
            toast.success("Logout successfully")
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                toast.error("Something went wrong.")
            }
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                theme="dark"
            />
            <div className="fixed w-34 p-4 top-2 right-[-20px] sm:right-2 flex flex-col items-center">
                {!isLoggedIn && (<div onClick={() => loginGoogle()} className="w-12 h-12 rounded-full cursor-pointer bg-black text-white flex justify-center items-center"><FcGoogle className="text-2xl" /></div>)}
                {isLoggedIn && (<>
                    <div onClick={() => setToggle(!toggle)} className="w-12 h-12 rounded-full cursor-pointer bg-black text-white flex justify-center items-center"><UserOutlined className="text-2xl" /></div>

                    <div className={`flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${toggle ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                        <Link href={"/"}><button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Home</button></Link>
                        <Link href={"/user"}><button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Profile</button></Link>
                        <button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Create</button>
                        <button onClick={() => logOut()} className="bg-[red] transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-[red] px-5 py-2 rounded-lg">Logout</button>
                    </div>
                </>)}
            </div>
        </>
    )
}
