import mongoose from 'mongoose';
import crypto from 'crypto';
import { user } from '@/app/lib/model/user';
import { ConnectionStr } from '@/app/lib/db';

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || 'b52e718889788b468f245c9a319676e49e56f7aca94ef8312d6cfedb3ccfd18f', 'hex');
const IV_LENGTH = 16; // AES block size

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(ConnectionStr);
};

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

export async function POST(request) {
    try {
        const { token, id } = await request.json();

        let userId = decryptUserId(id);
        console.log('Extracted userId:', userId);

        await connectDB();

        // Find the user by ID
        const user1 = await user.findOne({ _id: userId });

        if (!user1) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Check if the token matches
        if (user1.verificationToken === token) {
            // Mark the user as verified
            user1.isVerified = true;
            user1.verificationToken = null; // Clear the token
            await user1.save();

            return new Response(JSON.stringify({ message: 'ID verified successfully' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid verification token' }), { status: 400 });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(JSON.stringify({ message: "An error occurred while processing the request." }), { status: 500 });
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
