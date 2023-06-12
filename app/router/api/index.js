const homeController = require("../../http/controllers/api/homeController");

const router = require("express").Router();

router.post("/", homeController.indexPage);
module.exports = {
  HomeRouter: router,
};
