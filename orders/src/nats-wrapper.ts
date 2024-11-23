import nats, {Stan} from "node-nats-streaming";

class NatsWrapper {
    private _client?: Stan;

    get client(): Stan {
        if (!this._client) {
            throw new Error("NATS client does not exist");
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {url});

        return new Promise<void>((resolve, reject) => {
            try {

                this.client.on('connect', () => {
                    console.log('Connected to NATS');
                    resolve();
                })

                this.client.on('error', (err) => {
                    reject(err);
                })
            } catch (err) {
                console.error(err);
            }
        })

    }
}

export const natsWrapper = new NatsWrapper();
