import { appConfig } from "./../../app.value";
import { Message } from "./../../models/message.model";
import { Alert } from "./../../models/alert.model";
import { displaytype } from "./../../models/displaytype.model";
import { ISharedService } from "./../../services/shared.service";
import { IGraphService } from "./../../services/graph.service";
import { IConfigData } from "./../../models/configdata.model";
import { IPublicGraph } from "./../../models/publicgraph.model";
import "/app/lib/js/ui-bootstrap-tpls-1.3.2";

//declare var nv;
class HomeComponentController {

    static $inject: Array<string> = ["$log", "$rootScope", "sharedService", "graphService", "appConfig"];
    constructor(
        private $log: ng.ILogService,
        private $rootScope: ng.IRootScopeService,
        private sharedService: ISharedService,
        private graphService: IGraphService,
        private appConfig: any
   ) {
    }
    
    $onInit() {

      this.$log.info("In component initialization lifecycle hook...");
    }    
    
    showProgress(): void
    {
        let msg = new Message(appConfig.componentNames.uxComponent, appConfig.componentNames.homeComponent, true);
        this.$rootScope.$broadcast(appConfig.eventNames.progressStatusEvent, msg);
    }
    
    hideProgress(): void
    {
        let msg = new Message(appConfig.componentNames.uxComponent, appConfig.componentNames.homeComponent, false);
        this.$rootScope.$broadcast(appConfig.eventNames.progressStatusEvent, msg);
    }
    
    showWarning(index): void
    {
            let alert = new Alert("This is a warning message !!", displaytype.warning);
            let msg = new Message(appConfig.componentNames.uxComponent, appConfig.componentNames.homeComponent, alert);
            this.$rootScope.$broadcast(appConfig.eventNames.displayUserMessageEvent, msg);
    }
    
    showSuccess(index): void
    {
             let alert = new Alert("This is a success message !!", displaytype.success);
            let msg = new Message(appConfig.componentNames.uxComponent, appConfig.componentNames.homeComponent, alert);
            this.$rootScope.$broadcast(appConfig.eventNames.displayUserMessageEvent, msg);
    }
    
    showDanger(index): void
    {
            let alert = new Alert("This is a error message !!!", displaytype.danger);
           let msg = new Message(appConfig.componentNames.uxComponent, appConfig.componentNames.homeComponent, alert);
            this.$rootScope.$broadcast(appConfig.eventNames.displayUserMessageEvent, msg);
    }
}

let HomeComponent = {
    controller: HomeComponentController,
    templateUrl: 'app/components/home/home.component.html'
};

export { HomeComponent }
