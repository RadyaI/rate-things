import UserInfo from "@/components/user/userInfo"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "User Rate Things"
}

export default function UserPage() {
    return (
        <>
            <UserInfo />
        </>
    )
}