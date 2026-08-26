import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import AdvertWidget from '../widgets/AdvertWidget';
import { useMediaQuery, useTheme, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import adImg from '../../assets/3projectsWithLogo.jpg'
import FriendList from '../widgets/FriendList'

const HomePage = () => {
    const isWideScreens = useMediaQuery("(max-width:1280px)");
    const { palette } = useTheme();
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    const light = palette.primary.light;
    const navigate = useNavigate();
    const { _id, picturePath } = useSelector((state) => state.user);
    
    return (
        <>
            <NavBar />
            {!isWideScreens && (
            <div className='flex md:flex-row flex-col justify-center'>
                <div className='w-100 mx-6'>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </div>
                <div className='flex flex-col w-125'>
                    <MyPostWidget picturePath={picturePath} />
                    <div className='flex justify-center'>
                        <PostsWidget userId={_id} />
                    </div>
                </div>
                <div className='flex flex-col w-100'>
                    <AdvertWidget img={adImg} />
                    <div className='mx-8'>
                        <FriendList userId={_id} />
                    </div>
                </div>
            </div>
            )}

            {isWideScreens && (
                <div>
                    <div className='m-8 md:m-4 md:flex justify-center gap-5'>
                        <div>
                            <MyPostWidget picturePath={picturePath} />
                            <div className='flex justify-center'>
                                <Button onClick={() => navigate(`/profile/${_id}`)} sx={{
                                    "&:hover": {
                                        background: pinkWarm,
                                        boxShadow: `0 0 5px 0 ${light}`,
                                        transition: 'all linear 0.1s'
                                    },
                                    transition: 'all linear 0.1s',
                                    padding: '8px 24px',
                                    background: pinkHot, color: 'white', borderRadius: '16px'
                                    }}
                                    className='rounded-2xl cursor-pointer'>
                                    Show Friends <ArrowForwardIcon />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <UserWidget userId={_id} picturePath={picturePath} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center m-0 md:my-0 md:mx-36'>
                        <div className='w-112.5 lg:m-4 m-8'>
                            <PostsWidget userId={_id} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default HomePage;