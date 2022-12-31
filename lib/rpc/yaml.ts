import { readFileSync } from 'fs';
import yaml from 'yaml'
import path from 'path';

declare interface ArcInterFace {
    name: string;
    remote: string;
    description: string;
}

declare interface ArcMethod {
    [method:string]:{
        req:string,
        res:string
    }
}

class ArcYaml {
    public content: any;
    public cxt: string
    constructor() {
        this.cxt = readFileSync(path.resolve(__dirname, "./animal.yaml"), 'utf8');
        this.content = yaml.parse(this.cxt)
        console.log(this.content);
    }
}

export { ArcYaml }