const helpers = {
    get isOnServer() {
        return typeof window === 'undefined';
    }
}

export default helpers;
