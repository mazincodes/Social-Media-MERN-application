import { EditOutlined, GifBoxOutlined, ImageOutlined, DeleteOutlined, VideoFileOutlined } from '@mui/icons-material';
import { InputBase, Divider, useMediaQuery, useTheme, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import UserImage from '../../components/UserImage';
import { setPosts } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();

    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isGif, setIsGif] = useState(false);

    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [gif, setGif] = useState(null);

    const [post, setPost] = useState('');

    // const [isGenerating, setIsGenerating] = useState(false);

    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dark = palette.primary.dark;
    const light = palette.primary.light;
    const main = palette.primary.main;
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    const pinkCool = palette.secondary.light;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('userId', _id);
        formData.append('description', post);
        
        // We are getting the data below from DropZone 
        if (image) {
            formData.append('picture', image);
            formData.append('typeOfPost', image.type);
            formData.append('picturePath', image.name);
        }
        
        if (video) {
            formData.append('picture', video);
            formData.append('typeOfPost', video.type);
            formData.append('picturePath', video.name);
        }

        if (gif) {
            formData.append('picture', gif);
            formData.append('typeOfPost', gif.type);
            formData.append('picturePath', gif.name);
        }


        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        })
    
        const posts = await response.json();
        dispatch(setPosts({ posts }))
    
        setImage(null);
        setVideo(null);
        setGif(null);
        setPost('');
    }

    const imageBtn = () => {
        setIsImage((prev) => !prev) || (setIsVideo(video) || setIsGif(gif));
    }
    const videoBtn = () => {
        setIsVideo((prev) => !prev) || (setIsImage(image) || setIsGif(gif));
    }
    const gifBtn = () => {
        setIsGif((prev) => !prev) || (setIsImage(image) || setIsVideo(video));
    }


    return (
        <section style={{background: dark}} className='my-8 p-8 rounded-2xl'>
            <div className='flex justify-center items-center gap-2 mb-2'>
                <UserImage image={picturePath} />
                <InputBase
                    className='px-4 py-2 rounded-4xl w-[90%]'
                    sx={{background: main, color: '#fff'}}
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
            </div>
            
            <div className='postContainer'>
                {isVideo ? (
                    <div className='video-section border border-dotted rounded-2xl p-2 mb-2' style={{borderColor: pinkCool}}>
                        <Dropzone
                            accept={'video/mp4,video/mkv'}
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                console.log(acceptedFiles[0]);
                                setVideo(acceptedFiles[0])}
                            }
                            >
                            {({ getRootProps, getInputProps }) => {

                            return (
                                <div className="flex justify-center text-center">
                                    <div
                                        {...getRootProps()}
                                        className="border-2 p-2 w-full cursor-pointer rounded-2xl"
                                        style={{ borderColor: pinkHot }}
                                    >
                                        <input {...getInputProps()} />
                                        {!video ? (
                                            <p>Add Video Here</p>
                                        ) : (
                                            <div className='flex justify-between'>
                                                <p>{video.name}</p>
                                                <EditOutlined />
                                            </div>
                                        )}
                                    </div>
                                    {video && (
                                        <IconButton sx={{width: '50px'}} onClick={() => setVideo(null)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                </div>
                            );
                            }}
                        </Dropzone>
                    </div>
                ) : null}

                {isImage ? (
                    <div className='image-section border border-dotted rounded-2xl p-2 mb-2' style={{borderColor: pinkCool}}>
                        <Dropzone
                            accept={'image/jpg,image/jpeg,image/png'}
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                console.log(acceptedFiles[0]);
                                setImage(acceptedFiles[0])}
                            }
                            >
                            {({ getRootProps, getInputProps }) => {

                            return (
                                <div className="flex justify-center text-center">
                                    <div
                                        {...getRootProps()}
                                        className="border-2 p-2 w-full cursor-pointer rounded-2xl"
                                        style={{ borderColor: pinkHot }}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                            <div className='flex justify-between'>
                                                <p>{image.name}</p>
                                                <EditOutlined />
                                            </div>
                                        )}
                                    </div>
                                    {image && (
                                        <IconButton sx={{width: '50px'}} onClick={() => setImage(null)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                </div>
                            );
                            }}
                        </Dropzone>
                    </div>
                ) : null}

                {isGif ? (
                    <div className='gif-section border border-dotted rounded-2xl p-2 mb-2' style={{borderColor: pinkCool}}>
                        <Dropzone
                            accept={'image/gif'}
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                console.log(acceptedFiles[0]);
                                setGif(acceptedFiles[0])}
                            }
                            >
                            {({ getRootProps, getInputProps }) => {

                            return (
                                <div className="flex justify-center text-center">
                                    <div
                                        {...getRootProps()}
                                        className="border-2 p-2 w-full cursor-pointer rounded-2xl"
                                        style={{ borderColor: pinkHot }}
                                    >
                                        <input {...getInputProps()} />
                                        {!gif ? (
                                            <p>Add Gif Here</p>
                                        ) : (
                                            <div className='flex justify-between'>
                                                <p>{gif.name}</p>
                                                <EditOutlined />
                                            </div>
                                        )}
                                    </div>
                                    {gif && (
                                        <IconButton sx={{width: '50px'}} onClick={() => setGif(null)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                </div>
                            );
                            }}
                        </Dropzone>
                    </div>
                ) : null}
            </div>

            <Divider />

            <div className='flex sm:justify-between justify-center items-center gap-2 mt-2'>
                <div onClick={() => imageBtn()} className="flex gap-1 cursor-pointer justify-center items-center">
                    <ImageOutlined sx={{color: main}} />
                    <h1 style={{color: main}}>Image</h1>
                </div>
                <div onClick={() => videoBtn()} className="flex gap-1 cursor-pointer justify-center items-center">
                    <VideoFileOutlined sx={{color: main}} />
                    <h1 style={{color: main}}>Video</h1>
                </div>
                <div onClick={() => gifBtn()} className="flex gap-1 cursor-pointer justify-center items-center">
                    <GifBoxOutlined sx={{color: main}} />
                    <h1 style={{color: main}}>Gif</h1>
                </div>
                <Button disabled={!post} onClick={handlePost} sx={{
                    "&:hover": {
                        boxShadow: '0px 0px 5px rgb(210,40,108)',
                        transition: 'linear all 0.3s'
                    },
                    background: pinkHot, transition: 'linear all 0.3s', color: dark, padding: '8px 24px', borderRadius: '32px'}}
                >
                    Post
                </Button>
            </div>
            
        </section>        
    )
}

export default MyPostWidget;