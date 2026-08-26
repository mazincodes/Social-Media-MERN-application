import Post from '../Models/Post.js';
import User from '../Models/User.js';

// ****************CREATE****************
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath, typeOfPost } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath, // user's profile
            picturePath, // a post
            typeOfPost, // I added this
            likes: {},
            comments: [], 
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post); // 201 means a new resource created
    }   
    catch(err) {
        res.status(409).json({ error: err.message }); // conflict error
    }
}

// **************READ**************
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post); // 201 means request is successful

    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
        
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}


// *********************UPDATE*********************
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true },
        )

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const updateDescription = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId);
        const { description } = req.body;

        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        
        if (post.userId !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        post.description = description;

        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ postId });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};