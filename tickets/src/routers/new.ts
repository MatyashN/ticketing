import {requireAuth, validateRequest} from '@manickorg/common';
import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {Ticket} from '../models/ticket';
import {TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
import {natsWrapper} from "../nats-wrapper";

const router = express.Router();

router.post('/api/tickets', requireAuth, [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        let {title, price} = req.body,
            userId = req.currentUser!.id;

        const ticket = Ticket.build({title, price, userId});

        await ticket.save();

        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
        });

        res.status(201).send(ticket);
    }
);

export {router as createTicketRouter}
