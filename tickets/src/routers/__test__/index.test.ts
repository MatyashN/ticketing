import request from 'supertest';
import {app} from '../../app';
import {createTicket} from './new.test';

it('can fetch a list of tickets', async () => {

    await createTicket({title: 'ticket 1', price: 10});
    await createTicket({title: 'ticket 2', price: 20});
    await createTicket({title: 'ticket 3', price: 30});

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);

});
