const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get('/profile', (req, res, next) => {
  User.find({ _id: req.user._id })
    .then(s => {
      res.json(s);
    })
    .catch(err => next(err));
});
module.exports = router;
