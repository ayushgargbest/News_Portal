const express=require('express');
const router=express.Router();
const newsController=require('../controllers/newsController');
const protect=require('../middlewares/authMiddleware');
router.post('/',protect,newsController.addNews);
router.get('/',newsController.getAllNews);
router.put('/:id/like',protect,newsController.likeNews);
router.put('./:id/comment',protect,newsController.addComment)
module.exports=router;