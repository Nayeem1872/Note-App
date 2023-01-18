const express =require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/session')
const dashboardController = require ('../controllers/dashboardController');



router.get('/dashboard',ensureAuthenticated,dashboardController.dashboard);


router.get('/dashboard/item/:id',ensureAuthenticated,dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id',ensureAuthenticated,dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id',ensureAuthenticated,dashboardController.dashboardDeleteNote);

router.get('/dashboard/add',ensureAuthenticated,dashboardController.dashboardAddNote);
router.post('/dashboard/add',ensureAuthenticated,dashboardController.dashboardAddNoteSubmit);
router.get('/dashboard/search',ensureAuthenticated,dashboardController.dashboardSearch);
router.post('/dashboard/search',ensureAuthenticated,dashboardController.dashboardSearchSubmit);

module.exports= router;