import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        host: process.env.PG_HOST as string,
        dialect: 'postgres'
    }
);

export const ConnectDatabase = ()=>{
sequelize
  .authenticate()
    .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((err) => {
    console.error('Erro durante a conexão ao banco de dados', err);
  });

}

