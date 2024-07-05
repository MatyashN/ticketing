import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: '123456789',
    }).expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'testtest.com',
        password: '123456789',
    }).expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'p',
    }).expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
    }).expect(400);
    
    await request(app).post('/api/users/signup').send({
        password: '123456789',
    }).expect(400);

    return request(app).post('/api/users/signup').send({}).expect(400);

});