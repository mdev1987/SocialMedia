import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userMdoel from "../Models/userMdoel.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                req.body.password = await bcrypt.hash(password, 10);
            }
            if (req.files) {
                const { profilePicture, coverPicture } = req.files;
                if (profilePicture && profilePicture.length > 0) {
                    req.body.profilePicture = profilePicture[0].path;
                }
                if (coverPicture && coverPicture.length > 0) {
                    req.body.coverPicture = coverPicture[0].path;
                }
            }
            const user = await userMdoel.findByIdAndUpdate(id, req.body, { new: true })
            user.password = undefined;
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, process.env.JWT_KEY, {
                expiresIn: '1h'
            })
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: "Access Denied!" })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus } = req.body;
    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await userMdoel.findByIdAndDelete(id);
            res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: "Access Denied!" })
    }
}

export const followUnfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json('Action Forbidden!');
    } else {
        try {
            const user = await userMdoel.findById(currentUserId);
            const followedUser = await userMdoel.findById(id);
            if (user.followings.includes(followedUser._id)) {
                await user.updateOne({ $pull: { followings: id } })
                await followedUser.updateOne({ $pull: { followers: currentUserId } })
                res.status(200).json({ message: "User Unfollowed.", followerUnfollowerId: followedUser._id })
            }
            else { // (!user.followings.includes(followedUser._id)) 
                await user.updateOne({ $push: { followings: id } })
                await followedUser.updateOne({ $push: { followers: currentUserId } })
                res.status(200).json({ message: "User followed.", followerUnfollowerId: followedUser._id })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const getUsers = async (req, res) => {
    try {
        let users = await userMdoel
            .find({}, { username: 1, firstname: 1, lastname: 1, profilePicture: 1 })
            .limit(10)
        res.status(200).json(users)
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}
