import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find();

    }
    catch(err){
        return console.log(err);
    }
    if(!users) {
        return res.status(500).json({message:"Unexpected eror"});

    }
    return res.status(200).json({users});
};

export const signup = async(req,res,next) =>{
    const { name,email,password } = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      const newpassword = bcrypt.hashSync(password)

      let user;
      try{
        user = new User({name, email, password:newpassword});
        user = await user.save();
      }
      catch(err){
        return console.log(err);
    
      }
      if(!user) {
        return res.status(500).json({message:"Unexpected eror"});  
      }
      return res.status(201 ).json({id:user._id});

};

export const updateUser = async(req,res,next) => {
    const id = req.params.id;
    const { name,email,password } = req.body;
    if (
        !name &&
        name.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      const newpassword = bcrypt.hashSync(password)
      let user;
      try{
        user = await User.findByIdAndUpdate(id,{
            name,email,password:newpassword,
        });
      }
      catch (err){
        return console.log(err);
      }
      if(!user) {
        return res.status(500).json({message:"Unexpected eror"});  
      }
      return res.status(200 ).json({message:"upfated"});

};

export const deleteuser = async(req,res,next) => {
    let user;
    const id = req.params.id;
    try{
        user = await User.findByIdAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!user) {
        return res.status(500).json({message:"Unexpected eror"});  
      }
      return res.status(200 ).json({message:"deleted"});
}
export const login = async(req,res,next) => {
    let existinguser;
    const {email,password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid Inputs" });
      }
      try{
            existinguser = await User.findOne({email});
      }
      catch{
        return console.log(err);
      }
      if (!existinguser) {
        return res
          .status(404)
          .json({ message: "Unable to find user from this ID" });
      }
    
      const isPassword = bcrypt.compareSync(password, existinguser.password);
      if (!isPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
    
      return res
        .status(200)
        .json({ message: "Login Successfull", id: existinguser._id });
};


    
