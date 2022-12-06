declare enum CONSTANT {
    Observer = "Observer",
    Config = "Config",
    Config_INST = "Config_Inst"
}
declare enum CODE {
    CACHE = 10,
    SUCCESS = 0,
    ERROR = -1,
    FIELDERROR = -2,
    TYPEERROR = -3,
    NOTFOUND = -4,
    SERVERERROR = -5
}
declare enum MESSAGE {
    CACHE = "cache",
    SUCCESS = "success",
    ERROR = "error",
    FIELDERROR = "missing field",
    TypeError = "type error",
    NOTFOUND = "not found",
    SERVERERROR = "server error"
}
export { MESSAGE, CONSTANT, CODE };
