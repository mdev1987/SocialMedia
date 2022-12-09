import userModel from '../Models/userMdoel.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ firstname, lastname, username, password: hashPassword })
    try {
        const newUser = await userModel.create(user);
        newUser.password = undefined;
        res.status(200).json(newUser);
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                user.password = undefined;
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'username or password is incorret' })
            }
        } else {
            res.status(404).json({ message: 'username or password is incorret' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}