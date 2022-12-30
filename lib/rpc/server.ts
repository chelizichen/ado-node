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
        console.log(body.toString());

        let res = await this.ArcEvent.emit(head, _body);

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
    unpacking(pkg:Buffer):any[]{
        // start to split
        let init = 0
        let end = pkg.lastIndexOf(size[size.length-1])

        // get args length
        let argsLength = size.indexOf(pkg.subarray(end,pkg.length).toString())

        let getArgs = new Array(argsLength).fill(0)

        while(true){
            if(init == argsLength){
                break;
            }
            // next start location 
            let start = pkg.indexOf(size[init])
            let start_size = pkg.subarray(start,start+size[init].length).toString()
            if(start_size == size[0]){
                let split_pkg = pkg.subarray(start,end)
                getArgs[init] = this.unpacking(split_pkg)
            }
            let after = pkg.indexOf(size[init+1])
            let data_pkg = pkg.subarray(start + size[init].length,after)
            getArgs[init] = data_pkg.toJSON()
            init ++;
        }
        return getArgs
    }

    
}

export {
    ArcServer
}