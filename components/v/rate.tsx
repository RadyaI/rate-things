"use client"

import { useEffect, useState } from "react"
import { CloseOutlined, StarFilled } from "@ant-design/icons"
import "animate.css"

export default function Rate({ getThingsId }: { getThingsId: { id: string } }) {

    const [thingsId, setThingsId] = useState<string>(getThingsId.id)
    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(1)

    useEffect(() => {
        console.log(rating)
    }, [rating])

    return (
        <>

            {toggleModal && (<div className="fixed animate__animated animate__bounceInDown p-6 mx-auto rounded-2xl shadow-2xl shadow-black bg-amber-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-1/3 h-[40dvh]">
                <div className="flex justify-end">
                    <CloseOutlined onClick={() => setToggleModal(false)} className="text-2xl cursor-pointer"></CloseOutlined>
                </div>
                <div className=" flex justify-around">
                    {/* STAR start */}
                    <div onClick={() => setRating(1)} className="group hover:text-[green] flex flex-col justify-center items-center">
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            1
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>
                    <div onClick={() => setRating(2)} className="group hover:text-[green] flex flex-col justify-center items-center">
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            2
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>
                    <div onClick={() => setRating(3)} className="group hover:text-[green] flex flex-col justify-center items-center">
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            3
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>
                    <div onClick={() => setRating(4)} className="group hover:text-[green] flex flex-col justify-center items-center">
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            4
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>
                    <div onClick={() => setRating(5)} className="group hover:text-[green] flex flex-col justify-center items-center">
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            5
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>
                    {/* STAR end */}
                </div>
            </div>)}

            <p onClick={() => setToggleModal(true)} className="bg-blue-400 p-1 px-2 cursor-pointer rounded-md">Rate</p>
        </>
    )
}