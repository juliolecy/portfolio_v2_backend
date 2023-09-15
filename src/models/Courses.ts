import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface CoursesInstance extends Model {
id: number;
title: string;
total_hours:number;
created_by: string;
svg: string;
status:boolean;
certificate: any;
topics: string;

}

export const Courses = sequelize.define<CoursesInstance>('Courses', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    certificate: {
        type: DataTypes.STRING,
        unique: true
    },
    svg:{
        type: DataTypes.STRING,
    },
    created_by:{
        type: DataTypes.STRING,
    },
    topics:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    total_hours:{
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'courses',
    timestamps: false
});