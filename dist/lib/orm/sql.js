"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.update = exports.del = exports.query = void 0;
/**
 * @author chelizichen
 * @description 增删改查 提供 链式API
 */
class query {
    sql = "";
    Entity = "";
    and_sql = "";
    or_sql = "";
    likeand_sql = "";
    likeor_sql = "";
    pagination_sql = "";
    column_sql = "";
    // 设置 实体类
    setEntity(Entity) {
        if (Entity instanceof Array) {
            this.Entity = Entity.join(",");
        }
        else {
            this.Entity = Entity;
        }
        return this;
    }
    // 设置得到的字段
    setColumn(keys) {
        let columns = "";
        this.sql = "";
        columns = keys.join(",");
        this.column_sql = columns;
        this.column_sql = this.column_sql + " from ";
        return this;
    }
    // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
    and(options, value) {
        if (value) {
            this.and_sql = options + " = " + value;
        }
        else {
            const option = Object.entries(options);
            const sql = option.join(" and ").replaceAll(",", " = ");
            this.and_sql = sql;
        }
        return this;
    }
    // 只允许用连续的 or(key,value) 或者一次 and(options:Record<string,any>)
    or(options, value) {
        if (value) {
            this.or_sql = options + " = " + value;
        }
        else {
            const option = Object.entries(options);
            const sql = option.join(" or ").replaceAll(",", " = ");
            this.or_sql = sql;
        }
        return this;
    }
    // select * from user where aaa like bbb
    like_or(options, value) {
        if (value) {
            this.likeor_sql = options + " like " + value;
        }
        else {
            const option = Object.entries(options);
            const sql = option.join(" or ").replaceAll(",", " like ");
            this.likeor_sql = sql;
        }
        return this;
    }
    like_and(options, value) {
        if (value) {
            this.likeand_sql = options + " like " + value;
        }
        else {
            const option = Object.entries(options);
            const sql = option.join(" or ").replaceAll(",", " like ");
            this.likeand_sql = sql;
        }
        return this;
    }
    pagination(page, size) {
        this.pagination_sql += page + "," + size;
        this.pagination_sql = " limit " + this.pagination_sql;
        return this;
    }
    getSql() {
        let andor = "";
        let like_andor = "";
        if (this.and_sql || this.or_sql) {
            andor = this.and_sql ? this.and_sql : this.or_sql;
            andor = " where " + andor;
            if (this.and_sql && this.or_sql) {
                andor = " where " + this.and_sql + " or " + this.or_sql + " ";
            }
        }
        if (this.likeand_sql || this.likeor_sql) {
            like_andor = this.likeand_sql ? this.likeand_sql : this.likeor_sql;
            if (this.likeand_sql && this.likeor_sql) {
                like_andor = this.likeand_sql + " or " + this.likeor_sql + " ";
            }
            if (!andor) {
                like_andor = " where " + like_andor;
            }
        }
        if (!this.column_sql) {
            this.column_sql = " * from ";
        }
        this.sql = "select" +
            this.column_sql +
            this.Entity +
            andor +
            like_andor +
            this.pagination_sql;
        return this.sql;
    }
}
exports.query = query;
// `DELETE FROM ?? WHERE ?? = ?`
class del {
    sql = "select";
    Entity = "";
    andsql = "";
    orsql = "";
    setEntity(Entity) {
        if (typeof Entity === "function") {
            this.Entity = Entity.name;
        }
        else {
            this.Entity = Entity;
        }
        this.sql = "delete from " + this.Entity + " ";
        return this;
    }
    // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
    and(options, value) {
        if (value) {
            if (!this.andsql) {
                this.andsql += " where ";
            }
            else {
                this.andsql = "";
                this.andsql += " and ";
            }
            this.andsql += options + ' = "' + value + '"';
            this.sql += this.andsql;
        }
        if (typeof options == "object") {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                this.and(el, options[el]);
            });
        }
        return this;
    }
    // 只允许用连续的 or(key,value) 或者一次 and(options:Record<string,any>)
    or(options, value) {
        if (value) {
            if (!this.orsql) {
                this.orsql += " where ";
            }
            else {
                this.orsql = "";
                this.orsql += " or ";
            }
            this.orsql += options + ' = "' + value + '"';
            this.sql += this.orsql;
        }
        if (typeof options == "object") {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                this.or(el, options[el]);
            });
        }
        return this;
    }
    getSql() {
        return this.sql;
    }
}
exports.del = del;
class update {
    // sql = `Update ${Entity.name} Set ${sqlVal} WHERE ${keySqlVal}`;
    Entity;
    sql = "";
    options = {};
    orsql = "";
    andsql = "";
    setEntity(Entity) {
        if (typeof Entity === "function") {
            this.Entity = Entity.name;
        }
        else {
            this.Entity = Entity;
        }
        return this;
    }
    setOptions(options, value) {
        if (value && typeof options == "string") {
            console.log(this.options);
            this.options[options] = value;
        }
        else {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                this.setOptions(el, options[el]);
            });
        }
        return this;
    }
    or(options, value) {
        if (value) {
            if (!this.andsql && !this.orsql) {
                this.orsql += " where ";
            }
            else {
                this.orsql = " ";
                this.orsql += " or ";
            }
            this.orsql += options + ' = "' + value + '"';
            this.sql += this.orsql;
            return this;
        }
        if (typeof options == "object") {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                this.or(el, options[el]);
            });
        }
        return this;
    }
    and(options, value) {
        if (value) {
            if (!this.andsql && !this.orsql) {
                this.andsql += " where ";
            }
            else {
                this.andsql = " ";
                this.andsql += " and ";
            }
            this.andsql += options + ' = "' + value + '"';
            this.sql += this.andsql;
            return this;
        }
        if (typeof options == "object") {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                this.and(el, options[el]);
            });
        }
        return this;
    }
    getSql() {
        const opt = [this.options];
        console.log("this.sql", this.sql);
        const sql = "update  " + this.Entity + " Set ? " + this.sql;
        return {
            opt,
            sql,
        };
    }
}
exports.update = update;
// insert into ??  SET ?
class save {
    sql = "";
    Entity = "";
    options = {};
    setEntity(Entity) {
        if (typeof Entity === "function") {
            this.Entity = Entity.name;
        }
        else {
            this.Entity = Entity;
        }
        return this;
    }
    // public setOptions<T extends Record<string, string> | string>(
    //   options: T,
    //   value?: T extends string ? string : any
    // );
    setOptions(options, value) {
        if (value && typeof options == "string") {
            console.log(this.options);
            this.options[options] = value;
        }
        else {
            const entries = Object.keys(options);
            entries.forEach((el) => {
                // @ts-ignore
                this.setOptions(el, options[el]);
            });
        }
        return this;
    }
    getSql() {
        const opt = [this.options];
        console.log("this.sql", this.sql);
        const sql = "insert into  " + this.Entity + " SET ? ";
        return {
            opt,
            sql,
        };
    }
}
exports.save = save;
//# sourceMappingURL=sql.js.map