"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.Projects = pg_1.sequelize.define('Projects', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    desc: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    tech: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'projects',
    timestamps: false
});
