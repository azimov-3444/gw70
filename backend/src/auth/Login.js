import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    
    
    let findUser = await User.findOne({ email });
    console.log(findUser);
    
    if (!findUser) {
      return res.status(404).json({ message: "Bunaqa email yo'q" });
    }
    let isChackPassword = await bcrypt.compare(password, findUser.password);
    if (!isChackPassword) {
      return res.status(404).json({ message: "Parolingiz xato" });
    }
    let token = await jwt.sign(
      {
        id: findUser._id,
        name: findUser.name,
        surname: findUser.surname,
        role: findUser.role,
      },
      process.env.SECRETKEY,
    );
    return res.status(200).json({ message: "succesfull", findUser, token });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};
