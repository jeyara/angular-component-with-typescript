import { displaytype } from "./../models/displaytype.model"

export class Alert {
    type: string;
    msg: string;

    constructor(message: string, dType: displaytype) {
        this.msg = message;
        switch (dType)
        {
            case 0:
                this.type = "default";
                break;
            case 1:
                this.type = "primary";
                break;
            case 2:
                this.type = "success";
                break;
            case 3:
                this.type = "info";
                break;
            case 4:
                this.type = "warning";
                break;
            case 5:
                this.type = "danger";
                break;
        }
    }
}

