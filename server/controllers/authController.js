const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT,{expiresIn:'3d'});
}
const registerUser=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const userExist=await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({msg:'User already exists'});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });
        const token=generateToken(newUser._id);
        res.status(200).json({user:newUser,token});
    } catch(e){
        res.status(500).json({msg:e});
    }
};
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({msg:'Email galat h'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const token = generateToken(user._id);
        res.json({ user, token });
    } catch(e){
        res.status(500).json({ msg: e.message });
    }
};
module.exports={registerUser,loginUser};