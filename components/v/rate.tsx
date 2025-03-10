"use client"

import { useState } from "react"
import { CloseOutlined, StarFilled } from "@ant-design/icons"
import "animate.css"
import { auth, db } from "@/config/firebase"
import { toast, ToastContainer } from "react-toastify"
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore"

type Rating = {
    thingsId: string,
    userRateId: string,
    rating: number,
    komen: string,
    createdAt: number
}

export default function Rate({ getThingsId }: { getThingsId: { id: string } }) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [thingsId, _] = useState<string>(getThingsId.id)
    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(1)
    const [comment, setComment] = useState<string>("")


    async function submitRating() {
        try {
            let komen = comment
            if (auth.currentUser === null) {
                toast.error("Login dulu yaa!")
                return;
            } else if (!comment) {
                komen = "no-comment"
            }
            toast.info("Tunggu bentar")
            const ratingData: Rating = {
                thingsId,
                userRateId: auth.currentUser.uid,
                rating,
                komen,
                createdAt: Timestamp.now().toMillis()
            }
            const checkRatingData = await getDocs(query(collection(db, "rating"),
                where("userRateId", "==", ratingData.userRateId),
                where("thingsId", "==", thingsId)
            ))

            if (!checkRatingData.empty) {
                toast.info("Kamu sudah kasih rating...")
                return;
            }
            await addDoc(collection(db, "rating"), ratingData)

            const allRatingData = await getDocs(query(collection(db, "rating"),
                where("thingsId", "==", thingsId)
            ))

            let ratingSum = 0, ratingCount = 0
            allRatingData.forEach((data) => {
                ratingCount += 1
                ratingSum += data.data().rating
            })
            await updateDoc(doc(db, "things", thingsId), { rating: ratingSum / ratingCount })

            setToggleModal(false)
            toast.success("Oke sudah")
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    return (
        <>
            {toggleModal && (<div className="fixed animate__animated animate__bounceInDown p-6 mx-auto rounded-2xl shadow-2xl shadow-black bg-amber-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-1/3 h-[45dvh]">
                <div className="flex justify-end">
                    <CloseOutlined onClick={() => setToggleModal(false)} className="text-2xl cursor-pointer"></CloseOutlined>
                </div>
                <div className=" flex justify-around">
                    {/* STAR start */}
                    <div onClick={() => setRating(1)} className={`group ${rating === 1 ? 'text-[orange]' : ''} hover:text-[orange] flex flex-col justify-center items-center`}>
                        <span className={`text-xl ${rating === 1 ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`}>
                            1
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>

                    <div onClick={() => setRating(2)} className={`group ${rating === 2 ? 'text-[orange]' : ''} hover:text-[orange] flex flex-col justify-center items-center`}>
                        <span className={`text-xl ${rating === 2 ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`}>
                            2
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>

                    <div onClick={() => setRating(3)} className={`group ${rating === 3 ? 'text-[orange]' : ''} hover:text-[orange] flex flex-col justify-center items-center`}>
                        <span className={`text-xl ${rating === 3 ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`}>
                            3
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>

                    <div onClick={() => setRating(4)} className={`group ${rating === 4 ? 'text-[orange]' : ''} hover:text-[orange] flex flex-col justify-center items-center`}>
                        <span className={`text-xl ${rating === 4 ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`}>
                            4
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>

                    <div onClick={() => setRating(5)} className={`group ${rating === 5 ? 'text-[orange]' : ''} hover:text-[orange] flex flex-col justify-center items-center`}>
                        <span className={`text-xl ${rating === 5 ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`}>
                            5
                        </span>
                        <div className="text-5xl">
                            <StarFilled className="cursor-pointer"></StarFilled>
                        </div>
                    </div>

                </div>
                {/* STAR end */}
                <div className="border rounded-md mt-3 w-full p-1 px-2">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment..." className="outline-none  w-full h-11" />
                </div>
                <button onClick={() => submitRating()} className="bg-[orange] mt-4 rounded-md cursor-pointer py-2 px-4">Submit</button>
            </div>)}

            <p onClick={() => setToggleModal(true)} className="bg-blue-400 p-1 px-2 cursor-pointer rounded-md">Rate</p>
            <ToastContainer
                theme="dark"
                position="bottom-right"
            />
        </>
    )
}