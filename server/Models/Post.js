import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    picturePath: String,
    typeOfPost: String, // I added this
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const post = mongoose.model('Post', PostSchema); // name and schema is passed in this function
export default post;