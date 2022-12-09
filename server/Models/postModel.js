import { Schema, model } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    desc: String,
    image: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
}, { timestamps: true })

export default model('Posts', postSchema);