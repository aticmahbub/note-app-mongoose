import {Model, model, Schema} from 'mongoose';
import {
    IAddress,
    IUser,
    UserInstanceMethods,
    UserStaticMethods,
} from '../interfaces/user.interface';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const addressSchema = new Schema<IAddress>(
    {
        city: {type: String},
        street: {type: String},
        zip: {type: Number},
    },
    {_id: false},
);
const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
    {
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
            validate: [validator.isEmail, 'Invalid email received: {VALUE}'],
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
        address: {type: addressSchema},
    },
    {versionKey: false, timestamps: true},
);

userSchema.method('hashPassword', async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
});
userSchema.static('hashPassword', async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
});
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.post('save', function (doc) {
    console.log(`${doc.email} has been saved`);
});
export const User = model<IUser, UserStaticMethods>('User', userSchema);
