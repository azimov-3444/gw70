import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: 3,
    },
    surname: {
      type: String,
      required: true,
      minlenght: 3,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 8,
      maxlenght: 50,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true },
);

let User = mongoose.model("user", userSchema);

export default User;
