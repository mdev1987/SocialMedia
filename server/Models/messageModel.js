import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chats'
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    text: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default model('Messages', messageSchema);