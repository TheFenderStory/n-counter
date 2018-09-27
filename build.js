'use strict';
/**
 * build.js
 * @author Jared Grady
 * @license MIT
 */
const fs = require('fs');
const uglyCss = require('uglifycss');
const uglyJs = require('uglify-js');
const jsFiles = fs.readdirSync('public/src');

/**
 * Builds minified javascript files to serve publically.
 */
function minifyJs() {
	for (let file of jsFiles) {
		fs.readFile(`public/src/${file}`, "utf8", (err, code) => {
			if (err) throw err;
			if (!file.includes("min")) {
				fs.writeFile(`public/src/${file.substring(0, file.indexOf("."))}-min.js`, uglyJs.minify(code).code, function(err) {
					if (err) throw err;
					console.log(`    -- Successfully built ${file.substring(0, file.indexOf("."))}-min.js`);
				});
			}
		});
	}
}

/**
 * Builds minified css files to serve publically.
 */
function minifyCss() {
	let file = "style.css";
	fs.readFile(`public/css/${file}`, "utf8", (err, code) => {
		if (err) throw err;
		if (!file.includes("min")) {
			fs.writeFile(`public/css/${file.substring(0, file.indexOf("."))}-min.css`, uglyCss.processString(code), function(err) {
				if (err) throw err;
				console.log(`    -- Successfully built ${file.substring(0, file.indexOf("."))}-min.css`);
			});
		}
	});
}

/*
 * Main function for build process
 */
module.exports.start = function start() {
	console.log("Building source files...");
	try {
		console.log("  Minifying source files...");
		minifyJs();
		minifyCss()
	} catch (e) {
		console.error("Failed to minify javascript: " + e.message);
		process.exit(1);
	}
}