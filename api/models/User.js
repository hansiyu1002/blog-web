const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: 'string',
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"],
        match: [/\S+@\S+\.\S+/, "invalid"],
        index: true
    },
    password: {
        type: 'string',
        required: [true, "Can't be blank"]
    },
    tokens: [],
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(error, salt) {
        if(error) return next(error);
        bcrypt.hash(user.password, salt, function(error, hash) {
           if(error) return next(error);
           user.password = hash;
           next();
        });
    });
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.blogs;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'blogweb');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

UserSchema.statics.findByInfo = async function(email, password) {
    const user = await User.findOne({ email });
    console.log(user)
    if(!user) throw new Error('Invalid email or password');
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error('Invalid email or password');
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;