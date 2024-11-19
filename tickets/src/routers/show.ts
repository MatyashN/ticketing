import express, {Request, Response} from "express";
import {Ticket} from "../models/ticket";
import {NotFoundError, requireAuth} from "@manickorg/common";

const router = express.Router();

router.get('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
    debugger
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError()
    }

    return res.send(ticket);
})

export {router as showTicketRouter}
