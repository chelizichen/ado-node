declare type usePipe = (req: any) => void;
declare const Pipe: <T extends usePipe | usePipe[]>(fn: T) => MethodDecorator;
export { Pipe };
