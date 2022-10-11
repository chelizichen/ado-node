export enum CONSTANT {
  Observer = "Observer",
  Config = "Config",
  Config_INST = "Config_Inst",
}

export enum CODE {
  CACHE = 10, // 缓存策略
  SUCCESS = 0, // 成功请求
  ERROR = -1, // 失败请求
  FIELDERROR = -2, // 缺少字段，
  TYPEERROR = -3, // 类型错误
  NOTFOUND = -4, // 拒绝请求 或 无法响应,
}

export enum MESSAGE {
  CACHE = "cache",
  SUCCESS = "success",
  ERROR = "error",
  FIELDERROR = "missing field",
  TypeError = "type error",
  NOTFOUND = "not found",
}
