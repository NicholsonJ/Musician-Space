const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
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

const Like = mongoose.model('like', likeSchema);
module.exports = Like;
