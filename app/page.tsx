import Content from "@/components/root/content"
import CreateButton from "@/components/root/createButton"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <CreateButton />

      <div className="w-9/12 p-5 mx-auto mt-8">
        <p className="text-center text-5xl font-bold tracking-wider font-[chewy]">Rate anything you want</p>
      </div>
      <Suspense fallback={<div className="text-center">Sabar yaa...</div>}>
        <Content />
      </Suspense>
    </>
  )
}