"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.update = exports.del = exports.query = void 0;
class query {
    sql = "select";
    Enity = "";
    andsql = "";
    orsql = "";
    likesql = "";
    setEnity(Enity) {
        if (typeof Enity === "function") {
            this.Enity = Enity.name;
        }
        else {
            this.Enity = Enity;
        }
        this.sql = "select * from " + this.Enity + " ";
        return this;
    }
    setColumn(keys) {
        let columns = "";
        this.sql = "";
        keys.forEach((el, index) => {
            if (index != keys.length - 1) {
                columns += "" + el + ",";
            }
            else {
                columns += "" + el + " ";
            }
        });
        this.sql = "select " + columns + "from " + this.Enity;
        return this;
    }
    // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
    and(options, value) {
        if (value) {
            if (!this.andsql && !this.likesql) {
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
            if (!this.orsql && !this.likesql) {
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
    // select * from user where aaa like bbb
    like(key, value, andor) {
        if (!this.likesql && !this.andsql && !this.orsql) {
            this.likesql += " where ";
        }
        else {
            this.likesql = "";
            this.likesql += " " + andor + " ";
        }
        this.likesql += key + ' like "%' + value + '%" ';
        this.sql += this.likesql;
        return this;
    }
    pagination(options, value) {
        let paginationsql = " limit ";
        if (value) {
            paginationsql += options + "," + value;
        }
        if (typeof options == "object") {
            paginationsql += options.page + "," + options.size;
        }
        this.sql += paginationsql;
        return this;
    }
    getSql() {
        return this.sql;
    }
}
exports.query = query;
// `DELETE FROM ?? WHERE ?? = ?`
class del {
    sql = "select";
    Enity = "";
    andsql = "";
    orsql = "";
    setEnity(Enity) {
        if (typeof Enity === "function") {
            this.Enity = Enity.name;
        }
        else {
            this.Enity = Enity;
        }
        this.sql = "delete from " + this.Enity + " ";
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
    // sql = `Update ${Enity.name} Set ${sqlVal} WHERE ${keySqlVal}`;
    Enity;
    sql = "";
    options = {};
    orsql = "";
    andsql = "";
    setEnity(Enity) {
        if (typeof Enity === "function") {
            this.Enity = Enity.name;
        }
        else {
            this.Enity = Enity;
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
        const sql = "update  " + this.Enity + " Set ? " + this.sql;
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
    Enity = "";
    options = {};
    setEnity(Enity) {
        if (typeof Enity === "function") {
            this.Enity = Enity.name;
        }
        else {
            this.Enity = Enity;
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
        const sql = "insert into  " + this.Enity + " SET ? ";
        return {
            opt,
            sql,
        };
    }
}
exports.save = save;
//# sourceMappingURL=sql.js.map