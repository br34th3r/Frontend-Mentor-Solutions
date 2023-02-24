const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/challenges', express.static(path.join(__dirname, "/challenges")));

const createLink = (href, text) => {
	return "<a href='" + href + "'>" + text + "</a>";
}

const createPage = (links) => {
	const title = "<h1>Frontend Mentor Solutions</h1>";
	const subtitle = "<h2>By " + createLink("https://www.github.com/br34th3r", "br34th3r") + "</h2>"
	let body = "<ul>";
	for (let i = 0; i < links.length; i++) {
		body += "<li>" + links[i] + "</li>";
	}
	body += "</ul>";
	const footer = "<footer><p>Total Completed : " + links.length + "</p><p>" + createLink("https://frontendmentor.io", "Try Frontend Mentor Yourself") + "</p></footer>";
	return "<html><head><title>Frontend Mentor Solutions</title></head><body>" + title + subtitle + body + footer + "</body></html>";
}

app.get('/', (req, res, next) => {
	const urlpath = req.protocol + "://" + req.get('host');
	const directories = fs.readdirSync(path.resolve(__dirname + "/challenges"), { withFileTypes: true })
    		.filter(dirent => dirent.isDirectory())
    		.map(dirent => dirent.name);
	let links = directories.map((directory) => createLink(urlpath + "/challenges/" + directory, directory));
	res.send(createPage(links));
});

app.listen(3000, () => console.log('Listening on Port 3000'));

module.exports = app;
