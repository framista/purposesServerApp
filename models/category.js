const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
