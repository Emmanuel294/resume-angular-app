import { project } from "./project";

export class resume{
    constructor(
        public id:number,
        public projects:Array<project>
    ){
    }
}