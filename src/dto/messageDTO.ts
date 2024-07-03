export class messageDTO {
    status : number;
    message : string;
    processObject : Object;

    constructor(status:number, message:string, processObject:Object = {}) {
        this.message = message;
        this.status = status;
        this.processObject =processObject;
    }
}