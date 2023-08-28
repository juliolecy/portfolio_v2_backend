import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface UserInstance extends Model {
    id: number;
   name: string;
   email: string;
   passwordHash: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});

User.sync().then(()=>{
    console.log('User Model synced.')
})