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
            this.socket.on("data", this.recieve)
            this.socket.on("error",this.error)
        })
        this.Net.listen(port, host)
        console.log('监听成功');
    }

    recieve(data:Buffer) {
        console.log(data.toString());
    }

    error(err: Error) {
        console.log("ado-rpc-err",err);
    }
}
  
export {
    ArcServer
}