import { tool } from "./tool";

export class project{
    constructor(
        public id:number,
        public IdUser:number,
        public name:string,
        public description:string,
        public company:string,
        public endDate:Date,
        public startedDate:Date,
        public currentlyWorking:boolean,
        public tools:Array<tool>
    ){
    }
}