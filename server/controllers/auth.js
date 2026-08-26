import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); // This function generates salt (unique code) for each password hash, This is done before hashing
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // 201 - A resource has been created, Since the new user is now registered
    } catch (err) {
        res.status(500).json({error: err.message}) // 500 - Internal Server Error, Here the error message is sent by the server to user or browser
    }
}


// Logging In
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = {
            email: email
        };
        const user = await User.findOne(userInfo)
        if(!user) return res.status(400).json({ msg: 'User does not exist' }); // 400 - Bad request, Client's error

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        delete user.password;
        res.status(200).json({ token, user }); // 200 means request is successful, Since the user is authenticated this http code is used here
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}   