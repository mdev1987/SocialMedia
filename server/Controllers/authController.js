import userModel from '../Models/userMdoel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    const isUserExists = await userModel.find({ username });
    if (isUserExists.length > 0) {
        return res.status(403).json({ message: 'Username is already registered' })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ firstname, lastname, username, password: hashPassword })
    try {
        const newUser = await userModel.create(user);
        const token = createToken(newUser);
        res.status(200).json({ token, payload: jwt.decode(token) });
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
                const token = createToken(user);
                res.status(200).json({ token, payload: jwt.decode(token) });
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

const createToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_KEY, {
        expiresIn: '1h'
    })
}