export default function CreateButton() {

    

    return (
        <>
            <div className="fixed p-4 top-2 right-2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full cursor-pointer border border-black"></div>
                <button className="bg-black transition-all mt-4 text-white cursor-pointer hover:bg-[#F1F0E9] border-2 hover:text-black hover:border-black px-5 py-2 rounded-lg">Create</button>
            </div>
        </>
    )
}