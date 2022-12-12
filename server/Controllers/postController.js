import mongoose from "mongoose";
import multer from 'multer';
import postModel from "../Models/postModel.js";
import userMdoel from "../Models/userMdoel.js";


export const createPost = async (req, res) => {

    try {
        const post = new postModel({
            userId: req.body.userId,
            desc: req.body.desc,
            image: req.file.path,
        })
        await post.save();
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }    
}

export const getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(postId);
        if (post && post.userId.toString() === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({ message: 'Post updated successfully' })
        } else {
            res.status(403).json({ message: 'Action Forbidden!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (post && post.userId.toString() === userId) {
            await post.deleteOne();
            res.status(200).json({ message: "Post deleted successfully" })
        } else {
            res.status(403).json({ message: 'Forbidden Action!' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!userId) {
        return res.status(403).json({ message: 'User Id is required!' });
    }
    try {
        const post = await postModel.findById(postId);
        if (post) {
            if (post.likes.includes(userId)) {
                await post.updateOne({ $pull: { likes: userId } })
                res.status(200).json({ message: 'Post disliked' })
            } else {
                await post.updateOne({ $push: { likes: userId } })
                res.status(200).json({ message: 'Post liked' })
            }
        } else {
            res.status(404).json({ message: "Post doesn't exists!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserPosts = async (req, res) => {
    const userId = req.params.id;
    try {

        const posts = await postModel.find({ userId: userId })
            .sort({ createdAt: 'desc' })
        const followingPosts = await userMdoel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            }, {
                $lookup: {
                    from: 'posts',
                    localField: 'followings',
                    foreignField: 'userId',
                    as: 'followingPosts'
                }
            }, {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }

            }
        ]).sort({ createdAt: -1 })


        res.status(200).json(posts.concat(followingPosts[0].followingPosts).sort((a, b) => b.createdAt - a.createdAt));
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

