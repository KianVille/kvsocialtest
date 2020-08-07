const router = require('express').Router();
const auth = require('../verifyToken');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/newPost', auth, async (req, res) => {

    const { message } = req.body;
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    const fullname = `${user.firstname} ${user.lastname}`

    const newPost = new Post({
        message: message,
        user_id: user_id,
        user: fullname
    });

    const savedPost = await newPost.save();
    res.json(savedPost);

});

router.get('/getPost', auth, async (req, res) => {

    const user = req.user._id;
    const userPosts = await Post.find({user_id: user});
    res.json(userPosts);

});

router.put('/like', auth, async (req, res) => {

    const { post_id } = req.body;
    const updateLike = await Post.findOneAndUpdate({_id :post_id}, {$inc : {'likes' : 1}})
    res.send(updateLike);

});

module.exports = router;