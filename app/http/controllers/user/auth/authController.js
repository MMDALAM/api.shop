const createError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("app/http/validators/user/auth.schema");
const { RandomNumber } = require("app/utils/functions");
const User = require("app/models/user");
const { EXPIRES_IN, USER_ROLE } = require("app/utils/constans");
const controller = require("app/http/controllers/controller");
const { signAccessToken } = require("../../../../utils/functions");

class UserAuthController extends controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
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
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await User.findOne({ mobile });
      if (!user) throw createError.NotFound(" کاربر یافت نشد ");
      if (user.otp.code != code)
        throw createError.Unauthorized("کد ارسال شده صحیح  نمیباشد");
      const now = new Date().getTime();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await signAccessToken(user._id);
      return res.json({
        data: {
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async refreshToken(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async saveUser(mobile, code) {
    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: now + 120000,
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
