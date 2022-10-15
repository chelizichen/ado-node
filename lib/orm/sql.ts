export class query {
  public sql: string = "select";
  public Enity: string = "";
  public andsql = "";
  public orsql = "";

  setEnity(Enity: Function) {
    this.Enity = Enity.name;
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
      this.orsql += options + " = " + value;
      this.sql += this.orsql;
    }
    if (typeof options == "object") {
      const entries = Object.keys(options);
      entries.forEach((el) => {
        this.and(el, options[el]);
      });
    }
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
  getMany() {
    return this.sql;
  }
}
