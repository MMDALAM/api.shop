const createError = require("http-errors");
const { authSchema } = require("../../validators/user/auth.schema");
const controller = require("app/http/controllers/controller");

module.exports = new (class homeController extends controller {
  async indexPage(req, res, next) {
    try {
      console.log(this.testMethod());

      await authSchema.validateAsync(req.body);
      return res.status(200).send("index page store");
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
})();
