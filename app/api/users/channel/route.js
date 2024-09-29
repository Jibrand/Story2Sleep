import mongoose from 'mongoose';
import { ConnectionStr } from '@/app/lib/db';
import { user } from "@/app/lib/model/user";
import { google } from "googleapis";
import crypto from 'crypto';

const apiKeys = [
    process.env.gemini_dev1,
    process.env.gemini_dev2,
    process.env.gemini_dev3,
    process.env.gemini_dev4
];

let currentKeyIndex = 0; 

// Get YouTube client
function getYouTubeClient() {
    return google.youtube({
        version: 'v3',
        auth: apiKeys[currentKeyIndex]
    });
}

// Get channel ID by channel name
async function getChannelId(channelName) {
    const youtube = getYouTubeClient();
    try {
        const response = await youtube.search.list({
            q: channelName,
            type: 'channel',
            part: 'id,snippet',
            maxResults: 1
        });

        if (response.data.items.length === 0) {
            return null;  // No channel found
        }

        const channelId = response.data.items[0].snippet.channelId;
        return channelId;
    } catch (error) {
        console.error("Error fetching channel ID: ", error);
        throw error;
    }
}

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || 'b52e718889788b468f245c9a319676e49e56f7aca94ef8312d6cfedb3ccfd18f', 'hex');
const IV_LENGTH = 16;

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
        const { channelName, id } = await request.json();

        console.log("id", id);
        let userId = decryptUserId(id);
        console.log('Extracted userId:', userId);

        await connectDB();

        // Verify if the channel exists on YouTube
        const channelId = await getChannelId(channelName);
        if (!channelId) {
            return new Response(JSON.stringify({ message: 'Channel name is incorrect or does not exist on YouTube' }), { status: 400 });
        }

        // Check if the channel name is already registered
        const existingUser = await user.findOne({ channelname: channelName });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'Channel name is already registered' }), { status: 401 });
        }

        // Find the user by ID
        const user1 = await user.findOne({ _id: userId });
        if (!user1) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Update the user's channel name
        user1.channelname = channelName;
        await user1.save();

        return new Response(JSON.stringify({ message: 'Channel name submitted and updated successfully' }), { status: 200 });
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
