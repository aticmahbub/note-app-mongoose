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
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const zod_1 = __importDefault(require("zod"));
exports.usersRouter = express_1.default.Router();
const CreateUserSchemaZod = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    age: zod_1.default.number(),
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    role: zod_1.default.string().optional(),
});
exports.usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    res.status(200).json(users);
}));
exports.usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.User.findById(id);
    res.status(200).json(user);
}));
exports.usersRouter.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // const zodBody = await CreateUserSchemaZod.parseAsync(req.body);
        // console.log(zodBody, 'zod body');
        const createdUser = yield user_model_1.User.create(body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userInfo: createdUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.usersRouter.patch('/update-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateUser = req.body;
    const createdUser = yield user_model_1.User.findByIdAndUpdate(id, updateUser);
    res.status(201).json({
        success: true,
        message: 'User updated successfully',
        userInfo: createdUser,
    });
}));
exports.usersRouter.delete('/delete-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedUser = yield user_model_1.User.findByIdAndDelete(id);
    res.status(100).json({
        success: true,
        message: 'User deleted successfully',
        deletedUser,
    });
}));
