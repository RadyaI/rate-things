import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

type Things = {
    author: string,
    authorId: string,
    createdAt: string,
    desc: string,
    file: string,
    isAnonim: boolean,
    tag: string,
    title: string
} | null

async function getThings(thingsId: string): Promise<Things> {
    try {
        const data = await getDoc(doc(db, "things", thingsId))
        return data.data() as Things
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message)
            return null
        }
    }

    return null;
}

export default async function ThingsView({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const thingsData = await getThings(id)
    
    if(!thingsData){
        return(
            <>
                <p className="text-center">Data not found huh?...</p>
            </>
        )
    }

    return (
        <>
            <div className="w-6/8 h-50 sm:h-80 sm:w-1/2 mt-5 mx-auto relative">
                <Image className="mt-3 object-contain mx-auto rounded-2xl" fill src={thingsData.file} alt="Image"></Image>
            </div>
            <div className="w-6/8 sm:w-1/2 mt-10 mx-auto bg-amber-50 p-5 rounded-2xl shadow shadow-black">
                <div className="flex gap-4 font-semibold">
                    <p className="bg-amber-400 p-1 rounded-md">{new Date(thingsData.createdAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}</p>
                    <p className="bg-green-400 p-1 rounded-md">{thingsData.tag}</p>
                </div>
                <small className="font-semibold">{thingsData.isAnonim ? "Anonim" : thingsData.author}</small>
                <p className="font-semibold text-2xl">{thingsData.title}</p>
                <p className="mt-2 text-[grey]">{thingsData.desc}</p>
            </div>
        </>
    )
}