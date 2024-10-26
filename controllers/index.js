const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const withAuth = require('../utils/auth');


router.use('/',  homeRoutes);
router.use('/api',  apiRoutes);

module.exports = router;
