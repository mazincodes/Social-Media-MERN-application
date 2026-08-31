import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from '../state';
import UserImage from './UserImage';
import SimpleSnackbar from './Alert';
import { useState } from 'react';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const { palette } = useTheme();
    const light = palette.primary.light;
    const dark = palette.primary.dark;
    const main = palette.primary.main;
    const text = palette.primary.lightest;
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    
    
    const isFriend = friends.find((friend) => friend._id === friendId);
    // const isFriend = friends.some((friend) => friend._id === friendId);
    const wasFriend = Boolean(isFriend)

    const patchFriend = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${_id}/${friendId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
        wasFriend ? setAlertText('Friend removed successfully 😢') : setAlertText('Friend added successfully 😃')
        setAlertOpen(true)
    }

    return (
        <section className=''>
            <div className='flex justify-between items-center p-8'>
                <div className='flex justify-center items-center gap-2'>
                    <UserImage image={userPicturePath} size={'55px'} />
                    <div className='flex flex-col' onClick={() => {
                        navigate(`${import.meta.env.VITE_API_URL}/profile/${friendId}`)
                        navigate(0)
                    }}>
                        <h1 className='text-[18px] cursor-pointer font-semibold' style={{color: text}}>{name}</h1>
                        <h1 className='text-[14px]' style={{color: light}}>{subtitle}</h1>
                    </div>
                </div>
                <div>
                    {_id !== friendId && (
                        <IconButton onClick={patchFriend}
                            sx={{
                                "&:hover": {
                                    background: pinkWarm,
                                    boxShadow: `0 0 5px 0 ${light}`,
                                    transition: 'all linear 0.1s'
                                },
                                backgroundColor: light,
                                transition: 'all linear 0.1s' 
                            }}
                        >
                            {wasFriend ? (
                                <>
                                    <SimpleSnackbar open={alertOpen} onClose={() => setAlertOpen(false)} message={alertText} />
                                    <PersonRemoveOutlined sx={{ color: dark }} />
                                </>

                            ) : (
                                <>
                                    <SimpleSnackbar open={alertOpen} onClose={() => setAlertOpen(false)} message={alertText} />
                                    <PersonAddOutlined sx={{ color: dark }} />
                                </>  
                            )}
                            
                        </IconButton>
                        ) 
                    }
                </div>
                
            </div>
        </section>
    )
}

export default Friend;