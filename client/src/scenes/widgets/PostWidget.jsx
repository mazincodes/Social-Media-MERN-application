import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, MoreVert } from "@mui/icons-material";
import { Divider, useTheme, IconButton, Menu, MenuItem, InputBase, Button } from '@mui/material';
import Friend from '../../components/Friend';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, deletePost } from '../../state';
import SimpleSnackbar from "../../components/Alert";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    typeOfPost,
    userPicturePath,
    likes,
    comments,
    isProfile
}) => {
    const [isComments, setIsComments] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate()
    const [postDescription, setPostDescription] = useState(description);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const { palette } = useTheme();
    const light = palette.primary.light;
    const dark = palette.primary.dark;
    const main = palette.primary.main;
    const text = palette.primary.lightest;
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    const pinkCool = palette.secondary.light;

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5174/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
    
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            
            const data = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(deletePost({postId: data.postId}))
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(
                `http://localhost:5174/posts/${postId}/description`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description: postDescription,
                    }),
                }
            );
            console.log(postDescription);
            
            const updatedPost = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(setPost({ post: updatedPost }));
            // spinner will be visible for 2 secs
            setIsEditing(false)
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setIsLoading(false)
        }
    };

    // options menu
    const options = [
    'Edit description',
    'Delete post',
    ];

    const startEditing = () => {
        setIsEditing(true);
    };

    // const itemHeight = 48;

    function LongMenu() {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleAnchor = (e) => {
            setAnchorEl(() => e.currentTarget)
        };


        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleAnchor}
            >
                <MoreVert />
            </IconButton>
            <Menu
                sx={{borderRadius: '16px'}}
                id="long-menu"
                className="bg-black/80"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    style: {
                    width: '150px',
                    borderRadius: '16px',
                    background: dark,
                    },
                },
                list: {
                    'aria-labelledby': 'long-button',
                },
                }}
            >
                    {options.map((option) => (
                        <MenuItem className="duration-300" sx={{borderRadius: '16px', "&:hover": {background: main}}} key={option} onClick={() => {
                            if (option === 'Edit description') {
                                startEditing()
                            }
                            if (option === 'Delete post') {
                                setOpenAlert(true)
                                handleDelete()
                            }
                            
                        }}>
                            {option} 
                        </MenuItem>
                    ))}
            </Menu>
            </div>
        );
    }

    const patchLike = async () => {
        const response = await fetch(`http://localhost:5174/posts/${postId}/like`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

    const arrImg = ['image/jpeg', 'image/gif', 'image/png'];
    const arrVid = ['video/matroska', 'video/mp4'];
    const isTypeOfPostImage = arrImg.includes(typeOfPost);
    const isTypeOfPostVideo = arrVid.includes(typeOfPost);
    
    return (
        <section className="lg:m-4 mb-4 rounded-2xl" style={{background: dark}}>
            <div>
                <SimpleSnackbar open={openAlert} onClose={() => setOpenAlert(false)} message={`Deleted Successfully`} />
                <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} isProfile={isProfile} />
                <div className="flex items-center gap-0">
                    {isEditing ? (
                    <div className="ml-8">
                        <InputBase
                            fullWidth
                            className='px-4 py-3 mb-4 rounded-4xl w-full'
                            sx={{background: light, color: dark}}
                            onChange={(e) => setPostDescription(e.target.value)}
                            value={postDescription}
                        />
                        <Button
                            sx={{
                                "&:hover": {
                                    background: pinkWarm,
                                    boxShadow: `0 0 5px 0 ${light}`,
                                    transition: 'all linear 0.1s',
                                },
                                transition: 'all linear 0.1s',
                                background: pinkHot, color: dark, padding: '8px 16px', borderRadius: '16px'
                            }}
                            onClick={handleSave}
                            disabled={isLoading}
                            className="flex justify-center items-center gap-1 hover:scale-100 duration-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div style={{color: dark}} className="flex items-center gap-2">
                                    Saving
                                    <span className="loader w-4 h-4"></span>
                                </div>
                            ) : (
                                <p>Save</p>
                            )}
                        </Button>
                    </div>
                    ) : (
                        <div className="px-12">
                            <h1 style={{color: text}}>{description}</h1>
                        </div>
                    )}
                    {name === fullName ? <LongMenu /> : ''}
                </div>
                
                <div className="flex justify-center items-center">
                    {picturePath && isTypeOfPostImage && (
                        <img className="w-[80%] rounded-2xl m-4" src={`http://localhost:5174/assets/${picturePath}`} alt="Post" />
                    )}

                    {picturePath && isTypeOfPostVideo && (
                        <video className="w-[80%] rounded-2xl m-4" src={`http://localhost:5174/assets/${picturePath}`} muted controls loop></video>
                    )}
                </div>

                <div className="flex gap-2 items-center pb-8 px-12">
                    <div className="flex justify-between items-center">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{fontSize: '25px', color: pinkCool}} />
                            ) : (
                                <FavoriteBorderOutlined sx={{fontSize: '25px'}} />
                            )}
                        </IconButton>
                        <h1>{likeCount}</h1>
                    </div>

                    <div className="flex justify-between items-center">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined sx={{fontSize: '25px'}} />
                        </IconButton>
                        <h1>{comments.length}</h1>
                    </div>

                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </div>

                {isComments && (
                    <div>
                    {comments.map((comment, i) => (
                        <div key={`${name}-${i}`}>
                        <Divider sx={{mt: '2px'}} />
                        <h1 className="p-4">
                            {comment}
                        </h1>
                        </div>
                    ))}
                    
                    </div>
                )}
            </div>

        </section>
    )
}

export default PostWidget;