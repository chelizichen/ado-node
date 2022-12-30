import { createServer, Server, Socket } from 'net'
import { ArcEvent } from './event';

export type ConnOpt = { port: number, host: string }

class ArcServer {
    public Net!: Server;
    public socket!: Socket;
    public ArcEvent!: ArcEvent;

    constructor(opts: ConnOpt) {
        const { port, host } = opts;
        this.createServer({ port, host });
        this.ArcEvent = new ArcEvent();
        console.log("server start at " + host +":"+ port);
    }

    registEvents(...args: any[]) {
        args.forEach((item) => {
            for (let k in item) {
                this.ArcEvent.register(k, item[k]);
            }
        });
    }

    createServer({ port, host }: ConnOpt) {
        // 绑定this
        let bind_recieve = this.recieve.bind(this);

        this.Net = createServer((socket) => {
            this.socket = socket;
            this.socket.on("data", bind_recieve);
            this.socket.on("error", this.error);
            this.socket.on("connection", this.connection);
            console.log("有新用户链接");
        });
        this.Net.listen(port, host);
    }

    async recieve(data: Buffer) {
        // 拿到尾地址 head 尾地址
        let head_end = data.indexOf("[##]");
        // 截取 head
        let head = data.subarray(0, head_end);
        // 截取body
        let body = data.subarray(head_end, data.length);

        let res = await this.ArcEvent.emit(head, body);

        this.socket.write(res);
    };

    error(err: Error) {
        console.log("ado-rpc-err", err);
    }

    connection() {
        console.log("有新用户链接");
    }
}

export {
    ArcServer
}