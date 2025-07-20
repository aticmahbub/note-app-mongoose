export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
    password: string;
    email: string;
    role: 'user' | 'admin';
}
