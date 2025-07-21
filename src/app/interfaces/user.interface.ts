import {Model} from 'mongoose';

export interface IAddress {
    city: string;
    street: string;
    zip: number;
}
export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
    password: string;
    email: string;
    role: 'user' | 'admin';
    address: IAddress;
}
export interface UserInstanceMethods {
    hashPassword(password: string): string;
}

export interface UserStaticMethods extends Model<IUser> {
    hashPassword(password: string): string;
}
