import mongoose, { Schema } from "mongoose";

const AccessCounterSchema = new Schema({
    value: Number
})

export default mongoose.models.AccessCounter || mongoose.model('AccessCounter', AccessCounterSchema);
