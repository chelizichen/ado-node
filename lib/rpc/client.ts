import { connect, Socket } from "net";
import { ConnOpt } from "./server";

class ArcClient {
    public Net: Socket

    constructor(opts: ConnOpt) {
        const { port, host } = opts
        this.Net = connect({
            port,
            host
        })


        this.Net.on("error", function (err) {
            console.log(err);
        })

        // this.call(host+" "+ port+" good night")
        // this.Net.wr
    }

    call(data: any) {
        return new Promise((resolve,reject)=>{
            const tojson = JSON.stringify(data)
            const buffer = Buffer.from(tojson)
            this.Net.write(buffer, async (err)=> {
                if(err){
                    console.log('write -err ',err);
                    reject(err)
                }
                const res = await this.res() 
                resolve(res)
            })
        })

    }
    res(){
        return new Promise((resolve)=>{
            this.Net.on("data", function (data: Buffer) {
                // const json = JSON.stringify(data)
                // const copy = JSON.parse(json, (key, value) => {
                //     return value.type === 'Buffer' ?
                //       Buffer.from(value) :
                //       value;
                //   });
                resolve(data.toString())
            })
        })
    }
}

export { ArcClient }

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