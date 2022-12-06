class query {
  public sql: string = "";
  public Enity: string = "";
  public and_sql = "";
  public or_sql = "";
  public likeand_sql = "";
  public likeor_sql = "";
  public pagination_sql = "";
  public column_sql = ""
  // 设置 实体类
  setEnity(Enity: string[] | string) {
    if (Enity instanceof Array) {
      this.Enity = Enity.join(",");
    } else {
      this.Enity = Enity;
    }
    return this;
  }

  // 设置得到的字段
  setColumn<T extends string[]>(keys: T): query {
    let columns = "";
    this.sql = "";
    columns = keys.join(",");
    this.column_sql = columns;
    this.column_sql = this.column_sql + " from "
    return this;
  }
  // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
  and<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      this.and_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" and ").replaceAll(",", " = ");
      this.and_sql = sql;
    }
    return this;
  }

  // 只允许用连续的 or(key,value) 或者一次 and(options:Record<string,any>)
  or<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      this.or_sql = options + " = " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " = ");
      this.or_sql = sql;
    }
    return this;
  }

  // select * from user where aaa like bbb
  like_or<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      this.likeor_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " like ");
      this.likeor_sql = sql;
    }
    return this;
  }

  like_and<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      this.likeand_sql = options + " like " + value;
    } else {
      const option = Object.entries(options);
      const sql = option.join(" or ").replaceAll(",", " like ");
      this.likeand_sql = sql;
    }
    return this;
  }

  pagination(page: number, size: number): query {
    this.pagination_sql += page + "," + size;

    this.pagination_sql = " limit " + this.pagination_sql;
    return this;
  }

  getSql() {
    let andor = "";
    let like_andor = "";
    if (this.and_sql || this.or_sql) {
      andor = this.and_sql ? this.and_sql : this.or_sql
      andor = " where " + andor
      if (this.and_sql && this.or_sql) {
        andor = " where " + this.and_sql + " or " + this.or_sql + " ";
      }
    }

    if (this.likeand_sql || this.likeor_sql) {
        like_andor = this.likeand_sql ? this.likeand_sql : this.likeor_sql;
        if (this.likeand_sql && this.likeor_sql) {
          like_andor =  this.likeand_sql + " or " + this.likeor_sql + " ";
        }
      if (!andor) {
        like_andor = " where " + like_andor
      }
    }

    if (!this.column_sql) {
      this.column_sql = " * from "
    }

    this.sql = "select" +
      this.column_sql +
      this.Enity +
      andor +
      like_andor +
      this.pagination_sql;

    return this.sql;
  }
}

// `DELETE FROM ?? WHERE ?? = ?`
class del {
  public sql: string = "select";
  private Enity: string = "";
  private andsql = "";
  private orsql = "";

  setEnity(Enity: Function | string) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    this.sql = "delete from " + this.Enity + " ";
    return this;
  }
  // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
  and<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      if (!this.andsql) {
        this.andsql += " where ";
      } else {
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
  or<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      if (!this.orsql) {
        this.orsql += " where ";
      } else {
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

class update {
  // sql = `Update ${Enity.name} Set ${sqlVal} WHERE ${keySqlVal}`;
  public Enity!: string;
  public sql: string = "";
  public options: Record<string, string> = {};
  public orsql: string = "";
  public andsql: string = "";
  setEnity(Enity: Function | string) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    return this;
  }

  public setOptions<T extends Record<string, string> | string>(
    options: T,
    value?: T extends string ? string : any
  ) {
    if (value && typeof options == "string") {
      console.log(this.options);

      this.options[options] = value;
    } else {
      const entries = Object.keys(options);

      entries.forEach((el) => {
        this.setOptions(el, (options as Record<string, string>)[el]);
      });
    }
    return this;
  }

  or<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.orsql += " where ";
      } else {
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
  and<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      if (!this.andsql && !this.orsql) {
        this.andsql += " where ";
      } else {
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
// insert into ??  SET ?
class save {
  public sql = "";
  public Enity = "";
  public options: Record<string, string> = {};
  public setEnity<T extends string | Function>(Enity: T) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    return this;
  }

  // public setOptions<T extends Record<string, string> | string>(
  //   options: T,
  //   value?: T extends string ? string : any
  // );
  setOptions<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? string : undefined
  ): this {
    if (value && typeof options == "string") {
      console.log(this.options);

      this.options[options] = value;
    } else {
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
export { query, del, update, save };
