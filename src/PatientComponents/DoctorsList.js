import * as React from 'react';
import {Button, Box, TextField, IconButton} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './DoctorsListHeader';
import MainFeaturedPost from './DoctorsListMainFeaturedPost';
import FeaturedPost from './DoctorsListFeaturedPost';
import axios from 'axios'
import {useLocation} from "react-router-dom"; 
import SortByLocation from './../ReusableComponents/SortByLocation';
import {useState, useEffect} from 'react';
import {forwardRef, useImperativeHandle} from 'react';

const sections = [
  { title: 'Doctor', url: '/Doctors List' },
  { title: 'Blogs', url: '/Blogs'},
  { title: 'Chats', url: '#' },
  { title: 'Test', url: '#' },
  { title: 'History', url: '#' },
  { title: 'Queries', url: '/Queries' }
];

const mainFeaturedPost = {
  description: "The presence of the Doctor is the beginning of the cure",
  image: 'https://png.pngtree.com/background/20210710/original/pngtree-medical-doctor-science-background-picture-image_968711.jpg',
  imageText: 'main image description',
};

  //console.clear();
  /*var featuredPosts=[
    {
        firstName: "Dr Ram",
        lastName: "Babu",
        employment: "AIIMS Delhi",
        email: "subhajit.cjc@gmail.com"
    },
    {
        firstName: "Dr Ram",
        lastName: "Babu",
        employment: "AIIMS Delhi",
        email: "subhajit.cjc@gmail.com"
    },
    {
        firstName: "Dr Ram",
        lastName: "Babu",
        employment: "AIIMS Delhi",
        email: "subhajit.cjc@gmail.com"
    },
    {
        firstName: "Dr Ram",
        lastName: "Babu",
        employment: "AIIMS Delhi",
        email: "subhajit.cjc@gmail.com"
    }
  ]*/


const theme = createTheme();

const DoctorsList = forwardRef((props,ref) => {

  const [isLoading, setIsLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [userLocation, setUserLocation] = useState('Delhi');
  

  const handleClick = ()=>{
      setIsClicked(true);
  }

  const location=useLocation();
  var user1=location.state.user1;
  console.log(user1);

  useEffect(()=>{
   axios.get('http://127.0.0.1:8000/DoctorsList/')
   .then(function (response) {
    setFeaturedPosts(response.data);
    setIsLoading(false);
    console.log(featuredPosts);
  })
  },[]);

   function handleSubmit(){
    console.log("inside");
    setIsLoading(true);
    var to='http://127.0.0.1:8000/Sorted Doctors List/'+userLocation;
    axios.get(to)
    .then(function (response) {
      setFeaturedPosts(response.data);
      setIsLoading(false);
      setIsClicked(false);
      setUserLocation('Delhi');
      console.log(featuredPosts);
    })
  }
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Doctors" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginBottom:'20px' , marginTop:'0px' }}>
            <Button variant="contained" onClick={handleClick}> Sort by location </Button>
            { isClicked && !isLoading &&
                <>
                <TextField placeholder='Your Location' value={userLocation} onChange={(e)=>{
                    setUserLocation(e.target.value);
                }}  sx={{marginLeft:'10px'}} />
                <IconButton onClick={()=>{
                    handleSubmit();
                }}>
                    <ChangeCircleIcon sx={{fontSize:'35px'}}/>
                </IconButton>
                </>
            }
        </Box>
          { !isLoading &&
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.email} post={post} user1={user1} />
            ))}
          </Grid> }
        </main>
      </Container>
    </ThemeProvider>
  );
});

export default DoctorsList;