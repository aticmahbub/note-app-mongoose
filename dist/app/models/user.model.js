"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    },
    age: {
        type: Number,
        min: 18,
        max: 62,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // validate: {
        //     validator: function (value) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        //     },
        //     message: function (props) {
        //         return `Email ${props.value} is not valid`;
        //     },
        // },
        validate: [validator_1.default.isEmail, 'Invalid email received: {VALUE}'],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Role is not valid, got {Value}',
        },
        default: 'user',
    },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
