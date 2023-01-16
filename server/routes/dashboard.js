const express =require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/session')
const dashboardController = require ('../controllers/dashboardController');



router.get('/dashboard',ensureAuthenticated,dashboardController.dashboard);


module.exports= router;