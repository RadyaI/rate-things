"use client"

import { auth, db } from '@/config/firebase'
import { CheckOutlined } from '@ant-design/icons'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function CreateThings() {
    const router = useRouter()
    const [checked, setChecked] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("")
    const [tag, setTag] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [file, setFile] = useState<File | null | undefined>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            const file = e.target.files?.[0]
            if (!file) return;

            const imgType = file.type
            const imgSize = file.size
            const max_size = 10 * 1024 * 1024
            if (imgType !== "image/webp" && imgType !== "image/png" && imgType !== "image/jpeg" && imgType !== "image/jpg") {
                toast.error("Support only webp/png/jpeg/jpg")
                e.target.value = ""
            } else if (imgSize > max_size) {
                toast.error("Max 10MB")
                e.target.value = ""
            }
            else {
                toast.success("Uploaded")
                setFile(file)
            }
        } catch (error: unknown) {
            if (error instanceof Error) console.log(error.message)
        }
    }

    async function createSomethings() {
        if (!title || !desc || !file) {
            toast.error("Some fields are required!");
            return;
        } else if (tag.length > 10) {
            toast.error("Tag maximum 10 characters!")
            return;
        }
        setIsLoading(true)
        try {
            toast.info("Loading...")
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ratethings");
            formData.append("folder", "ratethings")

            const res = await fetch(`https://api.cloudinary.com/v1_1/dmjcabiqr/image/upload`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const { secure_url } = await res.json();

            await addDoc(collection(db, "things"), {
                title,
                isAnonim: checked,
                author: auth.currentUser?.displayName,
                authorId: auth.currentUser?.uid,
                desc,
                tag,
                file: secure_url,
                createdAt: Timestamp.now().toMillis()
            });

            toast.success("Created successfully");
            router.push("/");
        } catch (error: unknown) {
            toast.error("Something went wrong!");
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <ToastContainer
                theme="dark"
                position='bottom-right'
            />
            <p className="text-center text-4xl font-semibold mt-6">Create <br /> Somethings</p>
            <div className="w-[80%] sm:w-4/6 mt-10 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Input title..." className="w-full p-4 outline-none text-lg" />
            </div>
            <div className="w-[80%] sm:w-4/6 mt-5 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" placeholder="Tag (example: Activity, Food)" className="w-full p-4 outline-none text-lg" />
            </div>

            <div className="w-[80%] sm:w-4/6 mx-auto mt-8 flex items-center space-x-3">
                <label className="flex items-center cursor-pointer">
                    <input className="hidden peer" type="checkbox" />

                    <span onClick={() => setChecked(!checked)} className="relative w-8 h-8 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-green-400 peer-checked:bg-amber-50 peer-hover:scale-105">
                        {checked && (<CheckOutlined />)}
                    </span>

                    <span onClick={() => setChecked(!checked)} className="ml-3 text-md font-semibold text-gray-700">
                        Upload anonymously
                    </span>
                </label>
            </div>

            <div className="w-[80%] sm:w-4/6 mt-5 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <input type="file" className="w-full p-4 outline-none text-lg" onChange={(e) => handleFile(e)} />
            </div>

            <div className="w-[80%] sm:w-4/6 mt-5 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-4 outline-none text-lg" placeholder='Description...'></textarea>
            </div>

            <div className="w-[80%] sm:w-4/6 mb-10 mt-5 h-auto mx-auto">
                <button onClick={() => createSomethings()} className='cursor-pointer py-2 px-5 hover:scale-[1.1] transition-all rounded-md shadow shadow-black outline-none   font-semibold bg-amber-50'>{isLoading ? "Sabar yaa" : "Create"}</button>
            </div>

        </>
    )
}