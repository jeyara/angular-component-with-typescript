import { ISharedService } from "./../../services/shared.service";
import { IGraphService } from "./../../services/graph.service";
import { IConfigData } from "./../../models/configdata.model";
import { IPublicGraph } from "./../../models/publicgraph.model";
import "wwwroot/js/bootstrap";

//declare var nv;
class HomeComponentController {
    message: string;
    codeWord: string;
    askCode: boolean;
    options: any;
    daysToLoad: number;
    data: IPublicGraph[];
    xAxisData: string[];
    activePromise: ng.IPromise<any>;

    static $inject: Array<string> = ["$log", "sharedService", "graphService" ];
    constructor(
        private $log: ng.ILogService,
        private sharedService: ISharedService,
        private graphService: IGraphService
    ) {
    }
    
    $onInit() {
        this.daysToLoad = 30;
        this.$log.info("In component initialization lifecycle hook...");
        this.askCode = true;
        this.xAxisData = [];
        this.loadConfig();
    }

    loadGraph(): void {

        var key = this.sharedService.getLocalStorage("x-key");
        var value = this.sharedService.getLocalStorage("x-value");

        this.activePromise = this.graphService
            .getPublicGraph(this.daysToLoad, key, value)
            .then((data: IPublicGraph[]) => {
                this.data = data;
                this.data.forEach(t => {
                    t.values.forEach(v => {
                        v[0] = v[0];
                        v[1] = Number[1];
                        this.xAxisData.push(v[0]);
                    })
                });
            })
            .catch(err => {
                alert(err);
            });
    }

    loadConfig(): void {
        let self = this;

        var check = this.sharedService.getLocalStorage("x-auth");
        if (check == "true")
        {
            self.askCode = false;
            this.loadGraph();
        }
    }

    checkIfEnterKeyWasPressed($event): void {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            this.checkCodeWord();
            event.preventDefault();
        }
    }

    checkCodeWord(): void {

        this.activePromise = this.sharedService
            .checkPublicCodeWord(this.codeWord)
            .then((data: IConfigData) => {
                if (data.APIKeyValue !== null && data.APIKeyValue.length > 0) {
                    this.askCode = false;
                    this.sharedService.setLocalStorage("x-auth", "true");
                    this.sharedService.setLocalStorage("x-key", data.APIKeyName);
                    this.sharedService.setLocalStorage("x-value", data.APIKeyValue);
                    this.loadGraph();
                }
                else {
                    this.message = "Magic Sentence is incorrect !!!"
                }
            })
            .catch(err => {
                //alert(err);
            });
    }
}

let HomeComponent = {
    controller: HomeComponentController,
    templateUrl: 'app/components/home/home.component.html'
};

export { HomeComponent }
