import { useTheme } from '@mui/material';
import Friend from '../../components/Friend';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const FriendList = ({ userId }) => {
    const [profileFriends, setProfileFriends] = useState([]);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const dark = palette.primary.dark;
    const main = palette.primary.main;
    const light = palette.primary.light;
    const text = palette.primary.lightest;

    const getFriends = async () => {
        const response = await fetch(`http://localhost:5174/users/${userId}/friends`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        setProfileFriends(data)
    }

    useEffect(() => {
        getFriends()
    }, [userId, token])
    
    return (
        <section className="py-8 my-8 rounded-2xl" style={{background: dark, color: text}}>
            <div className=''>
                <h1 className='text-[17px] pb-8 pl-8' style={{color: text}}>Friend List</h1>
                <div className='flex flex-col'>
                    {profileFriends.length < 1 ? (
                        <div style={{color: main, fontSize: '14px'}} className='flex justify-center items-center my-4'>
                            <p>You don't have friends :(</p>
                        </div>
                    ) : (
                        profileFriends.map((friend) => {
                            return (
                                <Friend
                                    key={friend._id}
                                    friendId={friend._id}
                                    name={`${friend.firstName} ${friend.lastName}`}
                                    subtitle={friend.occupation}
                                    userPicturePath={friend.picturePath}
                                />
                            )
                        })
                    )}
                </div>
            </div>
        </section>
    )
}

export default FriendList;