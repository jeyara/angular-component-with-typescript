import { appConfig } from "./../app.value"

export class Message
{
    toComponent: string;
    fromComponent: string;
    message: any;

    constructor(to:string, from:string, msg:any)
    {
        this.toComponent = to;
        this.fromComponent = from;
        this.message = msg;
    }

    isValidMessage(toComponentName: string) : any
    {
        return ((this.toComponent == toComponentName || this.toComponent == appConfig.componentNames.all) && this.message !== null && this.message !== undefined) 
    }
}