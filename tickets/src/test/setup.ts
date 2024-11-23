import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from "supertest";
import {app} from "../app";


declare global {
    var signin: () => string[];
    var createTicket: ({title, price}: { title: string, price: number }, cookie?: any) => Promise<any>;
}


jest.mock('../nats-wrapper');

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'aasdfasdfsaf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = () => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);


    // Build session Object. { jwt: MY_JWT }
    const session = {jwt: token};

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64    
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return ['session=' + base64];
}

global.createTicket = async ({title, price}: { title: string, price: number }, cookie = global.signin()) => {
    let res = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price,
        }).expect(201);

    return res.body;
}
