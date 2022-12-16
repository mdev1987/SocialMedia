import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import socketController from './Controllers/socketController.js';
import Routes from './Routes/index.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.json({ limit: '30mb' }));
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'))
app.use(Routes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB)
    .then(() => console.log(`Successfully conncted to database`))
    .catch(e => console.log(`Error cononection database: ${e.message}`));

const server = app.listen(app.get('port'),
    () => console.log(`Server is running on port: ${app.get('port')}`))

const io = new Server(server, {    
    cors: {
        origin: process.env.CLIENT_ADDR,
        // methods: ["GET", "POST"]        
    }
})

socketController(io);