const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.listen(port, () => {
	console.log(`listening to ${port}`);
});