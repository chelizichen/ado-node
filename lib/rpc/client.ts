import { Socket } from "net";
import { proto, RpcClientValue, size } from ".";
import { ConnOpt } from "./server";
import { ArcEvent } from "./event";

class ArcClient {
    public Net: Socket;

    constructor(opts: ConnOpt) {
        const { port, host } = opts;

        this.Net = ArcEvent.getTcpConn(JSON.stringify({ port, host }));

        this.Net.on("error", function (err) {
            console.log(err);
        });
    }

    /**
     * @call
     * @description arc 协议 拆包解包
     */
    call(pkg: RpcClientValue["router"]) {
        const { method, data, interFace, timeout } = pkg;

        // 处理头部字段
        let head = Buffer.alloc(100);
        let head_str = this.getRequestHead(interFace, method, String(timeout));
        head.write(head_str);

        let getRequestArgs = this.getRequestArgs(data);
        let body: Buffer = Buffer.from(getRequestArgs);

        let call_buf = Buffer.concat([head, body]);

        return new Promise((resolve, reject) => {
            this.Net.write(call_buf, async (err) => {
                if (err) {
                    console.log("write -err ", err);
                    reject(err);
                }
                Promise.race([this.timeout(timeout), this.res()]).then(res=>{
                    resolve(res);
                })
            });
        });
    }
    res() {
        return new Promise((resolve) => {
            this.Net.on("data", function (data: Buffer) {
                console.log("data", data);
                resolve(data.toString());
            });
        });
    }

    private getRequestArgs<K extends string | Record<string, any> | Array<any>>(
        args: K
    ): string {
        if (typeof args == "string") {
            return args;
        }

        if (args instanceof Array) {
            return JSON.stringify(args);
        }

        if (typeof args == "object") {
            let init = 0;
            let _args = "";
            // 装配参数
            for (let v in args) {
                let _ret = this.getRequestArgs(args[v] as any);
                _args += size[init++] + _ret;
            }
            _args += size[init];
            // 尾部添加参数
            return _args;
        }
        return "";
    }

    private getRequestHead(...args: string[]): string {
        let head = "";

        args.forEach((item: string, index: number) => {
            head += proto[index] + item;
        });

        head += proto[proto.length - 1];

        return head;
    }
    timeout(timeout: number) {
        return new Promise((res) => {
            let _time = setTimeout(() => {
                res("请求超时");
                clearTimeout(_time);
            }, timeout);
        });
    }
}

export { ArcClient };
