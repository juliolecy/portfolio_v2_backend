"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.ping = void 0;
const Projects_1 = require("../models/Projects");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let projects = yield Projects_1.Projects.findAll();
    res.json({ projects });
});
exports.getProjects = getProjects;
// export const login = async (req: Request, res: Response) => {
//     if(req.body.email && req.body.password) {
//         let email: string = req.body.email;
//         let password: string = req.body.password;
//         let user = await User.findOne({ 
//             where: { email, password }
//         });
//         if(user) {
//             const token = jwt.sign(
//                 {id: user.id, email: user.email},
//                 process.env.JWT_KEY as string,
//                 {expiresIn: '2h'}
//             )
//             res.json({ status: true, token });
//             return;
//         }
//     }
//     res.json({ status: false });
// }
// export const list = async (req: Request, res: Response) => {
//     let users = await User.findAll();
//     let list: string[] = [];
//     for(let i in users) {
//         list.push( users[i].email );
//     }
//     res.json({ list });
// }
