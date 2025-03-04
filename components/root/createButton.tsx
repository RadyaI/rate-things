"use client"

import { useState } from "react"

export default function CreateButton() {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="fixed w-34 p-4 top-2 right-2 flex flex-col items-center">
            <div 
                onClick={() => setToggle(!toggle)} 
                className="w-12 h-12 rounded-full cursor-pointer border border-black"
            ></div>

            <div className={`flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${toggle ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                <button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Profile</button>
                <button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Create</button>
                <button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Setting</button>
            </div>
        </div>
    )
}
