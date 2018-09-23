const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The practice space name is required'],
      minlength: 1
    },
    loc: {
      type: {
        type: String,
        default: 'Point'
      },
      lat: String,
      lng: String
    },
    website: String,
    type: {
      type: String,
      enum: ['practice', 'rehearsal', 'hall', 'studio']
    },
    description: String,
    price: String,
    picture: String,
    piano: Boolean,
    drum: Boolean,
    deleteRequests: {
      type: String,
      default: '0'
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
