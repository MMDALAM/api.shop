const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, lowercase: true },
    phone: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expires: 0,
      },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    roles: { type: [String], default: ["USER"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
