interface ISharedService {
    checkPublicCodeWord(word: string): ng.IPromise<any>;
    setLocalStorage(key: string, value: string):void;
    getLocalStorage(key: string): string;
    removeFromLocalStorage(key: string): void;
}

class SharedService implements ISharedService {
    static $inject: Array<string> = [ "$http", "$q", "$log" ]
    
    constructor(
       private $http: ng.IHttpService,
       private $q: ng.IQService,
       private $log: ng.ILogService
    ) {
    }
    
    setLocalStorage(key: string, value: string):void
    {
        localStorage.setItem(key,value);
    }
    
    removeFromLocalStorage(key: string): void
    {
        localStorage.removeItem(key);
    }
    
    getLocalStorage(key: string): string
    {
      return  localStorage.getItem(key);
    }
    
    checkPublicCodeWord(word: string): ng.IPromise<any> {
        this.$log.info("Checking checkPublicCodeWord data...");

        return this.$http
            .post("api/v1/shared/checkpubliccodeword", JSON.stringify({ code: word }))
            .then(res => res.data)
            .catch(err => {
                this.$log.error(err);
                this.$q.reject("Unable to load checkpubliccodeword data from shared api");
            });
    }
}

export { ISharedService, SharedService }