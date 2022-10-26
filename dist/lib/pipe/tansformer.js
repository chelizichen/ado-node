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
exports.class_transform = void 0;
const core_1 = require("../core");
const __ = __importStar(require("lodash"));
const enity_1 = require("../orm/enity");
class class_transform {
    static plainToClass(toClass, plain) {
        if (plain instanceof Array) {
            let retPlain = plain.map((el) => {
                const inst = new toClass();
                return __.assign(inst, el);
            });
            return retPlain;
        }
        else {
            const inst = new toClass();
            let retPlain = __.assign(inst, plain);
            return retPlain;
        }
    }
    static __classToPlain__(get, inst) {
        const plain = {};
        get.forEach((el) => {
            // @ts-ignore
            plain[el] = inst[el];
        });
        return plain;
    }
    // 当 options 为 true 的时候 过滤 类中需要过滤的键
    static classToPlain(classInst, options) {
        // 默认开启过滤模式
        if (!options || options.exclude) {
            if (classInst instanceof Array) {
                let plain = classInst.map((inst) => {
                    const filt = core_1.ref.get(enity_1.ENITY_CONSTANT.AutoCreate, inst.constructor.prototype);
                    const keys = Object.getOwnPropertyNames(inst);
                    const get = keys
                        .map((el) => {
                        return filt.indexOf(el) == -1 ? el : undefined;
                    })
                        .filter((el) => el);
                    return this.__classToPlain__(get, inst);
                });
                return plain;
            }
            else {
                const filt = core_1.ref.get(enity_1.ENITY_CONSTANT.AutoCreate, classInst.constructor.prototype);
                const keys = Object.getOwnPropertyNames(classInst);
                const get = keys
                    .map((el) => {
                    return filt.indexOf(el) == -1 ? el : undefined;
                })
                    .filter((el) => el);
                return this.__classToPlain__(get, classInst);
            }
        }
        else {
            if (classInst instanceof Array) {
                let plain = classInst.map((inst) => {
                    const keys = Object.getOwnPropertyNames(inst).filter((el) => el);
                    return this.__classToPlain__(keys, inst);
                });
                return plain;
            }
            else {
                const keys = Object.getOwnPropertyNames(classInst).filter((el) => el);
                return this.__classToPlain__(keys, classInst);
            }
        }
    }
}
exports.class_transform = class_transform;
//# sourceMappingURL=tansformer.js.map