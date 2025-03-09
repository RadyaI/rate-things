"use client"

import { db } from "@/config/firebase"
import { StarFilled } from "@ant-design/icons"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

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

export default function Content() {
    const [thingsData, setThingsData] = useState<Things[]>();
    const router = useRouter()

    async function getThings() {
        try {
            onSnapshot(query(
                collection(db, "things"),
                orderBy("createdAt", "desc")
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

    useEffect(() => {
        getThings()
    }, [])

    if (!thingsData) return <div className="text-center">Sabar yaa lagi ambil data...</div>;

    return (
        <>
            <ToastContainer theme="dark" position="bottom-right" />
            <div className="w-full sm:w-[90%] mx-auto mt-4 p-5 sm:p-10 flex justify-center gap-5 flex-wrap">
                {thingsData.map((i, index) =>
                    <div onClick={() => router.push(`/v/${i.id}`)} key={index} className="w-full m-1 sm:w-[300px] bg-[#FBF8EF] rounded-2xl shadow-md h-[350px] p-4 cursor-pointer hover:scale-[1.1] transition-all">
                        <div className="w-full flex gap-3 font-semibold select-none">
                            <p className="bg-amber-400 shadow shadow-[grey] p-1 px-2 rounded-md">{new Date(i.createdAt).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
                            <p className="bg-green-400 shadow shadow-[grey] p-1 px-2 rounded-md">{i.tag}</p>
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
