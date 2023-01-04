import { createServer, Server, Socket } from "net";
import { size, proto } from ".";
import { ArcEvent } from "./event";

export type ConnOpt = { port: number; host: string };

class ArcServer {
    public Net!: Server;
    public socket!: Socket;
    public ArcEvent!: ArcEvent;

    constructor(opts: ConnOpt) {
        const { port, host } = opts;
        this.createServer({ port, host });
        this.ArcEvent = new ArcEvent();
        console.log("server start at " + host + ":" + port);
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
        let timeout = Number(this.unpkgHead(2, data, true));
        let head = data.subarray(0, data.indexOf(proto[2]));
        let body = data.subarray(head_end + 4, data.length);
        let _body = this.unpacking(body);

        Promise.race([
            this.timeout(timeout),
            this.ArcEvent.emit(head, ..._body),
        ]).then((res:any)=>{
            let toJson = JSON.stringify(res);
            this.socket.write(toJson, function (err) {
                if (err) {
                    console.log("服务端写入错误", err);
                }
                console.log("服务端写入成功");
            });
        }).catch((err:any)=>{
            this.socket.write(err, function (err) {
                if (err) {
                    console.log("服务端写入错误", err);
                }
                console.log("服务端写入成功");
            });
        })



    }

    error(err: Error) {
        console.log("ado-rpc-err", err);
    }

    connection() {
        console.log("有新用户链接1");
    }
    /**
     *
     * @param pkg Buffer
     * @returns value:any[]
     * @description 拆包 根据 start 和 end 拆包
     */
    unpacking(buf: Buffer): any[] {
        let args = [];
        let init = 0;
        let start = buf.indexOf(size[init]);
        while (true) {
            let end_str = buf.subarray(start, start + 3).toString();
            let isEnd = end_str == size[size.length - 1];
            if (isEnd) {
                break;
            }
            let next = buf.indexOf(size[init + 1], start);
            if (next == -1) {
                let sub_pkg = buf.subarray(start, start + 6).toString();
                let is_un_pkg = sub_pkg == size[init] + size[0];
                // 判断是否为未分割的参数
                if (is_un_pkg) {
                    let un_pkg = buf.subarray(start + 3, buf.length - 3);
                    let getargs = this.unpacking(un_pkg);
                    args[init] = getargs;
                } else {
                    let un_pkg = buf.subarray(start + 3, buf.length - 3).toString();
                    args[init] = un_pkg;
                }
                break;
            } else {
                let isObject =
                    buf.subarray(start, start + 6).toString() == size[init] + size[0];
                if (isObject) {
                    let end = buf.indexOf(size[size.length - 1] + size[init + 1]);
                    let un_pkg = buf.subarray(start + 3, end + 3);
                    let getargs = this.unpacking(un_pkg);
                    args[init] = getargs;
                    start = end + 3;
                } else {
                    let getargs = buf.subarray(start + 3, next).toString();
                    args[init] = getargs;
                    start = next;
                }
            }
            init++;
        }
        return args;
    }

    /**
     * @description 首部拆包得到字段
     */

    unpkgHead(start: number, data: Buffer): string;

    unpkgHead(start: number, data: Buffer, end: boolean): string;

    unpkgHead(start: number, data: Buffer, end?: boolean): string {
        let start_index = data.indexOf(proto[start]);
        let start_next: number = 0;
        if (end) {
            start_next = data.indexOf(proto[proto.length - 1]);
        } else {
            start_next = data.indexOf(proto[start + 1]);
        }
        let timeout = data
            .subarray(start_index + proto[start].length, start_next)
            .toString("utf-8");
        return timeout;
    }

    timeout(time: number) {
        return new Promise((_:any,rej:any) => {
            let _time = setTimeout(() => {
                rej("请求超时");
                clearTimeout(_time);
            }, time);
        });
    }
}

export { ArcServer };
