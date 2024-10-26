const router = require('express').Router();
const { User, Blog } = require('../modals');
const withAuth = require('../utils/auth'); // Adjust path as needed


// GET all dashboards
router.get('/', async (req, res) => {
    try {
      const posts = await Blog.findAll({
        include: {
          model: Blog,
          attributes: ['id', 'title', 'description', 'date_created', 'user_id'], // Adjust attributes as necessary
        },
      });
      console.log(posts);
      res.render('home', {logged_in: req.session.logged_in, posts:posts});
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });
  

  router.get('/dashboard', async (req, res) => {
    try {
      const userId = req.session.user_id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const blogs = await Blog.findAll({
        include: {
          model: Blog,
          where: { user_id: userId }, // Filter blogs by user ID
          attributes: ['id', 'title', 'description', 'date_created'], // Adjust attributes as necessary
        },
      });
      console.log('Hey');
      res.render('dashboard', {logged_in: true, blogs:blogs});
      //res.redirect('/) is something that will be used to add/'load' info 
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // router.get('/login', async (req, res) => {
  //   try {
  //     console.log('Hey');
  //     res.render('login');
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

  module.exports = router;
