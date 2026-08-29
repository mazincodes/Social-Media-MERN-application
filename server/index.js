import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import { register } from './controllers/auth.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';
import User from './Models/User.js';
import Post from './Models/Post.js';
import { users, posts } from './data/index.js';

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json()); // use() method allows to add middleware, A middleware is a function that receives req & res objects with a next() function
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


// File storage
const storage = multer.diskStorage({ // multer is a middleware used to handle multipart/form-data which is used for uploading files
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('').join(''));
  },
});

const upload = multer({ storage: storage });


// Routes with files - These routes can't be moved to a separate file, since there is an 'upload' variable which is defined here
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// Routes - These routes can be moved to any file
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to Node server!");
})

// Mongoose setup
const PORT = process.env.PORT || 5174;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`))
  // *****Add data one time*****
    // User.insertMany(users);
    // Post.insertMany(posts);

})
.catch((error) => console.error(error));