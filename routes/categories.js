const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const auth = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
  const { user_id } = req;
  try {
    const category = new Category({ ...req.body, user_id });
    await category.save();
    res.send({ id: category._id });
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

router.get('/', auth, async (req, res) => {
  const { user_id } = req;
  try {
    const categories = await Category.find({ user_id })
      .select('name description user_id color points')
      .sort({
        name: 1,
      });
    res.send(categories);
  } catch (err) {
    return res.status(400).send('Unexpected error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return res.status(404).send('The category was not found');
    res.send(category);
  } catch (err) {
    return res.status(404).send('Unexpected error');
  }
});

module.exports = router;
