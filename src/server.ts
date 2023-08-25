import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import {sequelize} from './instances/pg'

dotenv.config();

const server = express();

server.use(cors({origin: '*'}));
server.use(express.json({ limit: '10mb' }))
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection sucessfuly.');
  })
  .catch((err) => {
    console.error('Error while connecting to database', err);
  });

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use('/api', apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint not found.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Something went wrong.' });
}
server.use(errorHandler);

server.listen(process.env.PORT, ()=>{
    console.log('Server running at port: ' + process.env.PORT)
});