const express = require('express');
const cors = require('cors');
const connectToDb= require('./db.js');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

(async function start() {
    try {
        await connectToDb();
        app.listen(3000, () => {
            console.log(`API server started on port 3000`);
        });
    } catch (err) {
        console.log(err);
    }
}());