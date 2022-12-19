declare function Query(): ParameterDecorator;
declare function Body(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Headers(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Req(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Res(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Params(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export { Query, Body, Headers, Req, Res, Params };
