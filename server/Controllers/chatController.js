import mongoose from 'mongoose';
import chatModel from '../Models/chatModel.js';

export const createChat = async (req, res) => {
    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (ex) {
        res.status(200).json({ message: ex.message })
    }
}

export const userChats = async (req, res) => {
    try {
        const chats = await chatModel.aggregate([
            {
                $match: {
                    members: new mongoose.Types.ObjectId(req.params.userId)
                }
            },
            { $unwind: '$members' },
            { $match: { members: { $ne: new mongoose.Types.ObjectId(req.params.userId) } } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'members',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    _id: 1,
                    user: {
                        _id: 1,
                        username: 1,
                        firstname: 1,
                        lastname: 1,
                        profilePicture: 1
                    }
                }
            }
        ])                        
        res.status(200).json(chats);
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}

export const findChat = async (req, res) => {
    try {
        const chats = await chatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json(chats);
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}