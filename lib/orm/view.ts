import { ref } from "../ioc"
import { Connection } from "./conn"

type ViewOptions = {
    engine: sql
}

type sql = string

const FilterFields = Symbol("FilterFields")
const IsEqual = Symbol('IsEqual')


const View = (options: ViewOptions): ClassDecorator => {
    const { engine } = options
    console.log('engine', engine);

    return function (_target: Function) {
        (async function () {
            const conn = await Connection.getConnection()
            conn.query(engine, function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.log('res',res);
            })
        }())


    }
}

class createView {

    ViewName: string;

    selectOptions: string;

    ViewFields: string[];

    OmitFields: string[]

    Entitys: string[]

    constructor(ViewName: string) {
        this.ViewName = ViewName;
        this.selectOptions = ""
        this.ViewFields = []
        this.OmitFields = []
        this.Entitys = []

    }

    [FilterFields]() {
        let filterFields = this.ViewFields.filter((view_field) => {
            let isOmit = this.OmitFields.some(omit_field => omit_field.toLowerCase() == view_field.toLowerCase())

            return !isOmit
        })

        return filterFields.join(",")
    }

    /**
     * @description 不区分大小写判断是否相等
     */
    [IsEqual](name1: string, name2: string) {
        if (typeof name1 == "string" && typeof name2 == "string") {
            if (name1.toLowerCase() == name2.toLocaleLowerCase()) {
                return true
            }
            else {
                return false
            }
        }
        throw new Error("args must be string")
    }

    // 排除一些不需要的键 或者有冲突的键
    omit<T extends string | string[]>(options: T) {
        if (typeof options == "string") {
            this.OmitFields.push(options)
            return this
        }
        if (options instanceof Array) {
            this.OmitFields.push(...options)
            return this
        }

        throw new Error("options must be typeof Array<string> or string")

    }

    // 返回sql 
    create(): sql {

        const get_fields = this[FilterFields]()
        const get_entitys = this.Entitys.join(",")
        let create_sql = `Create View ${this.ViewName} as Select ${get_fields} FROM ${get_entitys} where ${this.selectOptions}`;

        return create_sql
    }

    addEntity(Entitys: Array<new (...args: any[]) => void>) {


        if (Entitys instanceof Array) {
            Entitys.forEach(AdoBaseEntity => {
                let getFields = Object.getOwnPropertyNames(new AdoBaseEntity())
                let tablename = ref.get(":tablename", AdoBaseEntity.prototype)
                this.Entitys.push(tablename)
                getFields.forEach(field => {
                    let concrete_field = tablename + "." + field
                    this.ViewFields.push(concrete_field)
                })
            })
            return this
        }
        throw new Error("Entitys must be Array<AdoOrmBaseEntity>")

    }

    addOptions(options: sql) {
        if (typeof options == "string") {
            this.selectOptions = options
            return this
        }
        throw new Error("options must be string")
    }
}

function CreateView(ViewName: string) {
    const newView = new createView(ViewName)
    return newView;
}

// @View({
//     engine:CreateView( ViewName:string )
//              .addEntity([User,Info])
//              .omit("Info.id")
//              .addOptions("User.id == Info.user_id")
//              .create()
// })
// class UserMenu{
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

export { View, CreateView }
