import { NextResponse } from "next/server";
import mongoose from "mongoose";
import crypto from "crypto";
import { ConnectionStr } from "@/app/lib/db";
import { user } from "@/app/lib/model/user";
import sendEmail from "../../sendEmail";

const ENCRYPTION_KEY = Buffer.from('b52e718889788b468f245c9a319676e49e56f7aca94ef8312d6cfedb3ccfd18f', 'hex');
const IV_LENGTH = 16; // AES block size

// Function to encrypt user ID
const encryptUserId = (userId) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(userId.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Handler for GET and POST requests
export async function GET() {
    try {
        // Connect to the database
        await mongoose.connect(ConnectionStr);

        // Example GET response
        return NextResponse.json({ message: "Hello, this is the GET response." });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ message: "An error occurred while processing the request." }, { status: 500 });
    }
}

export async function POST(request) {
    let success = true;
    let data = {};
    const generateVerificationToken = crypto.randomBytes(32).toString('hex');

    try {
        const body = await request.json(); // Parse the request body
        // Connect to the database
        await mongoose.connect(ConnectionStr);

        // Check if the user already exists
        const existingUser = await user.findOne({ email: body.email });
        if (existingUser) {
            console.log(`${body.email} already registered`);
            return NextResponse.json({ message: "An account with this email already exists." }, { status: 400 });
        }

        // Create a new user
        const newUser = new user({
            name: `${body.fname} ${body.lname}`,
            email: body.email,
            number: body.number,
            password: body.password, // Hash this in production!
            verificationToken: generateVerificationToken
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        data = savedUser;
        const userId = savedUser._id.toString();

        let secureID = encryptUserId(userId);

        // Send verification email
        const verificationLink = `http://localhost:3000/verifyaccount?token=${generateVerificationToken}&id=${secureID}`;
        const emailMsg = `
            <h1>Hello ${body.fname},</h1>
            <p>Thank you for registering at GenieEngage! To complete your registration, please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}">Verify Your Email</a>
            <p>If you did not create an account, you can safely ignore this email.</p>
            <br/>
            <p>Thanks,</p>
            <p>The GenieEngage Team</p>
        `;

        await sendEmailFunc('Verify your email - GenieEngage', emailMsg, body.email);
    } catch (error) {
        console.error("Error occurred:", error);
        data = { message: "An error occurred while processing the request." };
        success = false;
    }

    return NextResponse.json({ result: data, success }, { status: success ? 200 : 500 });
}

// Email sending function
const sendEmailFunc = async (subject, message, email) => {
    try {
        const send_to = email;
        const sent_from = "jibrandevn@gmail.com";
        const reply_to = "jibrandevn@gmail.com";
        // Use your actual email sending logic here
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
