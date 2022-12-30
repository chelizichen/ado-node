import { connect, Socket } from "net";
import { proto, RpcClientValue, size } from ".";
import { ConnOpt } from "./server";



class ArcClient {
    public Net: Socket;

    constructor(opts: ConnOpt) {
        const { port, host } = opts;
        this.Net = connect({
            port,
            host,
        });

        this.Net.on("error", function (err) {
            console.log(err);
        });
    }

    /**
     * @call
     * @description arc 协议 拆包解包
     */
    call(pkg:RpcClientValue['router']) {
        const { method, data, interFace } = pkg;

        // 处理头部字段
        let head = Buffer.alloc(100)
        let head_str = this.getRequestHead(interFace,method)
        head.write(head_str)

        let getRequestArgs = this.getRequestArgs(data) 
        let body:Buffer = Buffer.from(getRequestArgs)

        let call_buf = Buffer.concat([head, body])

        return new Promise((resolve, reject) => {
            this.Net.write(call_buf, async (err) => {
                if (err) {
                    console.log("write -err ", err);
                    reject(err);
                }
                // 如果写入没有错误，则等待服务端返回数据
                const res = await this.res();
                console.log("res",res);
                
                resolve(res);
            });
        });
    }
    res() {
        return new Promise((resolve) => {
            this.Net.on("data", function (data: Buffer) {
                resolve(data.toString());
            });
        });
    }

    private getRequestArgs<K extends string|Record<string,any>|Array<any>>(args:K):string{
        if (typeof args == "string") {
            return args
        }

        if (args instanceof Array) {
            return JSON.stringify(args)
        }

        if (typeof args == "object") {
            let init = 0
            let _args = ""
            // 装配参数
            for (let v in args) {
                let _ret = this.getRequestArgs(args[v] as any)
                _args += size[init++] + _ret
            }
            _args += size[init]
            // 尾部添加参数
            return _args
        }
        return ""
    }

    private getRequestHead(...args:string[]):string{
        let head = ""
        
        args.forEach((item:string,index:number)=>{
            head += proto[index] + item
        })

        head += proto[proto.length-1]
        
        return head
    }
}

export { ArcClient };

// var ArcClient = function ({ port, host }) {
//     this.Net = Net.connect({
//         port,
//         host,
//     });
// };

// ArcClient.prototype.put = function ({ Interface, Api }, data) {

//     // this.Net.pause()

//     var version = 1;

//     head = JSON.stringify({ Interface, Api });
//     data = JSON.stringify(data);

//     var bf_interface = Buffer.alloc(100);
//     bf_interface.write(head);

//     var bf_data = Buffer.from(data);

//     var bf_concat = Buffer.concat([bf_interface, bf_data]);

//     if (bf_concat.length < 356) {
//         this.send(bf_concat);
//     } else {
//         var spl_count = (bf_concat.length - 356) / 256 + 0;
//         if (spl_count % 256 > 1) {
//             spl_count += 1;
//         }

//         this.send(bf_concat.subarray(0, 356));

//         while (spl_count > 0) {
//             var bf_spl = bf_concat.subarray(
//                 (version - 1) * 256 + 356,
//                 version * 256 + 356
//             );

//             this.send(bf_spl);
//             spl_count = spl_count - 1;
//         }
//         console.log("传输完成");
//     }

//     this.send("#")

//     return new Promise((reolsve) => {
//         this.Net.on("data", (buffer) => {
//             console.log(buffer.toString());
//             reolsve(buffer.toString());
//         });
//     });
// };

// ArcClient.prototype.send = function (buffer) {
//     this.Net.write(buffer, function (err) {
//         if (err) {
//             console.log("err", err);
//         }
//     });
//     // this.Net.on("data", (data) => {
//     //   console.log(data);
//     // });
// };
