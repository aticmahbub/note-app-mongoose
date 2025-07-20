export interface IUser {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: 'user' | 'admin';
}
