"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const pg_1 = require("./instances/pg");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: '*'
}));
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
pg_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection sucessfuly.');
})
    .catch((err) => {
    console.error('Error while connecting to database', err);
});
server.get('/ping', (req, res) => res.json({ pong: true }));
server.use('/api', api_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint not found.' });
});
const errorHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Something went wrong.' });
};
server.use(errorHandler);
server.listen(process.env.PORT, () => {
    console.log('Server running at port: ' + process.env.PORT);
});
