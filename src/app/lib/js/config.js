System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "wwwroot/js/bundle.js": [
      "App/main.js",
      "App/services/graph.service.js",
      "App/services/shared.service.js",
      "App/components/home/home.component.js",
      "wwwroot/js/bootstrap.js",
      "App/app.module.js",
      "github:angular/bower-angular@1.5.5.js",
      "github:angular/bower-angular@1.5.5/angular.js"
    ],
    "wwwroot/js/bundle.min.js": [
      "App/main.js",
      "App/services/graph.service.js",
      "App/services/shared.service.js",
      "App/components/home/home.component.js",
      "wwwroot/js/bootstrap.js",
      "App/app.module.js",
      "github:angular/bower-angular@1.5.5.js",
      "github:angular/bower-angular@1.5.5/angular.js"
    ]
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.5",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.3.2",
    "angular-ui-router": "github:angular-ui/angular-ui-router-bower@0.2.18",
    "typescript": "npm:typescript@1.8.10",
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
