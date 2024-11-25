import mongoose from 'mongoose';
import {app} from './app';
import {natsWrapper} from "./nats-wrapper";

const start = async () => {
    try {
        if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
        if (!process.env.NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID must be defined');
        if (!process.env.NATS_URL) throw new Error('NATS_URL must be defined');
        if (!process.env.NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID must be defined');
        let {JWT_KEY, MONGO_URI, NATS_CLIENT_ID, NATS_URL, NATS_CLUSTER_ID} = process.env;

        await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(MONGO_URI);

        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });
}

start();


