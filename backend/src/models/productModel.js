import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 1000,
    },
    img_url: {
      type: String,
      require: true,
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
  },
  { timestamps: true },
);

let Product = mongoose.model("category", categorySchema);

export default Product;
