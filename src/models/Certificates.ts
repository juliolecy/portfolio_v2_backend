import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface ProjectsInstance extends Model {
id: number;
title: string;
total_hours:number;
created_by: string;
skill_svg: string;
firebase_img: string

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
    firebase_img: {
        type: DataTypes.STRING,
        unique: true
    },
    skill_svg:{
        type: DataTypes.STRING,
    },
    created_by:{
        type: DataTypes.STRING,
    },
    total_hours:{
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'certificates',
    timestamps: false
});