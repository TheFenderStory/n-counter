'use strict';
/**
 * routes.js
 * @author Jared Grady
 * @license MIT
 */

const express = require('express');
const Router = module.exports = express.Router();

/**
 * Routes to index
*/
Router.route('/').get((req, res) => {
	res.render('index');
});