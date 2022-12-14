import mongoose, { Schema, model } from "mongoose";

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
    profilePicture: {
        type: String,
        default: '',
    },

    coverPicture: {
        type: String,
        default: '',
    },
    about: {
        type: String,
        default: '',
        trim: true,
    },
    livesin: {
        type: String,
        default: '',
        trim: true,
    },
    worksAt: {
        type: String,
        default: '',
        trim: true,
    },
    relationship: {
        type: String,
        default: '',
        trim: true,
    },
    country: {
        type: String,
        default: '',
        trim: true,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
}, { timestamps: true })

export default model('Users', userSchema);