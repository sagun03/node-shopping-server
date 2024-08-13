export class messageDTO {
  status: number;
  message: string;
  processObject: object;

  constructor(status: number, message: string, processObject: object = {}) {
    this.message = message;
    this.status = status;
    this.processObject = processObject;
  }
}
