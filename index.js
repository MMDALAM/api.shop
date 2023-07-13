require("app-module-path").addPath(__dirname);

const Application = require("./app/server");

new Application(5000, "mongodb://127.0.0.1:27017/testShopNodejs");
