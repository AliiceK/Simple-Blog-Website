const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creates a new schema object
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    snippet: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    }
}, {timestamps: true});

//schema is teh thing that structures our documents
// model is the thing that surrounds that and provides us with an interface
// by which to communicate with the database collection for that document type

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;