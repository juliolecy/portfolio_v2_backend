import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface ProjectsInstance extends Model {
id: number;
title: string;
src: string;
}

export const Certificates = sequelize.define<ProjectsInstance>('Certificates', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    src: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    tableName: 'certificates',
    timestamps: false
});