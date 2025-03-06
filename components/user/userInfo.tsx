"use client"

import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

    useEffect(() => {
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                const data: User = {
                    displayName: user.displayName!,
                    email: user.email!,
                    photoUrl: user.photoURL!,
                }
                setUserData(data)
            } else {
                router.push("/")
            }
        })

        return () => subs()
    }, [])

    return (
        <>
            <div className="w-9/12 p-6 mt-10 mx-auto flex flex-col sm:flex-row gap-6 rounded-4xl shadow shadow-black">
                <div className="w-[72px] h-[72px]  rounded-full">
                    <Image className="rounded-full" width={72} height={72} src={userData.photoUrl} alt={userData.displayName} />
                </div>
                <div className="w-full sm:w-1/2">
                    <p className="text-xl sm:text-3xl">{userData?.displayName}</p>
                    <p>{userData?.email}</p>
                    <small>0 Posts</small>
                </div>
            </div>
        </>
    )
}