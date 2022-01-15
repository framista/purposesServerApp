const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
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
    points: {
      type: Number,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
