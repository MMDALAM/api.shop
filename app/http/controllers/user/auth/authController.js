const createError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");
const { RandomNumber } = require("../../../../utils/functions");
const {User} = require('../../../../models/user');
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      // await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      console.log(this.testMethod());
      const code = RandomNumber();
      const result = await this.saveUser(mobile,code)
      if(!result) throw createError.Unauthorized('ورود شما انجام نشد')
      return res.status(200).send({
        data:{
          statusCode:200,
          message : 'کد اعتبار سنجی برای شما ارسال شد',
          code,
          message
        }
      });
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
  async saveUser(mobile) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,

    }
    const result = await this.checkExistUser(mobile);
    if(result){
      return (await this.updateUser(mobile,{

      })
      )
    }
    return !!(await User.create({
      mobile,
      otp,
      Roles: [USER_ROLE]
    }))

  }
  async checkExistUser(mobile) {
    const user = await User.findOne({mobile})
    return !!user
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach(key =>{
      if(['',' ',0,null,undefined,'0',NaN].includes(objectData[key]))delete objectData[kay]
    })
    const updateResult = await User.updateOne({mobile},{$set : objectData})
    return !!updateResult.modifiedCount
  }
};
module.exports = new UserAuthController();