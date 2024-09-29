import mongoose from 'mongoose';
import { ConnectionStr } from '@/app/lib/db';
import { user } from "@/app/lib/model/user";
import crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from('b52e718889788b468f245c9a319676e49e56f7aca94ef8312d6cfedb3ccfd18f', 'hex');
const IV_LENGTH = 16; // AES block size

const decryptUserId = (encryptedText) => {
    try {
        const [ivHex, encryptedDataHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encryptedData = Buffer.from(encryptedDataHex, 'hex');

        const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt');
    }
};

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(ConnectionStr);
};

export async function POST(request) {
    try {
        const { account, id } = await request.json(); // Parse the request body
        console.log("id", id);
        let userId = decryptUserId(id);

        await connectDB();

        // Find the user by ID
        const user1 = await user.findOne({ _id: userId });
        if (!user1) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Update the user's account information
        user1.account = account;
        await user1.save();

        return new Response(JSON.stringify({ message: 'Account updated successfully' }), { status: 200 });
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(JSON.stringify({ message: 'An error occurred while processing the request.' }), { status: 500 });
    }
}

export function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Allow': 'POST',
        },
    });
}

export function GET() {
    return new Response(null, { status: 405, statusText: `Method GET Not Allowed` });
}
