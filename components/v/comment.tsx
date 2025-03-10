"use client"

import { db } from "@/config/firebase"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

type Things = {
    id: string
    rating: number,
    thingsId: string,
    userRateId: string,
    komen: string,
    createdAt: number
} | null

export default function Comment({ getThingsId }: { getThingsId: { id: string } }) {

    const [ratingData, setRatingData] = useState<Things[] | null>(null)


    useEffect(() => {
        const q = query(
            collection(db, "rating"),
            where("thingsId", "==", getThingsId.id),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const temp: Things[] = [];
            snapshot.forEach((data) => {
                temp.push({ ...data.data(), id: data.id } as Things);
            });
            setRatingData(temp);
        });

        return () => unsubscribe();
    }, [getThingsId.id]);


    if (!ratingData) {
        return (
            <div className="w-6/8 sm:w-1/2 mb-10 mx-auto mt-5 p-5 bg-amber-50 rounded-2xl shadow shadow-black">
                <small>Comment</small>
                <p className="text-center">Sabar yaa datanya lagi diambil...</p>
            </div>
        )
    }


    return (
        <>
            <div className="w-[90%] sm:w-1/2 mb-10 mx-auto mt-5 p-5 bg-amber-50 rounded-2xl shadow shadow-black">
                <small>Comment</small>
                {ratingData?.map((i, index) =>
                    <div key={index} className="mt-4 shadow p-3 rounded-xl">
                        <p className="font-semibold">{i?.komen === "no-comment" ? "No Comment" : i?.komen} <small>({i?.rating} / 5)</small></p>
                        <small className="text-[grey]">{new Date(i?.createdAt ?? 0).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            minute: "2-digit",
                            hour: "2-digit",
                            hour12: false
                        })}</small>
                    </div>
                )}
            </div>
        </>
    )
}