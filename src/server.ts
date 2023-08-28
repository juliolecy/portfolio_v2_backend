import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import {ConnectDatabase} from './database/pg'
import * as admin from 'firebase-admin';

dotenv.config();

const firebase_private_key_b64 = Buffer.from(process.env.FIREBASE_CREDENTIALS!, 'base64');
const firebase_private_key = firebase_private_key_b64.toString('utf8');

admin.initializeApp({
credential: admin.credential.cert(JSON.parse(firebase_private_key)),
storageBucket: process.env.STORAGE_BUCKET
});

export const storageBucket = admin.storage().bucket();

const server = express();

server.use(cors({origin: '*'}));
server.use(express.json({ limit: '10mb' }))
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

ConnectDatabase()

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use('/api', apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); 
    console.log(err);
    res.json({ error:'Erro interno.' });
}

server.use(errorHandler);

server.listen(process.env.PORT, ()=>{
  console.log('Server running at port: ' + process.env.PORT)
});