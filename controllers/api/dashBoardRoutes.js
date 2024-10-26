const router = require('express').Router();
const { User, Blog } = require('../../modals');
// The `/api/dashBoard` endpoint

// This is for getting all of the user blogs who is logged in.
router.get('/', async (req, res) => {
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
    res.render('partials/dashboard', {logged_in: true, blogs:blogs});
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const newBlog = await Blog.create({
      name,
      description,
      user_id: userId,
    });
    res.render('partials/dashboard', {logged_in: true});
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
