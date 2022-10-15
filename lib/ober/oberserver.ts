class OberServer {
  public store: { key: string; value: any }[] = [];
  public set(key: string, value: any) {
    this.store.push({ key, value });
  }
  public get(key: string) {
    const val = this.store.find((el) => {
      return el.key === key;
    });
    return val;
  }
}

export { OberServer };
