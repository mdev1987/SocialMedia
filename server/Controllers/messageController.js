import messageModel from '../Models/messageModel.js';

export const addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    if (!text || text.trim().length === 0) {
        return res.status(403).json({ message: 'text is required' })
    }
    try {
        const result = await messageModel.create({
            chatId,
            senderId,
            text
        })
        res.status(200).json(result);
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}

export const getMessages = async (req, res)=>{
    const {chatId} = req.params;
    try {
        const result = await messageModel.find({chatId});
        res.status(200).json(result);
    }catch(ex){
        res.status(500).json({message: ex.message})
    }
}