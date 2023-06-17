const autoBind = require("auto-bind-inheritance");

module.exports = class controller {
  constructor() {
    autoBind(this);
  }
};
