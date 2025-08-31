const express=require('express');
const router=express.Router();
const newsController=require('../controllers/newsController');
const protect=require('../middlewares/authMiddleware');
router.post('/',protect,newsController.addNews);
router.get('/',newsController.getAllNews);
router.get('/category/:category', newsController.getNewsByCategory);
router.post('/ai/generate', protect, newsController.generateAIContent);
module.exports=router;