'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 3000;

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public', 'home.html'));
});

app.route('/login')
.get((req, res) => {
	res.sendFile(path.join(__dirname, './public/auth/login', 'login.html'));
});

app.use('/', router);

app.listen(port, () => {
	console.log(`listening to ${port}`);
});