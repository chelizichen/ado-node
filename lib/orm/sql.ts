class query {
  public sql: string = "select";
  public Enity: string = "";
  public andsql = "";
  public orsql = "";
  public likesql = "";
  setEnity(Enity: Function | string) {
    if (typeof Enity === "function") {
      this.Enity = Enity.name;
    } else {
      this.Enity = Enity;
    }
    this.sql = "select * from " + this.Enity + " ";
    return this;
  }
  setColumn<T extends string[]>(keys: T): query {
    let columns = "";
    this.sql = "";
    keys.forEach((el, index) => {
      if (index != keys.length - 1) {
        columns += "" + el + ",";
      } else {
        columns += "" + el + " ";
      }
    });
    this.sql = "select " + columns + "from " + this.Enity;
    return this;
  }
  // 只允许用连续的 and(key,value) 或者一次 and(options:Record<string,any>)
  and<T extends string | Record<string, string>>(
    options: T,
    value?: T extends string ? T : any
  ) {
    if (value) {
      if (!this.andsql && !this.likesql) {
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
      if (!this.orsql && !this.likesql) {
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

  // select * from user where aaa like bbb
  like(key: string, value: string, andor: "and" | "or") {
    if (!this.likesql && !this.andsql && !this.orsql) {
      this.likesql += " where ";
    } else {
      this.likesql = "";
      this.likesql += " " + andor + " ";
    }
    this.likesql += key + ' like "%' + value + '%" ';
    this.sql += this.likesql;
    return this;
  }
  pagination<
    T extends
      | {
          page: number;
          size: number;
        }
      | number
  >(options: T, value: T extends number ? number : any): query {
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
    // this.sql = "update from " + this.Enity + " ";
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
    const sql = "update from " + this.Enity + " Set ?? " + this.sql;
    return {
      opt,
      sql,
    };
  }
}

class save {}
export { query, del, update, save };
