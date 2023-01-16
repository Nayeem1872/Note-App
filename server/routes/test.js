const express =require('express')
const router = express.Router();
const dashboardController = require ('../controllers/dashboardController');



router.get('/test',(req,res)=>res.render('test'));


module.exports= router;