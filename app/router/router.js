const { HomeRouter } = require("./api");

const router = require("express").Router();

router.use("/", HomeRouter);
module.exports = {
  AllRouters: router,
};
