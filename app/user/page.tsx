import UserPosts from "@/components/user/posts"
import UserInfo from "@/components/user/userInfo"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: "User Rate Things"
}

export default function UserPage() {

    return (
        <>
            <UserInfo />
            <Suspense fallback={<div className="text-black">Sabar yaa datanya lagi diambil...</div>}>
                <UserPosts />
            </Suspense>
        </>
    )
}