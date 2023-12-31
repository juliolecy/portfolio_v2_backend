import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface ProjectsInstance extends Model {
id: number;
title: string;
desc: string;
img: string| any;
git: string;
deploy: string;
tech: string | string[];
}

export const Projects = sequelize.define<ProjectsInstance>('Projects', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    desc: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.TEXT
    },
    tech: {
        type: DataTypes.STRING
    },
    git: {
        type: DataTypes.STRING
    },
    deploy: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'projects',
    timestamps: false
});