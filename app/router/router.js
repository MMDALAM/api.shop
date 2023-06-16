const router = require("express").Router();

const { HomeRouter } = require("./api");
router.use("/", HomeRouter);

const { UserAuthRouters } = require("./user/auth");
router.use("/user", UserAuthRouters);

module.exports = {
  AllRouters: router,
};
