const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const controller = require("../../controller");
const { RandomNumber } = require("../../../../utils/functions");

module.exports = new (class UserAuthController extends controller {
  async login(req, res, next) {
    try {
      //   await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumber();
      return res.status(200).send("ورود شما موفقیت انجام شد");
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
})();
