require('dotenv').config()
const mongoose = require('mongoose');

async function connectToDb() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@mernweb.d7loj.mongodb.net/blogweb?retryWrites=true&w=majority`;
    mongoose.connect(uri, () => {
        console.log('Connected to MongoDB at', uri);
    });
}

module.exports = connectToDb;