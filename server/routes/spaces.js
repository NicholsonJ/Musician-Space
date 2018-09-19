const express = require('express');
const Space = require('../models/Space');
const Comment = require('../models/Comment');
const router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Space.find()
    .then(spaces => {
      res.json(spaces);
    })
    .catch(err => next(err));
});

// Route to add a space
router.post('/', (req, res, next) => {
  let { name, loc, website, price, picture, description, _user } = req.body;
  Space.create({ name, loc, website, price, picture, description, _user })
    .then(space => {
      res.json({
        success: true,
        space
      });
    })
    .catch(err => next(err));
});

//Route to add comment
router.post('/comment', (req, res, next) => {
  let { comment, _space, _user } = req.body;
  Comment.create({ comment, _space, _user })
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err));
});

//Route to edit comment
// router.patch('/comment', (req, res, next) => {
//   let { _id, comment, _space, _user } = req.body;
//   Comment.findByIdAndUpdate(_id)
//     .then(comment => {
//       res.json({
//         success: true,
//         comment
//       });
//     })
//     .catch(err => next(err));
// });

module.exports = router;
