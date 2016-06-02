
import * as ng from "angular";

import "./app.module";

//import './templates/templates';cls

import { HomeComponent } from "./components/home/home.component";
import { UxComponent } from "./components/ux/ux.component";
import { SharedService } from "./services/shared.service";
import { GraphService } from "./services/graph.service";
import { appConfig } from "./app.value";

ng.module("dashApp")
    .component("isDashboard", HomeComponent)
    .component("uxDisplay", UxComponent)
    .service("sharedService", SharedService)
    .service("graphService", GraphService)
    .constant("appConfig", appConfig);

//let appRootEl = document.querySelector("#appContainer") || document.body;
//ng.bootstrap(appRootEl, [ "dashApp" ]);
