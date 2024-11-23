import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'
import {natsWrapper} from "../../nats-wrapper";

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: '213rf3e',
            price: '20',
        }).expect(404);
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: '123fasdfawe',
            price: 25,
        }).expect(401);
})

it('returns a 401 if the user does not own the ticket', async () => {
    const ticket = await global.createTicket({title: 'title1', price: 25});

    await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', global.signin())
        .send({title: 'ticket2', price: 30})
        .expect(401);


})

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();
    const ticket = await global.createTicket({title: 'title1', price: 25}, cookie);

    await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', cookie)
        .send(
            {
                title: '',
                price: 20,
            }
        ).expect(400);


    await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', cookie)
        .send(
            {
                title: 'title1',
                price: -1,
            }
        ).expect(400);

    await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', cookie)
        .send(
            {
                price: null,
            }
        ).expect(400);

})

it('updates the ticket provided valid inputs', async () => {
    const title = 'title',
        price = 20,
        newTitle = 'new ' + title,
        newPrice = price + 25,
        cookie = global.signin(),
        ticket = await global.createTicket({title, price}, cookie),
        updatedTicket = await request(app)
            .put(`/api/tickets/${ticket.id}`)
            .set('Cookie', cookie)
            .send({title: newTitle, price: newPrice})
            .expect(200)

    expect(updatedTicket.body.title).toEqual(newTitle);
    expect(updatedTicket.body.price).toEqual(newPrice);
})

it('publishes an event', async () => {
    const title = 'title',
        price = 20,
        newTitle = 'new ' + title,
        newPrice = price + 25,
        cookie = global.signin(),
        ticket = await global.createTicket({title, price}, cookie),
        updatedTicket = await request(app)
            .put(`/api/tickets/${ticket.id}`)
            .set('Cookie', cookie)
            .send({title: newTitle, price: newPrice})
            .expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})

