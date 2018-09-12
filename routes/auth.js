const Joi = require('joi');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async(req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    const isValidPassword = await bcrypt.compare(req.body.password,user.password);
    if(!isValidPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();

    res.send(token);
});

function validate(user){
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(1024)
    };

    return Joi.validate(user,schema);
}
module.exports = router;