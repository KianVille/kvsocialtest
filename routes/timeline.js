const router = require('express').Router();
const auth = require('../verifyToken');
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/friendPosts', auth, async (req,res) => {

    const user_id = req.user._id;
    const userData = await User.findById(user_id);
    const userFriends = [...userData.friends,user_id];
    const friendPost = await Post
                            .find()
                            .where('user_id')
                            .in(userFriends)
                            .sort({ date : -1 })
                            .limit(5);

    res.json(friendPost);

});

module.exports = router;