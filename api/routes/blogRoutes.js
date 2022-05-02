const router = require('express').Router();
const Blog = require('../models/Blog');
const authUser = require('../middleware/authUser');

router.post('/post', authUser, async (req, res) => {
   const { title, content } = req.body;
   try {
       const blog = await Blog.create({ title, content, author: req.user._id });
       req.user.blogs.push(blog._id);
       await req.user.save();
       res.json(blog);
   } catch (e) {
       res.status(400).json(e.message);
   }
});



router.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.get('/mine', authUser, async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        user.populate('blogs').then(({blogs}) => {
            res.json(blogs)
        });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
       const blog = await Blog.findById(id);
       console.log(blog)
       blog.populate('author').then(result => {
           console.log(result)
           res.json(result)
       });
   } catch (e) {
       res.status(400).json(e.message);
   }
});

module.exports = router;