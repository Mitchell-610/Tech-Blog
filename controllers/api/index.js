const router = require('express').Router();
const dashBoardRoutes = require('./dashBoardRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/dashBoard', dashBoardRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;
