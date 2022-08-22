const router = require('express').Router();
const User = require('../models/User')
const authUser = require('../middleware/authUser')

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByInfo(email, password);
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.delete('/logout', authUser, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObject) => tokenObject.token !== req.token);
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(400).json(e.message);
    }
})

module.exports = router;