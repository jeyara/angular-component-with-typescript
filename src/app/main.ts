
import * as ng from "angular";

import "./app.module";

import { HomeComponent } from "./components/home/home.component";
import { SharedService } from "./services/shared.service";
import { GraphService } from "./services/graph.service";

    ng.module("dashApp")
        .component("isDashboard", HomeComponent)
        .service("sharedService", SharedService)
        .service("graphService", GraphService);

