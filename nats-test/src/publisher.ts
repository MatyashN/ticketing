import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'title',
        price: 20,
    });

    stan.publish('ticket:cteated', data, () => {
        console.log('Event published');
    })
})