import express, {Request, Response} from 'express';
import {User} from '../models/user.model';
import {IUser} from '../interfaces/user.interface';
export const usersRouter = express.Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});
usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
});
usersRouter.post('/create-user', async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await User.create(user);
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        userInfo: createdUser,
    });
});
usersRouter.patch('/update-user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateUser = req.body;
    const createdUser = await User.findByIdAndUpdate(id, updateUser);
    res.status(201).json({
        success: true,
        message: 'User updated successfully',
        userInfo: createdUser,
    });
});
usersRouter.delete('/delete-user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(100).json({
        success: true,
        message: 'User deleted successfully',
        deletedUser,
    });
});
