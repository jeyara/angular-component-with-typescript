System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.6",
    "angular-animate": "github:angular/bower-angular-animate@1.5.6",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.3.3",
    "typescript": "npm:typescript@1.8.10",
    "github:angular/bower-angular-animate@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
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
