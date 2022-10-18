"use strict";
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
exports.HandleController = void 0;
const express = __importStar(require("express"));
const ref_1 = require("./ref");
class HandleController {
    Base;
    Service;
    constructor(Base, Service) {
        this.Base = Base;
        this.Service = Service;
    }
    Boost(Base) {
        const AdoNodeGlobalInterceptor = ref_1.ref.get(Base.name, Base.prototype, ":ControllerInterceptor");
        const app = express.Router();
        this.Service.forEach((service, URL) => {
            if (service.method == "Get") {
                URL = this.Base + URL;
                let fn = service.fn;
                service.fn = async function (req, res) {
                    if (AdoNodeGlobalInterceptor) {
                        if (AdoNodeGlobalInterceptor.before) {
                            AdoNodeGlobalInterceptor.before(req, res);
                        }
                        fn(req, res);
                        if (AdoNodeGlobalInterceptor.after) {
                            AdoNodeGlobalInterceptor.after(req, res);
                        }
                    }
                    else {
                        fn(req, res);
                    }
                };
                app.get(URL, service.fn);
            }
            if (service.method == "Post") {
                URL = this.Base + URL;
                let fn = service.fn;
                service.fn = async function (req, res) {
                    if (AdoNodeGlobalInterceptor) {
                        if (AdoNodeGlobalInterceptor.before) {
                            AdoNodeGlobalInterceptor.before(req, res);
                        }
                        fn(req, res);
                        if (AdoNodeGlobalInterceptor.after) {
                            AdoNodeGlobalInterceptor.after(req, res);
                        }
                    }
                    else {
                        fn(req, res);
                    }
                };
                app.post(URL, service.fn);
            }
            if (service.method == "All") {
                app.all(URL, service.fn);
            }
        });
        return app;
    }
}
exports.HandleController = HandleController;
//# sourceMappingURL=class.js.map