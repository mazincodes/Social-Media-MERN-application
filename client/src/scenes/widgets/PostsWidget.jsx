import PostWidget from './PostWidget';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../state';
import { useTheme, InputBase } from '@mui/material'
import { Search, SentimentDissatisfied } from '@mui/icons-material'

const PostsWidget = ({ userId, isProfile = false }) => {
    const [query, setQuery] = useState('');
    const { palette } = useTheme();
    const light = palette.primary.light;
    const main = palette.primary.main;
    const dark = palette.primary.dark;
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const filteredPosts = posts.filter(({ firstName, lastName }) => {
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        return (
            firstName.toLowerCase().includes(query.toLowerCase()) ||
            lastName.toLowerCase().includes(query.toLowerCase()) ||
            fullName.includes(query.toLowerCase())
        );
    });


    const getPosts = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data }))
    }
    
    const getUserPosts = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data }))
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        }
        else {
            getPosts()
        }
    }, [])
    
    return (
        <section>
            <div>
                <div style={{background: main}} className='fixed z-10 top-5 xl:w-[20%] w-[25%] xl:right-[40%] right-[37.5%] xl:left-[40%] left-[37.5%] hidden lg:flex justify-center items-center rounded-2xl px-6 py-2'>
                    <div className='flex justify-between items-center'>
                        <InputBase sx={{color: '#fff', textShadow: '2px_2px_4px_rgba(0, 0, 0, 0.9)'}} value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} placeholder='Search by name...' />
                        <Search sx={{color: dark, width: '30px', height: '30px'}} />
                    </div>
                </div>
                {
                    filteredPosts.length === 0 ? (
                        <div className="flex justify-center items-center gap-1 mt-48">
                            <h3 className='text-[20px]'>No result</h3>
                            <SentimentDissatisfied sx={{width: '30px', height: '30px'}} />
                        </div>
                    ) : (
                        filteredPosts.map(({ _id, userId, firstName, lastName, description, location, picturePath, typeOfPost, userPicturePath, likes, comments}) => {
                            return (
                                <PostWidget
                                    key={_id}
                                    postId={_id}
                                    postUserId={userId}
                                    isProfile={isProfile}
                                    name={`${firstName} ${lastName}`}
                                    description={description}
                                    location={location}
                                    picturePath={picturePath}
                                    typeOfPost={typeOfPost}
                                    userPicturePath={userPicturePath}
                                    likes={likes}
                                    comments={comments}
                                />
                            );
                        })
                    )
                }
            </div>
        </section>
    )
}

export default PostsWidget;