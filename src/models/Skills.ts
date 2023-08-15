import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface SkillsInstance extends Model {
   title: string;
   src: string;

}

export const Skills = sequelize.define<SkillsInstance>('Skills', {

    title: {
        type: DataTypes.STRING,
        unique: true
    },
    src: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    tableName: 'skills',
    timestamps: false
});