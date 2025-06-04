const News=require('../models/News');
const addNews=async(req,res)=>{
    try{
        const{title,content,imageUrl}=req.body;
        const news=await News.create({
            title,
            content,
            imageUrl,
            createdBy:req.user._id,
        });
        res.status(200).json(news);
    }catch(e){
        res.status(500).json({msg:e.message});
    }
};
const getAllNews=async(req,res)=>{
    try{
        const newsList=await News.find().populate('createdBy','name email').sort({createdAt:-1});
        res.json(newsList);
    }catch(e){
        res.status(500).json({msg:e.message});
    }
};
const likeNews=async(req,res)=>{
    try{
        const newsId=req.params.id;
        const userId=req.user._id;
        const news=await News.findById(newsId);
        if(!news)
        {
            res.status(404).json({msg:"News not found"});
        }
        const alreadyLiked=news.likes.includes(userId);
        if(alreadyLiked)
        {
            news.likes=news.likes.filter((id)=>{id.toString()!==userId.toString()});
        }
        else
        {
            news.likes.push(userId);
        }
        await news.save();
        res.status(200).json(news);
    }catch(e){
        res.status(500).json({msg:e});
    }
}
const addComment=async(req,res)=>{
    try{
        const newsId=req.params.id;
        const {text}=req.body;
        const news=await News.findById(newsId);
        if(!news){
            return res.status(404).json({msg:'News Not Found'});
        }
        const comment={
            user:req.user._id,
            text,
        }
        news.comment.unshift(comment);
        await news.save();
        res.status(200).json(news.comment);
    }
    catch(e){
        res.status(500).json({msg:e.message});
    }
};
module.exports={addNews,getAllNews,likeNews,addComment};