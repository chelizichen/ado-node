import { createServer, Server, Socket } from 'net'
import { size } from '.';
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

        let head_end = data.indexOf("[##]");

        let head = data.subarray(0, head_end);

        let body = data.subarray(head_end + 4, data.length);
        
        let _body = this.unpacking(body);
        console.log('_body',_body);
        
        console.log(body.toString());

        let res = await this.ArcEvent.emit(head, ..._body);

        this.socket.write(res);
    };

    error(err: Error) {
        console.log("ado-rpc-err", err);
    }

    connection() {
        console.log("有新用户链接");
    }
    /**
     * 
     * @param pkg Buffer
     * @returns value:any[]
     * @description 拆包 根据 start 和 end 拆包
     */
    unpacking(buf:Buffer):any[]{
        let args = []
        let init = 0
        let start = buf.indexOf(size[init])
        while (true) {
            let end_str = buf.subarray(start, start + 3).toString()
            let isEnd = end_str == size[size.length - 1]
            if (isEnd) {
                break
            }
            let next = buf.indexOf(size[init + 1], start)
            if (next == -1) {
                let sub_pkg = buf.subarray(start, start + 6).toString()
                let is_un_pkg = sub_pkg == size[init] + size[0]
                // 判断是否为未分割的参数
                if (is_un_pkg) {
                    let un_pkg = buf.subarray(start + 3, buf.length - 3)
                    let getargs = this.unpacking(un_pkg)
                    args[init] = getargs
                } else {
                    let un_pkg = buf.subarray(start + 3, buf.length - 3).toString()
                    args[init] = un_pkg
                }
                break
            } else {
                let isObject = buf.subarray(start, start + 6).toString() == size[init] + size[0]
                if (isObject) {
                    let end = buf.indexOf(size[size.length - 1] + size[init + 1])
                    let un_pkg = buf.subarray(start + 3, end + 3)
                    let getargs = this.unpacking(un_pkg)
                    args[init] = getargs
                    start = end + 3;
                } else {
                    let getargs = buf.subarray(start + 3, next).toString()
                    args[init] = getargs
                    start = next;
                }
            }
            init++
        }
        return args
    }
    
}

export {
    ArcServer
}