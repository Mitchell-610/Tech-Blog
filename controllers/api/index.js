const router = require('express').Router();
const dashBoardRoutes = require('./dashBoardRoutes');
const userRoutes = require('./userRoutes');
// const withAuth = require('../../utils/auth');


router.use('/dashBoard', dashBoardRoutes);
router.use('/user', userRoutes);

module.exports = router;
