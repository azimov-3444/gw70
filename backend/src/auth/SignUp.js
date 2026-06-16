import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const SignUp = async (req, res) => {
  try {
    let { name, surname, email, password, role } = req.body;
    
  
    
    let findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(404).json({ message: "Bunaqa email bor" });
    }

    
    let hasspasword = await bcrypt.hash(password, 18);
    
    console.log(hasspasword);
    let isRole = role ? "admin" : "user";

    let newUser = await User.create({
      name,
      surname,
      email,
      password: hasspasword,
      role: isRole,
    });

    await newUser.save();

    console.log(newUser);

    let token = await jwt.sign(
      { id: newUser._id, name, surname, role: newUser.role },
      process.env.SECRETKEY,
    );
    
    return res.status(201).json({message:"Succesful",token })
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ message: "Failed server" });
  }
};
