const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const connctDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes= require('./routes/newsRoutes');
dotenv.config();
app.use(cors());
app.use(express.json());
connctDB();
app.get("/",(req,res)=>{
    res.send("API is running");
})
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})