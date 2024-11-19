import axios from "axios";
import helpers from "../helpers/helpers";

export default ({req}) => {
    console.log(2222);
    debugger
    if (helpers.isOnServer) {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        return axios.create({
            baseURL: '/'
        })
    }
};
