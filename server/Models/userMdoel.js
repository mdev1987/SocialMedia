import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
}, { timestamps: true })


export default UserModel = model('Users', userSchema);