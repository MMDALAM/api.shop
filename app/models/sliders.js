const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = Schema(
  {
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    type: { type: String, default: "main" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
