const { readFileSync, writeFileSync, readdirSync, readdir, fstat, existsSync } = require('fs');
const yaml = require('yaml')
const path = require('path');
const ejs = require('ejs');
const { cwd } = require('process');

/**
 * @config: 
    yaml: {
      modules: 'test/arc/modules,',       
      interface: 'test/arc/interface,',   
      struct: 'test/arc/struct'
    },
    generate: {
      server: 'test/rpc/server/interface',
      client: 'test/rpc/client/controller'
    }
 */
class ArcYaml {
    constructor() {
        // record 
        this.struct = {}
        this.interFace = []
        this.config = {}
        this.read_config()

        this.read_modules()

        console.log(this.interFace);
        // this.read_interface()
    }

    // 读取配置文件
    async read_config() {
        const config_path = path.resolve(process.cwd() + "/arc.config.yaml")
        const ctx = readFileSync(config_path, "utf-8")
        const content = yaml.parse(ctx)
        this.config = content.arc
    }
    // 读取模块
    async read_modules() {

        const module_path = path.resolve(process.cwd(), this.config.yaml.modules)
        const modules = readdirSync(module_path)
        modules.forEach(module => {
            // 一次for 循环 读取 所有 模块的配置文件
            const _path = path.resolve(cwd(), module_path, module)

            const ctx = readFileSync(_path, "utf-8")

            const content = yaml.parse(ctx)

            const { interFace, struct } = content['module']

            // // 将 strcut 丢入 Map 中
            this.read_struct(struct)

            // // 更改参数配置
            this.read_interface(interFace)
        })
    }

    /**
     * @param struct string[]
     * @description 读取配置文件 约定 yaml 配置参数
     */
    async read_struct(struct) {
        const { struct: strcut_path } = this.config.yaml
        struct.forEach(el => {
            // 读取目录
            const ctx = readFileSync(path.resolve(cwd(), strcut_path, el + ".yaml"), "utf-8")
            const content = yaml.parse(ctx)
            const { struct: yamlStruct } = content;
            for (let v in yamlStruct) {
                this.struct[v] = yamlStruct[v]
            }
        })
    }

    /**
     * @param interFace 
     * @description 对应 req res 改变对应的参数
     */
    async read_interface(interFaceArray) {
        const { interface: interFace } = this.config.yaml
        interFaceArray.forEach(el => {
            const ctx = readFileSync(path.resolve(cwd(), interFace, el + ".yaml"), "utf-8")
            const content = yaml.parse(ctx)
            const { method } = content;
            for (let v in method) {
                const { req, res } = method[v]
                method[v]["req"] = this.struct[req]
                method[v]["res"] = this.struct[res]
            }
            this.interFace.push(content)
        })
    }
    /**
     * @description 根据配置文件路径生成 rpc - server client 文件
     */
    async createTemplate(type) {
        let generatePath = this.config.generate[type] // 获取路径 

        if (type == "server") {
            // 模板文件
            let file_server_path = path.resolve(__dirname, "./rpc/example.server.ejs")
            let read_file_server = readFileSync(file_server_path, "utf-8")
            this.interFace.forEach(item => {
                let description = item.interFace.description
                let interFace = item.interFace.name
                let method = item.method
                let controller = item.interFace.client.controller
                let remote = item.interFace.remote
                let write_server_path = path.resolve(cwd(),generatePath, `${interFace}.server.ts`)

                function renderReq(v){
                    let req  = JSON.stringify(method[v]['req']);
                    req = req.replaceAll("\"","")
                    req = req.substring(1,req.length-1)
                    console.log(req);
                    return req
                }
                function renderRes(v){
                    let res = JSON.stringify(method[v]['res']);
                    res = res.replaceAll("\"","")
                    return res
                }

                let write_server_file = ejs.render(read_file_server, {
                    description,
                    interFace,
                    method,
                    req:renderReq,
                    res:renderRes
                })
                writeFileSync(write_server_path, write_server_file)
            })

        }
        if (type == "client") {
            let file_client_path = path.resolve(__dirname, "./rpc/example.client.ejs")
            let read_file_client = readFileSync(file_client_path, "utf-8")
            this.interFace.forEach(item => {
                let description = item.interFace.description
                let interFace = item.interFace.name
                let method = item.method
                let controller = item.interFace.client.controller
                let remote = item.interFace.remote

                let write_client_path = path.resolve(cwd(),generatePath,`${interFace}.client.ts`)
                
                let write_client_file = ejs.render(read_file_client, {
                    description,
                    interFace,
                    method,
                    controller,
                    remote
                })
                writeFileSync(write_client_path, write_client_file)
            })


        }






    }

}
module.exports = { ArcYaml }