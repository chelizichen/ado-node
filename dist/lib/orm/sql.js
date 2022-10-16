"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.query = void 0;
class query {
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
            this.orsql += options + " = " + value;
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
//# sourceMappingURL=sql.js.map