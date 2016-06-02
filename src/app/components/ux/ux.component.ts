
import { appConfig } from "./../../app.value"
import { Alert } from "./../../models/alert.model" 
import { displaytype } from "./../../models/displaytype.model"
import { Message } from "./../../models/message.model"

class UxComponentController
{
    showProgressBar: boolean;
    alerts: Array<Alert>;

    static $inject: Array<string> = ["$log", "$scope","appConfig"];
    constructor(
        private $log: ng.ILogService,
        private $scope: ng.IScope,
        private appConfig : any
    )
    {    }

    $onInit()
    {
        let self = this
        this.alerts = new Array<Alert>();
        
        this.showProgressBar = false;

        function onDisplayUserMessageEvent(event, data : Message): void
            {
                if(data.isValidMessage(appConfig.componentNames.uxComponent)) {
                    let payload = <Alert>data.message;
                    self.alerts.push(payload);
                }
            }

        function onProgressStatusEvent(event, data: Message): void
            {
                if(data.isValidMessage(appConfig.componentNames.uxComponent)) {
                    self.showProgressBar = data.message;
                }
            }


        this.$scope.$on(appConfig.eventNames.displayUserMessageEvent, onDisplayUserMessageEvent);
        this.$scope.$on(appConfig.eventNames.progressStatusEvent, onProgressStatusEvent);
    }

    
    closeAlert(index): void
    {
        this.alerts.splice(index, 1);
    }
}

let UxComponent = {
    controller: UxComponentController,
    templateUrl: 'app/components/ux/ux.component.html'
}

export { UxComponent }