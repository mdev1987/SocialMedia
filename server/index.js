import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
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
    .then(() => app.listen(app.get('port'),
        () => console.log(`Server is running on port: ${app.get('port')}`)))
    .catch(e => console.log(`Error cononection database: ${e.message}`));