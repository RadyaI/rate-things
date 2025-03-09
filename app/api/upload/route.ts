import { NextResponse } from "next/server";

export function GET(req: Request){
    return NextResponse.json({msg: "Hahaha"})
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", new Blob([buffer]));
        cloudinaryForm.append("upload_preset", "ratethings");

        const res = await fetch(`https://api.cloudinary.com/v1_1/dmjcabiqr/image/upload`, {
            method: "POST",
            body: cloudinaryForm,
        });

        if (!res.ok) {
            throw new Error("Failed to upload");
        }

        const data = await res.json();
        return NextResponse.json({ url: data.secure_url }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
