const autoBind = require("auto-bind");

module.exports = class controller {
  constructord() {
    autoBind(this);
  }
};