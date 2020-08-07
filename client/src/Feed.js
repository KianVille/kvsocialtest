import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import UserContext from './UserContext';
import MessageCard from './MessageCard';
import './Feed.css';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

function Feed() {

    const { userData } = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);

    const [newMessage, setNewMessage] = useState('');
    const [addedNewPost, setaddedNewPost] = useState('');

    useEffect( () => {
        
       const getPost = async () => {
            if (userData.token_state) {;
                const userPost = await Axios.get('http://localhost:5000/timeline/friendPosts', {headers: { 'auth-token': userData.token }});
                setUserPosts(userPost.data);
            }
       }

       getPost();

    },[userData, addedNewPost]);

    const submitPost = async (e) => {
        e.preventDefault();
        const newPost = await Axios.post(
            'http://localhost:5000/post/newPost', 
            { message: newMessage, user_id: userData.user_id },
            {headers: { 'auth-token': userData.token }}
            );
        setaddedNewPost(newMessage);
        
    }

    return (
        <div className='feed'>

        <div className='feed__post'>
            <form onSubmit={submitPost}>
            <TextField
            className='feed__post_textarea'
            id="outlined-multiline-static"
            label="Post a message"
            multiline
            rows={2}
            variant="outlined"
            onChange={e=> {setNewMessage(e.target.value)}}
            />
            <div className='feed__post_button'>
                <Button onClick={submitPost} variant="outlined">Post!</Button>
            </div>
            </form>
           
        </div>

        {
        userPosts.map( 
            post => {
            return (
            <div className='feed__message' key={post._id} >
            <MessageCard 
            postMessage={post.message}
            userName={post.user}
            likes={post.likes}
            postTime={post.date}
            />
            </div>
            )
        })}

        </div>
    
    )
}

export default Feed
