import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema({
    url: String,
    slug: {
        type: String,
        unique: true
    }
})

export default mongoose.models.Item || mongoose.model('Item', LinkSchema);
