declare function Query(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Body(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Headers(): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export { Query, Body, Headers };
