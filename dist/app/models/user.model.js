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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const notes_model_1 = require("./notes.model");
const addressSchema = new mongoose_1.Schema({
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
}, { _id: false });
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
    address: { type: addressSchema },
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.method('hashPassword', function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        return password;
    });
});
userSchema.static('hashPassword', function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        return password;
    });
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
userSchema.post('save', function (doc, next) {
    console.log(`${doc.email} has been saved`);
    next();
});
userSchema.post('findOneAndDelete', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            console.log(doc);
            yield notes_model_1.Note.deleteMany({ user: doc._id });
        }
        next();
    });
});
userSchema.pre('find', function (next) {
    next();
});
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.User = (0, mongoose_1.model)('User', userSchema);
