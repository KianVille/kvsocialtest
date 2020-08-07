const router = require('express').Router();
const auth = require('../verifyToken');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/friend', auth, async (req,res) => {

    const { searchName } = req.body;

    const user_id = req.user._id;
    const searchFriend = await User.find({firstname: { $regex: searchName, $options: "i" }}, );

    res.json(searchFriend);
    

});

module.exports = router;