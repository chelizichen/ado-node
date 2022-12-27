"use strict";
// @View({
//     engine:CreateView( ViewName:string )
//              .addEntity([User,Info])
//              .omit("Info.id")
//              .addOptions("User.id == Info.user_id")
//              .create()
// })
// class UserInfo{
//     id :string;
//     username:string;
//     password:string;
//     permission:string;
//     user_id:string;
//     user_email:string;
//     user_location:string;
//     user_phone:string;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateView = exports.View = void 0;
// @Entity( tableName:string )
// class User{
//     id :string;
//     username:string;
//     password:string;
//     permission:string;
// }
// @Entity( tableName:string )
// class Info{
//     id：string;
//     user_id:string;
//     user_email:string;
//     user_location:string;
//     user_phone:string;
// }
const ioc_1 = require("../ioc");
const conn_1 = require("./conn");
const symbol_1 = require("./symbol");
const View = (options) => {
    const { engine } = options;
    console.log("engine", engine);
    return function (target) {
        const targetInst = new target();
        ioc_1.ref.def(target.name, targetInst, target.prototype);
        ioc_1.ref.def(":view_name", engine.view_name, target.prototype);
        targetInst[symbol_1.RunConfig](target);
        (async function () {
            const conn = await conn_1.Connection.getConnection();
            conn.query("show create view " + engine.view_name, function (err) {
                if (err) {
                    conn.query(engine.engine_sql, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        })();
    };
};
exports.View = View;
class createView {
    ViewName;
    selectOptions;
    ViewFields;
    OmitFields;
    Entitys;
    constructor(ViewName) {
        this.ViewName = ViewName;
        this.selectOptions = "";
        this.ViewFields = [];
        this.OmitFields = [];
        this.Entitys = [];
    }
    [symbol_1.FilterFields]() {
        let filterFields = this.ViewFields.filter((view_field) => {
            let isOmit = this.OmitFields.some((omit_field) => omit_field.toLowerCase() == view_field.toLowerCase());
            return !isOmit;
        });
        return filterFields.join(",");
    }
    /**
     * @description 不区分大小写判断是否相等
     */
    [symbol_1.IsEqual](name1, name2) {
        if (typeof name1 == "string" && typeof name2 == "string") {
            if (name1.toLowerCase() == name2.toLocaleLowerCase()) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("args must be string");
    }
    // 排除一些不需要的键 或者有冲突的键
    omit(options) {
        if (typeof options == "string") {
            this.OmitFields.push(options);
            return this;
        }
        if (options instanceof Array) {
            this.OmitFields.push(...options);
            return this;
        }
        throw new Error("options must be typeof Array<string> or string");
    }
    // 返回sql
    create() {
        const get_fields = this[symbol_1.FilterFields]();
        const get_entitys = this.Entitys.join(",");
        let engine_sql = `Create View ${this.ViewName} as Select ${get_fields} FROM ${get_entitys} where ${this.selectOptions}`;
        return {
            engine_sql,
            view_name: this.ViewName,
        };
    }
    addEntity(Entitys) {
        if (Entitys instanceof Array) {
            Entitys.forEach((AdoBaseEntity) => {
                let getFields = Object.getOwnPropertyNames(new AdoBaseEntity());
                let tablename = ioc_1.ref.get(":tablename", AdoBaseEntity.prototype);
                this.Entitys.push(tablename);
                getFields.forEach((field) => {
                    let concrete_field = tablename + "." + field;
                    this.ViewFields.push(concrete_field);
                });
            });
            return this;
        }
        throw new Error("Entitys must be Array<AdoOrmBaseEntity>");
    }
    addOptions(options) {
        if (typeof options == "string") {
            this.selectOptions = options;
            return this;
        }
        throw new Error("options must be string");
    }
}
function CreateView(ViewName) {
    const newView = new createView(ViewName);
    return newView;
}
exports.CreateView = CreateView;
//# sourceMappingURL=view.js.map