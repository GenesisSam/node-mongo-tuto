var express  = require('express');
var router   = express.Router();

// import book model
var Book = require("../models/user");

/**
 * 1. get user data from the other user -- /user
 * 2. get user own data -- /user (check user session token)
 * 3. get user list -- /users
 * 4. update user info -- /put
 * 5. delete user -- /delete
 * 6. register new user -- /post
 */
