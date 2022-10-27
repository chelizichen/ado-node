declare const CreateDataBase: (dbname: string) => (target: Object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
declare const UseDataBase: (dbName: string) => PropertyDecorator;
export { CreateDataBase, UseDataBase };
