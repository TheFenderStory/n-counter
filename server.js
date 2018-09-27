'use strict';
/**
 * server.js
 * @author Jared Grady
 * @license MIT
 */

/* Begin by configuring variables */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const compression = require('compression');
const helmet = require('helmet');
const build = require('./build');
const chalk = require('chalk');

const port = process.env.PORT || 3000;

/* Set up express middleware before launch */
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(compression());
app.use(helmet({noSniff: false}));
app.use(express.static(__dirname + '/public'));


/* Set up our routes (found in src/router.js) */
app.use('/', require('./src/routes'));

/* handle 400 errors */
app.use(function(req, res) {
	res.status(400);
	res.render('400');
});

/* handle 500 errors */
app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500');
});

/* Finally, start listening */
http.listen(port, error => {
	if (error) console.log(chalk.red(error));
	console.log("Now listening on port: " + chalk.green(port));

	/* build public files on startup */
	build.start();
});
