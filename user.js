'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = (password) => {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.validPassword = (password) => {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
}

userSchema.methods.generateJwt = () => {
	let expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	
	return jwt.sign({
		_id: this._id,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000)
	}, "salaisuus");
};