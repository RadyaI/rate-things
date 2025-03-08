"use client"

import { CheckOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function CreateThings() {

    const [checked, setChecked] = useState<boolean>(false)

    return (
        <>
            <p className="text-center text-4xl font-semibold mt-6">Create <br /> Somethings</p>
            <div className="w-[80%] sm:w-4/6 mt-10 h-auto bg-amber-50 shadow shadow-black mx-auto rounded-2xl">
                <input type="text" placeholder="Input title..." className="w-full p-4 outline-none text-lg" />
            </div>

            <div className="w-[80%] sm:w-4/6 mx-auto mt-8 flex items-center space-x-3">
                <label className="flex items-center cursor-pointer">
                    <input className="hidden peer" type="checkbox" />

                    <span onClick={() => setChecked(!checked)} className="relative w-8 h-8 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-black peer-checked:bg-green-500 peer-hover:scale-105">
                        {checked && (<CheckOutlined />)}
                    </span>

                    <span onClick={() => setChecked(!checked)} className="ml-3 text-md font-semibold text-gray-700">
                        Upload anonymously
                    </span>
                </label>
            </div>

        </>
    )
}