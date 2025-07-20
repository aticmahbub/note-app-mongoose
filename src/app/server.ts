import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';

let server: Server;

const port = 3000;
async function main() {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log('Connected to mongoose');
        server = app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
