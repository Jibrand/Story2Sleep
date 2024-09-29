import { NextResponse } from "next/server";
import { ConnectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { Books } from "@/app/lib/model/book"

        export async function GET(req, Content) {

    const productCategory = Content.params.BookCategory

    let data = []
    let success = true
    try {
        await mongoose.connect(ConnectionStr);
        data = await Books.find({ Category: productCategory })

    } catch (error) {
        data = { result: "error" }
        success = false;
    }

    return NextResponse.json({ result: data, success })
}

