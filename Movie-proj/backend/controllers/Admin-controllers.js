import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const addAdmin = async(req,res,next) =>{
    const{email,password} = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      let existingAdmin
      try{
        existingAdmin = await Admin.findOne({email});
      }
      catch(err){
        return console.log(err);

      }
      if(existingAdmin){
        return res.status(422).json({message:"Invalid admin already exists"});
      }
      let admin;
      const hashedPassword = bcrypt.hashSync(password);
      try{
        admin = new Admin({email,password:hashedPassword});
        admin = await admin.save();
      }
      catch(err){
        return console.log(err);
      }
      if(!admin){
        return res.status(500).json({message:"ubnable to store"});

      }
      return res.status(201).json({admin});
}



export const loginAdmin = async(req,res,next) =>{
  const{email,password} = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid login Inputs" });
  }
  let existingAdmin
  try{
    existingAdmin = await Admin.findOne({email});
  }
  catch(err){
    return console.log(err);

  }
  if(!existingAdmin){
    return res.status(422).json({message:"Invalid admin doesnot exists"});
  }
  const check = await bcrypt.compare(password, existingAdmin.password);
  if(!check){
    return res.status(422).json({message:"WRONF PASSWORD"});
  }
  const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
    expiresIn:"7d",
  }
  );

  return res.status(201).json({message:"login sucessful",token,id:existingAdmin._id});

};

export const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};
