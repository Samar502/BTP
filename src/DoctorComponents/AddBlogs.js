import * as React from 'react';
import Header from './../PatientComponents/DoctorsListHeader';
import {useState} from 'react';
import {TextField, Box, Button, Avatar} from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import axios from 'axios';

const sections = [
    { title: 'Add Blogs', url: '/AddBlogs'},
    { title: 'Chats', url: '#' },
    { title: 'Test', url: '/Test' },
    { title: 'Queries', url: '/Queries' }
  ];


function AddBlogs(){

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [imgAddress, setImgAddress] = useState('');

    function handleSubmit(){
        axios.post('http://127.0.0.1:8000/Add Blog/', {
            title: title,
            author: author,
            content: content,
            imgAddress: imgAddress,
        })
        .then((response) => {
            setTitle('');
            setAuthor('');
            setContent('');
            setImgAddress('');
        }, (error) => {
            console.log(error);
        });
    }

    return(
        <>
        <Header sections={sections} title='Add Blogs'/>
        <Box sx={{width:'400px', heigth:'600px', display:'flex', flexDirection:'column', margin:'auto', marginTop:'10px'}}>
            <Box sx={{width:'400px'}}>
                <RateReviewRoundedIcon  sx={{margin:'auto', fontSize:'50px', color:'primary.main'}}/>
            </Box>
            <TextField placeholder='Add Title' value={title} onChange={(e)=>{
                setTitle(e.target.value);
            }} sx={{marginTop:'20px'}} />
            <TextField placeholder='Add Author' value={author} onChange={(e)=>{
                setAuthor(e.target.value);
            }} sx={{marginTop:'20px'}}/>
            <TextField placeholder='Add Image Url' value={imgAddress} onChange={(e)=>{
                setImgAddress(e.target.value);
            }} sx={{marginTop:'20px'}}/>
            <TextField placeholder='Add Content' value={content} onChange={(e)=>{
                setContent(e.target.value);
            }} sx={{marginTop:'20px'}}/>
            <Box sx={{width:'400px'}}>
            <Button variant='contained' sx={{marginTop:'20px', width:'100px', float:'right'}} onClick={handleSubmit}>
                Submit
            </Button>
            </Box>
        </Box>
        </>
    );
}

export default AddBlogs;
