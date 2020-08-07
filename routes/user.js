const route = require('express').Router();
const auth = require('../verifyToken');
const User = require('../models/User');

route.get('/profile', auth , async (req, res) => {

    const userId = await req.user._id;
    const userProfile = await User.findById(userId);

    res.json(userProfile);
 
});

module.exports = route;