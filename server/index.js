const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send("Landed");
})
app.listen(3000);