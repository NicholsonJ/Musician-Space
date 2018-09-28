const express = require('express');
const Space = require('../models/Space');
const Comment = require('../models/Comment');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');

//Route to get comments
router.get('/', (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => next(err));
});

//Route to add comment
router.post('/', isLoggedIn, (req, res, next) => {
  let _user = req.user;
  let { comment, _space } = req.body;
  console.log('_____________comment', comment);
  Comment.create({ comment, _space, _user })
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err));
});

//Route to get comment by space
router.get('/space/:id', (req, res, next) => {
  Comment.find({ _space: req.params.id })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => next(err));
});

// Route to delete comment
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(c => {
      res.json({
        success: true,
        c
      });
    })
    .catch(err => next(err));
});

// Route to edit comment
router.patch('/:id', isLoggedIn, (req, res, next) => {
  let { comment } = req.body;
  Comment.findByIdAndUpdate(req.params.id, { comment }, { upsert: true, new: true })
    .then(comment => {
      res.json({
        success: true,
        comment
      });
    })
    .catch(err => next(err));
});

module.exports = router;
