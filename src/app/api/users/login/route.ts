import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody

        // validation

        console.log(reqBody)

        const user = await User.findOne({email})

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 })

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) return NextResponse.json({ error: "Check your credentials" }, { status: 400 })

        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
    }

         const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {expiresIn: '1h'});

         const response = NextResponse.json({
            message: "Logged in success",
            success: true,
         })

         response.cookies.set("token", token, {
            httpOnly: true
         })

         return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}