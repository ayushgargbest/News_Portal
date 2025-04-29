const mongoose=require("mongoose");
const connctDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DBURI);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    }
    catch(e){
        console.error(e);
    }
}
module.exports=connctDB;