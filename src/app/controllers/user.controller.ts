import express, {Request, Response} from 'express';
import {User} from '../models/user.model';
import z, {any, email} from 'zod';

export const usersRouter = express.Router();

const CreateUserSchemaZod = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
});

// usersRouter.get('/', async (req: Request, res: Response) => {
//     const users = await User.find();
//     res.status(200).json(users);
// });
usersRouter.get('/', async (req: Request, res: Response) => {
    const userEmail = req.query.email ? req.query.email : '';
    let users = [];
    // if (userEmail) {
    //     users = await User.find({email: userEmail});
    // } else {
    //     users = await User.find();
    // }
    users = await User.find().sort({email: 'asc'});

    // const users = await User.find();
    res.status(200).json(users);
});
usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
});
usersRouter.post('/create-user', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        // const password = await bcrypt.hash(body.password, 10);
        // body.password = password;

        // const zodBody = await CreateUserSchemaZod.parseAsync(req.body);

        // const createdUser = await User.create(body);
        // const user = new User(body);
        // const password = await user.hashPassword(body.password);
        // user.password = password;
        // await user.save();

        // built in and custom static methods
        // const password = await User.hashPassword(body.password);
        // body.password = password;
        const user = await User.create(body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userInfo: user,
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
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
    // const deletedUser = await User.findByIdAndDelete(id);
    const deletedUser = await User.findOneAndDelete({_id: id});
    res.status(100).json({
        success: true,
        message: 'User deleted successfully',
        deletedUser,
    });
});
