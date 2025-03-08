"use client"

import { CheckOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function CreateThings() {

    const [checked, setChecked] = useState<boolean>(false)

    function handleFile(e: any) {
        try {
            console.log(e.target.files[0])
            const imgType = e.target.files[0].type
            if (imgType !== "image/webp" && imgType !== "image/png" && imgType !== "image/jpeg" && imgType !== "image/jpg") {
                toast.error("Support only webp/png/jpeg/jpg")
                e.target.value = ""
            } else {
                toast.success("Uploaded")
            }

        } catch (error: unknown) {
            if (error instanceof Error) console.log(error)
        }
    }

    return (
        <>
            <ToastContainer
                theme="dark"
                position='bottom-right'
            />
            <p className="text-center text-4xl font-semibold mt-6">Create <br /> Somethings</p>
            <div className="w-[80%] sm:w-4/6 mt-10 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <input type="text" placeholder="Input title..." className="w-full p-4 outline-none text-lg" />
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
                <textarea className="w-full p-4 outline-none text-lg" placeholder='Description...'></textarea>
            </div>

            <div className="w-[80%] sm:w-4/6 mt-5 h-auto mx-auto">
                <button className='cursor-pointer py-2 px-5 hover:scale-[1.1] transition-all rounded-md shadow shadow-black outline-none   font-semibold bg-amber-50'>Create</button>
            </div>

        </>
    )
}