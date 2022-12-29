import {createServer, Server, Socket} from 'net'

export type ConnOpt = {port:number,host:string}

class ArcServer {
    public Net!:Server;
    public socket!:Socket
    constructor(opts:ConnOpt) {
        const { port, host } = opts
        this.createServer({ port, host });
    }

    createServer({ port, host }:ConnOpt) {
        this.Net = createServer(socket => {
            this.socket = socket;
            this.socket.on("data", (buf) => {
                console.log(buf.toString());
            })
            this.socket.on("error",function(err){
                console.log("ado-rpc-err",err);
            })
            this.socket.on("connect",function(...args:any[]){
                console.log("some one connected ");
                console.log(args);
            })
        })
        this.Net.listen(port, host)
        console.log('监听成功');
    }
}
  
export {
    ArcServer
}