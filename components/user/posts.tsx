"use client"

import { auth, db } from "@/config/firebase"
import { StarFilled, DeleteFilled } from "@ant-design/icons"
import { onAuthStateChanged } from "firebase/auth"
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import swal from "sweetalert"

type Things = {
    id: string,
    author: string,
    authorId: string,
    createdAt: string,
    desc: string,
    file: string,
    isAnonim: boolean,
    tag: string,
    title: string
}

export default function UserPosts() {

    const [thingsData, setThingsData] = useState<Things[]>()

    async function getThings(userId: string) {
        try {
            onSnapshot(query(
                collection(db, "things"),
                orderBy("createdAt", "desc"),
                where("authorId", "==", userId)
            ), (snapshot) => {
                const temp: Things[] = []
                snapshot.forEach((data) => {
                    temp.push({ ...data.data() as Things, id: data.id })
                })
                setThingsData(temp)
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                toast.error("Somethings went wrong!")
            }
        }
    }

    async function deletePost(postId: string) {
        try {
            const alert = await swal({
                icon: 'warning',
                title: "Delete this thing?",
                buttons: ["No", "Yes"]
            })

            if (alert) {
                const docRef = doc(db, "things", postId)
                await deleteDoc(docRef)
                toast.success("Deleted successfully")
            }
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
                getThings(user.uid)
            }
        })

        return () => subs()
    }, [])

    return (
        <>
            <ToastContainer
                theme="dark"
                position="bottom-right"
            />
            <div className="w-full sm:w-[90%] mx-auto mt-4 p-5 sm:p-10 flex justify-center gap-5 flex-wrap">

                {thingsData?.map((i, index) =>
                    <div key={index} className="w-full m-1 sm:w-[350px] bg-[#FBF8EF] rounded-2xl shadow-md h-[350px] p-4 cursor-pointer hover:scale-[1.1] transition-all">
                        <div className="w-full flex gap-3 font-semibold select-none">
                            <p className="bg-amber-400 shadow shadow-[grey] p-1 px-2 rounded-md">{new Date(i.createdAt).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
                            <p className="bg-green-400 shadow shadow-[grey] p-1 px-2 rounded-md">{i.tag}</p>
                            <p onClick={() => deletePost(i.id)} className="bg-red-400 shadow shadow-[grey] p-1 px-2 rounded-md"><DeleteFilled></DeleteFilled></p>
                        </div>
                        <div className="w-full mb-2 h-[60%] relative mt-3">
                            <Image src={i.file} sizes="100%" priority={true} fill className="select-none object-cover hover:object-contain rounded-2xl" alt="Photo"></Image>
                        </div>
                        <small>{i.isAnonim ? "Someone" : i.author}</small>
                        <p className="font-semibold">{i.title}</p>
                        <p className="mt-1 text-yellow-500"> <StarFilled></StarFilled> <span className="text-black">3.4/5</span></p>
                    </div>
                )}

            </div>
        </>
    )
}