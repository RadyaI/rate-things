"use client"

import { StarFilled } from "@ant-design/icons"
import Image from "next/image"

export default function Content() {
    return (
        <>
            <div className="w-full sm:w-[90%] mx-auto mt-4 p-5 sm:p-10 flex justify-center gap-5 flex-wrap">

                <div className="w-full m-1 sm:w-[300px] bg-[#FBF8EF] rounded-2xl shadow-md h-[350px] p-4 cursor-pointer hover:scale-[1.1] transition-all">
                    <div className="w-full flex gap-3 font-semibold select-none">
                        <p className="bg-amber-400 shadow shadow-[grey] p-1 px-2 rounded-md">{new Date().toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        <p className="bg-green-400 shadow shadow-[grey] p-1 px-2 rounded-md">Activity</p>
                    </div>
                    <div className="w-full mb-2 h-[60%] relative mt-3">
                        <Image src="/coding.jpg" sizes="100%" priority={true} fill className="select-none object-fit rounded-2xl" alt="Photo"></Image>
                    </div>
                    <small>Muhammad Radya Iftikhar</small>
                    <p className="font-semibold">Ngoding coy</p>
                    <p className="mt-1 text-yellow-500"> <StarFilled></StarFilled> <span className="text-black">3.4/5</span></p>
                </div>

            </div>
        </>
    )
}