"use strict";
// type QueryId = {
//   id: string;
// }
// @Controller("/computer")
// class ComputerController extends AdoNodeController{
//   @Get("/list")
//   async getList(){
//     return await {}
//   }
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoNodeController = exports.Boost = void 0;
const express = __importStar(require("express"));
const ref_1 = require("./ref");
exports.Boost = Symbol("Boost");
class AdoNodeController {
    Base;
    Service;
    constructor(Base, Service) {
        this.Base = Base;
        this.Service = Service;
    }
    [exports.Boost](Base) {
        const AdoNodeGlobalInterceptor = ref_1.ref.get(Base.name, Base.prototype, ":ControllerInterceptor");
        const app = express.Router();
        this.Service.forEach((service, URL) => {
            let fn = service.fn;
            service.fn = async function (req, res) {
                if (AdoNodeGlobalInterceptor) {
                    if (AdoNodeGlobalInterceptor.before) {
                        const data = await AdoNodeGlobalInterceptor.before(req);
                        if (data) {
                            res.json(data);
                            return;
                        }
                    }
                    const ret = await fn(req, res);
                    if (ret instanceof Error) {
                        res.json(ret);
                        return;
                    }
                    // 判断是不是Controller 层返回
                    if (ret.data && ret.after) {
                        res.json(ret.data);
                        // 单独拦截器的结尾操作
                        ret.after(req, res);
                        return;
                    }
                    else if (ret.data && !ret.after) {
                        res.json(ret.data);
                        return;
                    }
                    // 单独随便返回个东西
                    if (ret) {
                        res.json(ret);
                        return;
                    }
                    // 全局拦截器的结尾操作
                    if (AdoNodeGlobalInterceptor.after) {
                        AdoNodeGlobalInterceptor.after(req);
                    }
                    return;
                }
                else {
                    const ret = await fn(req, res);
                    if (ret instanceof Error) {
                        res.json(ret);
                        return;
                    }
                    // 判断是不是Controller 层返回
                    if (ret.data && ret.after) {
                        res.json(ret.data);
                        // 单独拦截器的结尾操作
                        ret.after(req, res);
                        return;
                    }
                    else if (ret.data && !ret.after) {
                        res.json(ret.data);
                        return;
                    }
                    // 单独随便返回个东西
                    if (ret) {
                        res.json(ret);
                        return;
                    }
                    return;
                }
            };
            if (service.method == "Get") {
                URL = this.Base + URL;
                app.get(URL, service.fn);
            }
            if (service.method == "Post") {
                URL = this.Base + URL;
                app.post(URL, service.fn);
            }
            if (service.method == "All") {
                app.all(URL, service.fn);
            }
            console.log("url", URL);
        });
        return app;
    }
}
exports.AdoNodeController = AdoNodeController;
//# sourceMappingURL=class.js.map