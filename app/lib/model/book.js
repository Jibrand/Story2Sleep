import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    Title: { type: String, },
    Category: { type: String, },
    Story: { type: String, },
    Image: { type: String, },
});

export const Books = mongoose.models.Story2Sleep || mongoose.model("Story2Sleep", userSchema);