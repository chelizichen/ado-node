import { Socket } from "net";
import { proto, RpcClientValue, size } from ".";
import { ConnOpt } from "./server";
import { ArcEvent } from "./event";
import { ArcList } from "./list";
import { ref } from "../ioc/ref";
class ArcClient {
    public Net: Socket;
    public ArcList;
    constructor(opts: ConnOpt) {
        const { port, host } = opts;
        this.ArcList = new ArcList();
        this.Net = ArcEvent.getTcpConn(JSON.stringify({ port, host }));

        const { name, prototype } = ArcClient
        if (!ref.get(name, prototype, ":arcList")) {
            ref.def(name, this.ArcList, prototype, ":arcList")
        }

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
        let getRequestArgs = this.getRequestArgs(data);
        let body: Buffer = Buffer.from(getRequestArgs);
        let body_len = body.length;
        
        let head_str = this.getRequestHead(
          interFace,
          method,
          String(timeout),
          String(body_len)
        );
        let head = Buffer.from(head_str);
        
        let call_buf = Buffer.concat([head, body]);

        return new Promise((resolve: any, reject: any) => {
            this.Net.write(call_buf, async (err) => {
                if (err) {
                    console.log("write -err ", err);
                    reject(err);
                }
                Promise.race([this.timeout(timeout), this.res()])
                    .then((res: any) => {
                        resolve(res);
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            });
        });
    }
    /**
     * @description 得到会无端传输过来的数据
     */
    res() {
        return new Promise((resolve: any) => {
            this.Net.on("data", function (data: Buffer) {
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
        return new Promise((_: any, rej: any) => {
            let _time = setTimeout(() => {
                rej("请求超时");
                clearTimeout(_time);
            }, timeout);
        });
    }
}

export { ArcClient };
