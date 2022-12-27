import { AdoOrmBaseView } from "./orm";
import { FilterFields, IsEqual, ViewOptions, sql } from './symbol';
declare const View: (options: ViewOptions) => (target: typeof AdoOrmBaseView) => void;
declare class createView {
    ViewName: string;
    selectOptions: string;
    ViewFields: string[];
    OmitFields: string[];
    Entitys: string[];
    constructor(ViewName: string);
    [FilterFields](): string;
    /**
     * @description 不区分大小写判断是否相等
     */
    [IsEqual](name1: string, name2: string): boolean;
    omit<T extends string | string[]>(options: T): this;
    create(): ViewOptions["engine"];
    addEntity(Entitys: Array<new (...args: any[]) => void>): this;
    addOptions(options: sql): this;
}
declare function CreateView(ViewName: string): createView;
export { View, CreateView };
