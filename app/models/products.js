const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    total_desc: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: mongoose.Types.ObjectId, default: [] },
    deslike: { type: mongoose.Types.ObjectId, default: [] },
    bookmark: { type: mongoose.Types.ObjectId, default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, default: 0 },
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, required: true },
    feture: {
      type: Object,
      default: {
        lenght: "",
        height: "Numbre",
        width: "",
        weight: "",
        color: [],
        model: [],
        madein: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
