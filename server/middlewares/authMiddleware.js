const jwt=require('jsonwebtoken');
const User=require('../models/User');
const protect=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ msg:'Unauthorized'});
        }
        const token=authHeader.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT);
        req.user=await User.findById(decoded.id).select('-password');
        next();
    }catch(e){
        res.status(401).json({msg:"Token Failed"});
    }
};
module.exports=protect;