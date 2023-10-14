import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './BlogsHeader';
import MainFeaturedPost from './BlogsMainFeaturedPost';
import FeaturedPost from './BlogsFeaturedPost';
import {useLocation} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Box, TextField, IconButton} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const sections = [
  { title: 'Doctor', url: '/Doctors List' },
  { title: 'Blogs', url: '/Blogs'},
  { title: 'Chats', url: '#' },
  { title: 'Queries', url: '/Queries' }
];

const mainFeaturedPost = {
  title: "Dianne's Story: I Was Strong, Cancer Made Me Stronger",
  description: "Diagnosed at age 51 with early-stage, hormone-receptor positive breast cancer, Dianne had lumpectomy, chemotherapy, then radiation.",
  image: 'https://img.freepik.com/premium-vector/satin-pink-ribbon-be-strong-hand-drawn-motivational-inscription-national-breast-cancer-awareness-month-concept_208509-694.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

// const featuredPosts = [
//   {
//     title: 'Signs and Symptoms',
//     date: 'Jan 24',
//     description:
//       'Although having regular screening tests for breast cancer is important. Mammograms do not find every breast cancer.',
//     image: 'https://www.verywellhealth.com/thmb/vxPloyTkczQ5KEb-4Ro50YDIZIo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/causes-and-signs-of-breast-cancer-in-women-of-all-ages-513575_V1-967d10c079164937a4498b0d0e68fa5a.png',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Breast Cancer Treatment',
//     date: 'Jan 25',
//     description: 'If you’ve been diagnosed with breast cancer, your cancer care team will discuss your treatment options with you. It’s important that you think carefully about each of your choices and weigh the benefits of each treatment option against the possible risks and side effects.',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6AR5qoEKCtsquXteSaNOQJ_Wt1CjBL8mug&usqp=CAU',
//     imageLabel: 'Image Text',
//   },
// ];

const theme = createTheme();

export default function Blog() {
  const location = useLocation();
  var user1 = location.state.user1;
  sections[2].url='/Patient Chats/:'+user1+'/:'+user1;

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Breast Cancer');
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTermUpdated, setsearchTermUpdated] = useState(false);

  useEffect(() => {
    var to = 'http://127.0.0.1:8000/Get Blogs/'+searchTerm;
    console.clear();
    const getData = async ()=>{
      setIsLoading(true);
      setFeaturedPosts([]);
        try{
            const response = await axios.get(to);
            setFeaturedPosts(response.data);
            console.log(response.data);
            setIsLoading(false);
        }catch(error){
            console.log('GetData Error:',error);
        }
        setIsLoading(false);
        isClicked(false);
    }
    getData() 
  }, [setsearchTermUpdated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} user1={user1}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginBottom:'20px' , marginTop:'0px' }}>
            <Button variant="contained" onClick={()=>{
              setIsClicked(true);
            }}> Sort By Relevance </Button>
            { isClicked && !isLoading &&
                <>
                <TextField placeholder='Your Location' value={searchTerm} onChange={(e)=>{
                    setSearchTerm(e.target.value);
                }}  sx={{marginLeft:'10px'}} />
                <IconButton onClick={()=>{
                  setIsClicked(false);
                   setsearchTermUpdated(!searchTerm);
                }}>
                    <ChangeCircleIcon sx={{fontSize:'35px'}}/>
                </IconButton>
                </>
            }
        </Box>

          { !isLoading && <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> }
        </main>
      </Container>
    </ThemeProvider>
  );
}