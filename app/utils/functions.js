const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("app/models/user");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constans");

function RandomNumber() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const secret = "";
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}
// function signRefreshToken(userId) {
//   return new Promise(async (resolve, reject) => {
//     const user = await User.findById(userId);
//     const payload = {
//       mobile: user.mobile,
//       userID: user._id,
//     };
//     const secret = "";
//     const options = {
//       expiresIn: "1y",
//     };
//     JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
//       if (err) reject(createError.InternalServerError("خطای سروری"));
//       resolve(token);
//     });
//   });
// }

module.exports = {
  RandomNumber,
  signAccessToken,
  // signRefreshToken,
};
