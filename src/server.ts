import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import {ConnectDatabase} from './database/pg'

dotenv.config();

const server = express();

server.use(cors({origin: '*'}));
server.use(express.json({ limit: '10mb' }))
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

ConnectDatabase()

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