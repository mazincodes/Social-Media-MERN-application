import { LocationOnOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { Divider, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../../components/UserImage';


const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.primary.dark;
    const light = palette.primary.light;
    const text = palette.primary.lightest;


    const getUser = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` } // check server->middleware->auth
        });
        const data = await response.json();
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        occupation,
        location,
        friends,
        viewedProfile,
        impressions
    } = user;


    return (
        <section style={{background: dark, color: text}} className='p-8 my-8 rounded-2xl'>
            <div className='user flex justify-center items-center gap-2 m-4'>
                <div className='rounded-full' onClick={() => navigate(`/profile/${userId}`)}>
                    <UserImage image={picturePath} />
                </div>
                <div>
                    <h1 className='font-semibold text-[20px]'>{firstName} {lastName}</h1>
                    {friends.length === 1 ? (
                        <p style={{color: '#777'}} className='text-[17px]'>{friends.length} friend</p>
                    ) : (
                        <p style={{color: '#777'}} className='text-[17px]'>{friends.length} friends</p>
                    )}
                </div>
            </div>
            <Divider />
            <div className='flex flex-col justify-between py-4 gap-3'>
                <div className='flex justify-between gap-4'>
                    <h1 className='text-[17px]'>{location}</h1>
                    <LocationOnOutlined />
                </div>
                <Divider />
                <div className='flex justify-between gap-4'>
                    <h1 className='text-[17px]'>{occupation}</h1>
                    <WorkOutlineOutlined />
                </div>
                <Divider />
                <div className='flex justify-between gap-4'>
                    <h1 className='text-[17px]'>Who's has viewed your profile</h1>
                    <h1>{viewedProfile}</h1>
                </div>
                <Divider />
                <div className='flex justify-between gap-4'>
                    <h1 className='text-[17px]'>Impressions of your post</h1>
                    <h1>{impressions}</h1>
                </div>
            </div>
        </section>
    ) 
}

export default UserWidget;