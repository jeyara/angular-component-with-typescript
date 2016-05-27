import { IConfigData } from "./../models/configdata.model";

interface IGraphService {
    getPublicGraph(days: number, key: string, value :string): ng.IPromise<any>;
}

class GraphService implements IGraphService {
    static $inject: Array<string> = ["$http", "$q", "$log"]

    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $log: ng.ILogService
    ) {
    }

    getPublicGraph(days: number, key: string, value: string): ng.IPromise<any> {
        this.$log.info("Getting public graph data...");

        if (key !== null && key !== undefined && value !== null && value !== undefined) {
            this.$http.defaults.headers.common[key] = value;
        }

        return this.$http
            .get("api/v1/graph/getpublicgraphdata/" + days.toString())
            .then(res => res.data)
            .catch(err => {
                this.$log.error(err);
                this.$q.reject("Unable to load public graph data from getpublicgraphdata api");
            });
    }
}

export { IGraphService, GraphService }