import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface ProjectsInstance extends Model {
    id: number;
    email: string;
    password: string;
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
        type: DataTypes.STRING
    },
    tech: {
        type: DataTypes.ARRAY
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