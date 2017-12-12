const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
	id: Number,
	author: String,
	body: String
});

mongoose.model('comments',commentSchema)