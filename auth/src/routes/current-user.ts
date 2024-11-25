import {currentUser} from "@manickorg/common";
import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    console.log(req.currentUser, 'currentUser');
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};
