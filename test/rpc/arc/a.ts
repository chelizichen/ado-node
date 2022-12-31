import { readFileSync, writeFileSync } from 'fs';
import yaml from 'yaml'
import path from 'path';
import ejs from 'ejs'
declare interface ArcInterFace {
    name: string;
    remote: string;
    description: string;
    server:{
        path:string;
    }
    client:{
        path:string;
        controller:string;
    }
}

declare interface ArcMethod {
    [method:string]:{
        req:any,
        res:any
    }
}

class ArcYaml {
    public modules: any;
    public struct:Record<string,any>
    public interFace:Array<{interFace:ArcInterFace,method:ArcMethod}>

    constructor() {
        // record 
        this.struct = {}
        this.interFace = []
        const cxt = readFileSync(path.resolve(__dirname, "./module.yaml"), 'utf8');
        // 读取配置文件
        this.modules = yaml.parse(cxt)
        this.read_modules()
    }

    public async read_modules(){
        const {interFace,struct} = this.modules['module']

        // 将 strcut 丢入 Map 中
        this.read_struct(struct)

        // 更改参数配置
        this.read_interface(interFace)

    }

    /**
     * @param struct string[]
     * @description 读取配置文件 约定 yaml 配置参数
     */
    public async read_struct(struct:string[]){
        struct.forEach(el=>{
            const ctx = readFileSync(path.resolve(__dirname,"./"+el+".yaml"),"utf-8")
            const content = yaml.parse(ctx)
            const {struct:yamlStruct} = content;
            for(let v in yamlStruct){
                this.struct[v] = yamlStruct[v]
            }
        })
    }

    /**
     * @param interFace 
     * @description 对应 req res 改变对应的参数
     */
    public async read_interface(interFaceArray:string[]){
        interFaceArray.forEach(el=>{
            const ctx = readFileSync(path.resolve(__dirname,"./"+el+".yaml"),"utf-8")
            const content = yaml.parse(ctx)
            const {method} = content;
            for(let v in method){
                const {req,res} = method[v]
                method[v]["req"] = this.struct[req]
                method[v]["res"] = this.struct[res]
            }
            this.interFace.push(content)
        })
        console.log(JSON.stringify(this.interFace[0].method['hello']['req']));
    }
    /**
     * @description 根据配置文件路径生成 rpc - server client 文件
     */
    public async createTemplate(){
        let file_server_path = path.resolve(__dirname,"./example.server.ejs")
        let read_file_server = readFileSync(file_server_path,"utf-8")

        let file_client_path = path.resolve(__dirname,"./example.server.ejs")
        let read_file_client = readFileSync(file_client_path,"utf-8")
        this.interFace.forEach(item=>{
            let description = item.interFace.description
            let interFace = item.interFace.name
            let method = item.method
            let controller = item.interFace.client.controller
            let remote = item.interFace.remote
            let _path = item.interFace.server.path
            let write_server_path = path.resolve(_path,`./${interFace}.server.ts`)
            let write_server_file = ejs.render(read_file_server,{
                description,
                interFace,
                method
            })
            let write_client_path = path.resolve(_path,`./${interFace}.client.ts`)
            let write_client_file = ejs.render(read_file_client,{
                description,
                interFace,
                method,
                controller,
                remote
            })
            writeFileSync(write_server_path,write_server_file)
            writeFileSync(write_client_path,write_client_file)

        })

    }
}


const arcyaml = new ArcYaml();
arcyaml.createTemplate()
export { ArcYaml }