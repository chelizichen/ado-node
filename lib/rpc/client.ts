import { connect, Socket } from "net";
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
    call(pkg: { method: string; data: any; interFace: string }) {
        const { method, data, interFace } = pkg;

        // 处理头部字段
        let head = Buffer.alloc(100)
        let head_str = "#1:" + interFace + "#2:" + method
        head.write(head_str)

        // 处理传入信息
        // 后面会设定字段，减少开销
        let body_str = JSON.stringify(data)
        let body = Buffer.from("#3:"+body_str)
        let call_buf = Buffer.concat([head, body])

        return new Promise((resolve, reject) => {
            this.Net.write(call_buf, async (err) => {
                if (err) {
                    console.log("write -err ", err);
                    reject(err);
                }
                const res = await this.res();
                resolve(res);
            });
        });
    }
    res() {
        return new Promise((resolve) => {
            this.Net.on("data", function (data: Buffer) {
                // const json = JSON.stringify(data)
                // const copy = JSON.parse(json, (key, value) => {
                //     return value.type === 'Buffer' ?
                //       Buffer.from(value) :
                //       value;
                //   });
                resolve(data.toString());
            });
        });
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
