'use strict';
/**
 * router
 * @license MIT license
 */

const express = require('express');
const Router = module.exports = express.Router();

/**
 * Routes to index
*/
Router.route('/').get((req, res) => {
	res.render('index');
});