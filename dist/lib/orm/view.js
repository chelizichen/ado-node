"use strict";
// @View({
//     engine:CreateView( ViewName:string )
//              .addEntity([User,Info])
//              .omit("Info.id")
//              .addOptions("User.id == Info.user_id")
//              .create(),
//     migration:true
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const isArrayEqual_1 = require("../oper/isArrayEqual");
const chalk_1 = __importDefault(require("chalk"));
function GetViewFields(str) {
    // let reg = /AS\s\`(\w+)\`\,/
    let m;
    const regex = /AS `([^`]*)`/g;
    const values = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                values.push(match);
            }
        });
    }
    return values;
}
const View = (options) => {
    const { engine } = options;
    return function (target) {
        const targetInst = new target();
        ioc_1.ref.def(target.name, targetInst, target.prototype);
        ioc_1.ref.def(":view_name", engine.view_name, target.prototype);
        targetInst[symbol_1.RunConfig](target);
        (async function () {
            const conn = await conn_1.Connection.getConnection();
            // 查询是否有 视图
            conn.query("show create view " + engine.view_name, function (err, res) {
                if (err) {
                    // 没有则执行创建语句
                    conn.query(engine.type + engine.engine_sql, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                else {
                    // 判断是否需要进行迁移
                    if (options.migration) {
                        const create_view_sql = res[0]["Create View"];
                        let str = create_view_sql
                            .split("AS select ")[1]
                            .split(" from ")[0];
                        let fields = GetViewFields(str).map(el => el.toLowerCase());
                        let views_fields = engine.filter_fields.map(el => {
                            return el.split(".")[1];
                        }).map(el => el.toLowerCase());
                        let isEqual = (0, isArrayEqual_1.isArrayEqual)(fields, views_fields);
                        // 是否字段相等
                        if (isEqual) {
                            console.log(chalk_1.default.green("the view " + chalk_1.default.red(engine.view_name) + " does not need to migration"));
                        }
                        else {
                            console.log(chalk_1.default.blue("the view " + chalk_1.default.red(engine.view_name) + "  need to migration"));
                            const migration_sql = "Alter" + engine.engine_sql;
                            // 修改视图
                            conn.query(migration_sql, function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log("the view " + chalk_1.default.red(engine.view_name) + " migration success");
                            });
                        }
                    }
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
    FilterFields;
    constructor(ViewName) {
        this.ViewName = ViewName;
        this.selectOptions = "";
        this.ViewFields = [];
        this.OmitFields = [];
        this.Entitys = [];
        this.FilterFields = [];
    }
    [symbol_1.FilterFields]() {
        let filterFields = this.ViewFields.filter((view_field) => {
            let isOmit = this.OmitFields.some((omit_field) => omit_field.toLowerCase() == view_field.toLowerCase());
            return !isOmit;
        });
        this.FilterFields = filterFields;
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
        let engine_sql = ` View ${this.ViewName} as Select ${get_fields} FROM ${get_entitys} where ${this.selectOptions}`;
        return {
            engine_sql,
            view_name: this.ViewName,
            filter_fields: this.FilterFields,
            type: "Create"
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