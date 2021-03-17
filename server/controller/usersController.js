const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_my_token';

exports.postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const existsUser = await User.findOne({email});
        if (existsUser) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashPassword = await bcryptjs.hash(password, 12);
            const user = await User({name, email, password: hashPassword});
            await user.save();
            const payload = { id: user._id };
            jwt.sign(payload, jwtSecret, (error, token) => {
                return res.json({token, user});
            })
        }
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
    
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
    
        const payload = { id: user._id };
        jwt.sign(payload, jwtSecret, (error, token) => {
            return res.json({token, user});
        })   
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}

exports.getProfile = (req, res, next) => {
    return res.json({ user: req.user });
}

exports.putProfile = async (req, res, next) => {
    const { name, password } = req.body;
    
    try {
        let user = await User.findById({ _id: req.user.id });
        if (password) {
            const hashPassword = await bcryptjs.hash(password, 12);
            user.password = hashPassword;
        }
        if (name) {
            user.name = name;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Server Error" });
    }
}