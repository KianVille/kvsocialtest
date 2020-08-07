const route = require('express').Router();
const User = require('../models/User');
const { signupValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.post('/signup', async (req,res) => {

    const  { firstname, lastname, email, password } = req.body;

    const validateSignup = signupValidation(req.body);
    if (validateSignup.error) return res.json({error:validateSignup.error.details[0].message});

    const emailExist = await User.findOne({email: email});

    if (emailExist) return res.send('Email already exist!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
       
});

route.post('/login', async (req, res) => {

    const  { email, password } = req.body;

    const validateLogin = loginValidation(req.body);
    if (validateLogin.error) return res.json({error:validateLogin.error.details[0].message});

    const user = await User.findOne({email: email});
    if (!user) return res.json({error:'Email dosen\'t exist!'});

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({error:'Incorrect Password!'});

    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN, {

        expiresIn: '1d' // expires 1 day

   });
    

    res.header('auth-token', token);

    res.send(token);

});

module.exports = route;