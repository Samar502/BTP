import * as React from 'react';
import Header from './../PatientComponents/DoctorsListHeader';
import {useState} from 'react';
import {TextField, Box, Button, Avatar, Input, IconButton, Typography, ImageListItem} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import MainFeaturedPost from './../PatientComponents/DoctorsListMainFeaturedPost';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const sections = [
    { title: 'Add Blogs', url: '/AddBlogs'},
    { title: 'Chats', url: '#' },
    { title: 'Test', url: '/Test' },
    { title: 'Queries', url: '/Queries' }
  ];

  const mainFeaturedPost = {
    description: "Upload a scanned image and get it's masking and classification done. ",
    image: 'https://i.ytimg.com/vi/o5E2zDaUiQ8/maxresdefault.jpg',
    imageText: 'main image description',
  };


function Test(){

        const [file, setFile] = useState('');
        const [maskingAvailable, setMaskingAvailable] = useState(false);
        const [imgAddress, setImgAddress] = useState('');
        const [category, setCategory] = useState('');

        function handleUpload(){
            console.clear();
            const formData = new FormData();
            formData.append('file',file);
            console.log(formData);
            axios.post('http://127.0.0.1:8000/Masking/',
                formData
            )
            .then((response) => {
                setMaskingAvailable(true);
                setImgAddress(response.data.path);
                setCategory(response.data.category);
                console.log(response);
            }, (error) => {
                //console.log('New File Upload error');
                console.log(error);
            }) 
        }

        return(
            <>
                <Header sections={sections} title='Test'/>
                <MainFeaturedPost post={mainFeaturedPost} />
                <OutlinedInput type='file' color='primary' onChange={(e)=>{
                    setFile(e.target.files[0]);
                }}/>
                <IconButton onClick={handleUpload}>
                    <FileUploadIcon color='primary' sx={{fontSize:'40px'}}/>
                </IconButton>
                {
                    maskingAvailable && 
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Typography component='h6' variant='h6' align='center' sx={{marginTop:'20px'}}> Masked Image - </Typography> 
                        <img src={imgAddress+'.png'} style={{width:'250px', height:'250px', margin:'auto'}}/>
                        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'10px'}}>
                        <Typography component='span' variant='h6' align='center' sx={{marginTop:'0px'}}> Predicted Category - </Typography>
                        <Typography component='span' variant='h6' align='center' sx={{marginTop:'0px', marginLeft:'10px'}}> {category} </Typography> 
                        </Box>
                    </Box>
                }
            </>
        );
}

export default Test; 
