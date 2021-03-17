const express = require('express');
const isAuth = require('../middelware/isAuth');
const { body, validationResult } = require('express-validator');
const usersController = require('../controller/usersController');

const route = express.Router();

// Url: http://localhost:5000/api/users/register
// Method: POST
// Description: Register & Token
// Public
route.post('/register', [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').notEmpty(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], usersController.postRegister);

// Url: http://localhost:5000/api/users/login
// Method: POST
// Description: Login & Token
// Public
route.post('/login', [
    body('email', 'Email is required').notEmpty(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], usersController.postLogin);

// Url: http://localhost:5000/api/users/profile
// Method: GET
// Description: Get User Profile
// Private
route.get('/profile', isAuth, usersController.getProfile);

// Url: http://localhost:5000/api/users/profile/update
// Method: PUT
// Description: Update User Profile
// Private
route.put('/profile/update', isAuth, usersController.putProfile);

module.exports = route;