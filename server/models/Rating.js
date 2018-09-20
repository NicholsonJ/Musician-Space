const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: Number,
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    _space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
