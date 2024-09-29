import mongoose from 'mongoose';
import { ConnectionStr } from '@/app/lib/db';
import { user } from '@/app/lib/model/user';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Use environment variables for sensitive data
const JWT_SECRET = 'NJK@#H!IJio2nwisi1i273829uNJKNDNUASIDHiowqned921ue9hdbkmaklsLJkljkljkJSKSJKLjkJKLKJKjkljscjdksaxwqjeg2usb,'; // Store this in environment variables
const ENCRYPTION_KEY = Buffer.from('b52e718889788b468f245c9a319676e49e56f7aca94ef8312d6cfedb3ccfd18f', 'hex');
const IV_LENGTH = 16; // AES block size

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(ConnectionStr);
};

const encryptUserId = (userId) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(userId.toString());
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
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

// API Route handler in Next.js 14
export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ errors: { general: 'Email and password are required' } }), { status: 400 });
        }

        await connectDB();
        
        const userRecord = await user.findOne({ email });
        if (!userRecord || password !== userRecord.password) {
            return new Response(JSON.stringify({ errors: { general: 'Invalid email or password' } }), { status: 401 });
        }

        if (userRecord.verificationToken) {
            return new Response(JSON.stringify({ message: 'Please verify your email' }), { status: 402 });
        }

        if (!userRecord.account || userRecord.account === "") {
            const secureID = encryptUserId(userRecord._id);
            const token = jwt.sign({ id: userRecord._id }, JWT_SECRET, { expiresIn: '20h' });
            return new Response(JSON.stringify({ message: 'Redirect to pricing page', id: secureID, token }), { status: 201 });
        }

        const token = jwt.sign({ id: userRecord._id }, JWT_SECRET, { expiresIn: '20h' });
        return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ errors: { general: 'An error occurred while processing the request' } }), { status: 500 });
    }
}

// Handle unsupported methods
export function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Allow': 'POST',
        },
    });
}

export function GET() {
    return new Response(null, { status: 405, statusText: `Method GET Not Allowed`, message: 'Method GET Not Allowed', });
}
