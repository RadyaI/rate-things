import Content from "@/components/root/content"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <div className="w-9/12 p-5 mx-auto mt-8">
        <p className="hidden sm:block text-center text-5xl font-bold tracking-wider font-[chewy]">⭐ Rate anything you want ⭐</p>
        <p className="sm:hidden text-center text-5xl font-bold tracking-wider font-[chewy]">Rate anything you want</p>
      </div>
      <Suspense fallback={<div className="text-center">Sabar yaa lagi ambil data...</div>}>
        <Content/>
      </Suspense>
    </>
  )
}