const createError = require("http-errors");
const { authSchema } = require("app/http/validators/user/auth.schema");
const { RandomNumber } = require("app/utils/functions");
const User = require("app/models/user");
const { EXPIRES_IN, USER_ROLE } = require("app/utils/constans");
const controller = require("app/http/controllers/controller");

class UserAuthController extends controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumber();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتباری سنجی برای شما ارسال شد",
          code,
          mobile,
        },
      });
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await User.create({
      mobile,
      otp,
      Roles: [USER_ROLE],
    }));
  }
  async checkExistUser(mobile) {
    const user = await User.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResule = await User.updateOne({ mobile }, { $set: objectData });
    return !!updateResule.modifiedCount;
  }
}
module.exports = new UserAuthController();
