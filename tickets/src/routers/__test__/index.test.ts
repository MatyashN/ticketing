import request from 'supertest';
import {app} from '../../app';

it('can fetch a list of tickets', async () => {

    await global.createTicket({title: 'ticket 1', price: 10});
    await global.createTicket({title: 'ticket 2', price: 20});
    await global.createTicket({title: 'ticket 3', price: 30});

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);

});
