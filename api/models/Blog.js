const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      required: true
    },
    created: {
        type: 'string',
        default: new Date().toLocaleDateString()
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;