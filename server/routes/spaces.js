const express = require('express');
const Space = require('../models/Space');
const Comment = require('../models/Comment');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary.js');

// Route to get all spaces
router.get('/', (req, res, next) => {
  let { lat, lng } = req.query;
  Space.find({
    loc: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: 42000000 // 1000km
        // $minDistance: 1
      }
    }
  })
    .then(spaces => {
      res.json(spaces);
    })
    .catch(err => next(err));
});

//Route to get individual space details
router.get('/:id', (req, res, next) => {
  Space.find({ _id: req.params.id })
    .then(s => {
      res.json(s);
    })
    .catch(err => next(err));
});

// Route to add a space
router.post('/', isLoggedIn, uploadCloud.single('picture'), (req, res, next) => {
  let _user = req.user;
  console.log('req.file: ', req.file);
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  let { name, lat, lng, website, price, picture, description } = req.body;
  Space.create({
    name,
    loc: { type: 'Point', coordinates: [lng, lat] },
    website,
    price,
    picture,
    description,
    _user,
    imgPath,
    imgName
  })
    .then(space => {
      res.json({
        success: true,
        space
      });
    })
    .catch(err => next(err));
});

// Route to delete space
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  Space.findByIdAndRemove(req.params.id)
    .then(s => {
      res.json({
        success: true,
        s
      });
    })
    .catch(err => next(err));
});

// Route to edit space
router.patch('/:id', isLoggedIn, (req, res, next) => {
  let { name, loc, website, price, picture, description } = req.body;
  Space.findByIdAndUpdate(
    req.params.id,
    { name, loc, website, price, picture, description },
    { upsert: true, new: true }
  )
    .then(space => {
      res.json({
        success: true,
        space
      });
    })
    .catch(err => next(err));
});

module.exports = router;
