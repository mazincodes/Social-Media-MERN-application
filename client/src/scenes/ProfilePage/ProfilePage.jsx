import { useMediaQuery, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import FriendList from "../widgets/FriendList";
import { useNavigate, useParams } from "react-router-dom";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import ArrowBack from '@mui/icons-material/ArrowBack';

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme();
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    const light = palette.primary.light;
    const dark = palette.primary.dark;
    const { userId } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(max-width: 1280px)")

    const getUser = async () => {
        const response = await fetch(`http://localhost:5174/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setUser(data);
    }

    useEffect(() => {
        getUser()
    }, [])

    if (!user) return null;

    return (
        <>
            <NavBar />
            <Button onClick={() => navigate("/home")} sx={{
                "&:hover": {
                    background: pinkWarm,
                    boxShadow: `0 0 5px 0 ${light}`,
                    transition: 'all linear 0.1s'
                },
                transition: 'all linear 0.1s',
                padding: '8px 24px',
                marginY: '32px',
                marginX: '32px',
                background: pinkHot, color: dark, borderRadius: '16px'
                }}
                className='rounded-2xl cursor-pointer'>
                <ArrowBack /> Back 
            </Button>
            <div className='flex lg:flex-row flex-col justify-center lg:items-start items-center lg:gap-8 mx-8'>
                <div className="sm:w-125 w-full">
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                </div>
                <div className="sm:w-100 w-full">
                    <FriendList userId={userId} />
                </div>
            </div>
            <div className='flex justify-center items-center m-8 md:mx-36'>
                <div className='w-112.5'>
                    <PostsWidget userId={userId} isProfile /> 
                </div>
            </div>
        </>
    )
    
}
export default ProfilePage;