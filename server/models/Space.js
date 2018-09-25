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
      coordinates: { type: [Number], default: [0, 0] } // [lng,lat]
      // lat: String,
      // lng: String
    },
    website: String,
    type: {
      type: String,
      enum: ['practice', 'rehearsal', 'hall', 'studio']
    },
    description: String,
    price: String,
    picture: [{}],
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

spaceSchema.index({ loc: '2dsphere' });

const Space = mongoose.model('Space', spaceSchema);
Space.ensureIndexes();
module.exports = Space;
