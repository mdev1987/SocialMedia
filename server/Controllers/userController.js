import bcrypt from 'bcrypt';
import userMdoel from "../Models/userMdoel.js";

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userMdoel.findById(id);
        if (user) {
            user.password = undefined;
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "user doesn't exists!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                req.body.password = await bcrypt.hash(password, 10);
            }
            const user = await userMdoel.findByIdAndUpdate(id, req.body, { new: true })
            user.password = undefined;
            res.status(200).json(user);
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

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json('Action Forbidden!');
    } else {
        try {
            const user = await userMdoel.findById(currentUserId);
            const followedUser = await userMdoel.findById(id);
            if (!user.followings.includes(id)) {
                await user.updateOne({ $push: { followings: id } })
                await followedUser.updateOne({ $push: { followers: currentUserId } })
                res.status(200).json({ message: "User followed." })
            } else {
                res.status(403).json({ message: "User already followed" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}


export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json('Action Forbidden!');
    } else {
        try {
            const user = await userMdoel.findById(currentUserId);
            const followedUser = await userMdoel.findById(id);
            if (user.followings.includes(id)) {
                await user.updateOne({ $pull: { followings: id } })
                await followedUser.updateOne({ $pull: { followers: currentUserId } })
                res.status(200).json({ message: "User Unfollowed." })
            } else {
                res.status(403).json({ message: "User isn't followed" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}