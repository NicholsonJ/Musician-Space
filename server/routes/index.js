const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const User = require('../models/User');

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.user);
  User.find({ _id: req.user._id })
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
});

module.exports = router;
