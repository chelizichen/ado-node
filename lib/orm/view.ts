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

import { ref } from "../ioc";
import { Connection } from "./conn";
import { AdoOrmBaseView } from "./orm";
import { FilterFields, IsEqual, RunConfig, ViewOptions, sql } from "./symbol";
import * as _ from 'lodash'
import { isArrayEqual } from "../oper/isArrayEqual";
import  chalk from 'chalk'

function GetViewFields(str: string) {
    // let reg = /AS\s\`(\w+)\`\,/
    let m;

    const regex = /AS `([^`]*)`/g;
    const values: string[] = [];
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

const View = (options: ViewOptions) => {
    const { engine } = options;

    return function (target: typeof AdoOrmBaseView) {
        const targetInst = new target();
        ref.def(target.name, targetInst, target.prototype);
        ref.def(":view_name", engine.view_name, target.prototype);
        targetInst[RunConfig](target);

        (async function () {
            const conn = await Connection.getConnection();
            // 查询是否有 视图
            conn.query("show create view " + engine.view_name, function (err, res) {
                if (err) {
                    // 没有则执行创建语句
                    conn.query(engine.type + engine.engine_sql, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    // 判断是否需要进行迁移
                    if (options.migration) {
                        const create_view_sql = res[0]["Create View"] as string;
                        let str = create_view_sql
                            .split("AS select ")[1]
                            .split(" from ")[0];
                        let fields = GetViewFields(str).map(el => el.toLowerCase())
                        let views_fields = engine.filter_fields.map(el => {
                            return el.split(".")[1]
                        }).map(el => el.toLowerCase())

                        let isEqual = isArrayEqual(fields, views_fields)

                        // 是否字段相等
                        if (isEqual) {
                            console.log(chalk.green("the view " + chalk.red(engine.view_name) + " does not need to migration"));
                        } else {
                            console.log(chalk.blue("the view " + chalk.red(engine.view_name) + "  need to migration"));
                            const migration_sql = "Alter" + engine.engine_sql;
                            // 修改视图
                            conn.query(migration_sql,function(err){
                                if(err){
                                    throw err
                                }
                                console.log("the view "+ chalk.red(engine.view_name) + " migration success")
                            })
                        }
                    }
                }

            });
        })();
    };
};

class createView {
    ViewName: string;

    selectOptions: string;

    ViewFields: string[];

    OmitFields: string[];

    Entitys: string[];

    FilterFields: string[]

    constructor(ViewName: string) {
        this.ViewName = ViewName;
        this.selectOptions = "";
        this.ViewFields = [];
        this.OmitFields = [];
        this.Entitys = [];
        this.FilterFields = []
    }

    [FilterFields]() {
        let filterFields = this.ViewFields.filter((view_field) => {
            let isOmit = this.OmitFields.some(
                (omit_field) => omit_field.toLowerCase() == view_field.toLowerCase()
            );

            return !isOmit;
        });
        this.FilterFields = filterFields

        return filterFields.join(",");
    }

    /**
     * @description 不区分大小写判断是否相等
     */
    [IsEqual](name1: string, name2: string) {
        if (typeof name1 == "string" && typeof name2 == "string") {
            if (name1.toLowerCase() == name2.toLocaleLowerCase()) {
                return true;
            } else {
                return false;
            }
        }
        throw new Error("args must be string");
    }

    // 排除一些不需要的键 或者有冲突的键
    omit<T extends string | string[]>(options: T) {
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
    create(): ViewOptions["engine"] {
        const get_fields = this[FilterFields]();
        const get_entitys = this.Entitys.join(",");
        let engine_sql = ` View ${this.ViewName} as Select ${get_fields} FROM ${get_entitys} where ${this.selectOptions}`;

        return {
            engine_sql,
            view_name: this.ViewName,
            filter_fields: this.FilterFields,
            type: "Create"
        };
    }

    addEntity(Entitys: Array<new (...args: any[]) => void>) {
        if (Entitys instanceof Array) {
            Entitys.forEach((AdoBaseEntity) => {
                let getFields = Object.getOwnPropertyNames(new AdoBaseEntity());
                let tablename = ref.get(":tablename", AdoBaseEntity.prototype);
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

    addOptions(options: sql) {
        if (typeof options == "string") {
            this.selectOptions = options;
            return this;
        }
        throw new Error("options must be string");
    }
}

function CreateView(ViewName: string) {
    const newView = new createView(ViewName);
    return newView;
}

export { View, CreateView };
