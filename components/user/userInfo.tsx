"use client"

import { auth, db } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type Things = {
    author: string,
    authorId: string,
    createdAt: string,
    desc: string,
    file: string,
    isAnonim: boolean,
    tag: string,
    title: string
}

type User = {
    displayName: string
    email: string
    photoUrl: string
}

export default function UserInfo() {

    const router = useRouter()
    const [userData, setUserData] = useState<User>({
        displayName: "Loading...",
        email: "Loading...",
        photoUrl: "/vercel.svg",
    })
    const [postCount, setPostCount] = useState<number>(0)

    async function getPostCount(authorId: string) {
        try {
            const data = await getDocs(query(collection(db, "things"), where("authorId", "==", authorId)))
            const temp: Things[] = []
            data.forEach((data) => {
                temp.push({...data.data() as Things})
            })
            setPostCount(temp.length)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                toast.error("Somethings went wrong!")
            }
        }
    }

    useEffect(() => {
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                const data: User = {
                    displayName: user.displayName!,
                    email: user.email!,
                    photoUrl: user.photoURL!,
                }
                getPostCount(user.uid)
                setUserData(data)
            } else {
                router.push("/")
            }
        })

        return () => subs()
    }, [router, postCount])

    return (
        <>
            <ToastContainer
                theme="dark"
                position="bottom-right"
            />
            <div className="w-9/12 p-6 bg-amber-50 mt-10 mx-auto flex flex-col sm:flex-row gap-6 rounded-4xl shadow shadow-black">
                <div className="w-[72px] h-[72px]  rounded-full">
                    <Image className="rounded-full" width={72} height={72} src={userData.photoUrl} alt={userData.displayName} />
                </div>
                <div className="w-full sm:w-1/2">
                    <p className="text-xl sm:text-3xl">{userData?.displayName}</p>
                    <p>{userData?.email}</p>
                    <small>{postCount} Posts</small>
                </div>
            </div>
        </>
    )
}