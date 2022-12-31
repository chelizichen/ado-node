import { readFileSync } from 'fs';
import yaml from 'yaml'
import path from 'path';
class ArcYaml{
    public content:any;
    public cxt:string
    constructor(){
        this.cxt = readFileSync(path.resolve(__dirname,"./animal.yaml"), 'utf8');
        this.content = yaml.parse(this.cxt)
        console.log(this.content);
    }
}

new ArcYaml()

export {ArcYaml}