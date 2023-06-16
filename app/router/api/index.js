const homeController = require("../../http/controllers/api/homeController");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      name: IndexPage
 *      description: index page router and data
 */

/**
 * @swagger
 * /:
 *    get:
 *      summary: index of routers
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      responses:
 *          200:
 *            description: success
 *          404:
 *            description: not found
 */

router.get("/", homeController.indexPage);
module.exports = {
  HomeRouter: router,
};
