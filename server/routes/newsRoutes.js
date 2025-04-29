const express=require('express');
const router=express.Router();
const {addNews,getAllNews, likeNews}=require('../controllers/newsController');
const protect=require('../middlewares/authMiddleware');
router.post('/',protect,addNews);
router.get('/',getAllNews);
router.put('/:id/like',protect,likeNews);
module.exports=router;