import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Header from './BlogsHeader';
import {Paper, TextField, Box, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import 'animate.css';

const sections = [
  { title: 'Doctor', url: '/Doctors List' },
  { title: 'Blogs', url: '/Blogs'},
  { title: 'Chats', url: '#' },
  { title: 'Queries', url: '/Queries' }
];

const cards = [1];

function Query() {
  const [query, setQuery] = useState('');
  const [html, setHTML] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('user_input', query);
    console.log(query)
    setIsFetching(true);
    axios.post('http://127.0.0.1:8000/Queries/', 
            data,
            {headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response.data);
            setIsFetching(false);
            setHTML(response.data['bot_response'])
        }, (error) => {
            console.log(error);
        });
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const myStyle = {
    color: "black",
    padding: "100px",
    fontFamily: "Sans-Serif"
  };

  return (
    <div>
        <Header title="Queries" sections={sections}/>
        <Paper variant="elevation" elevation={4} sx={{ height:"400px", width:"600px", overflow:"auto", padding:"20px", margin:'auto', marginTop:'50px', backgroundColor:"#EEEEEE", fontSize:'24px', textAlign:'left'}}>
            { isFetching &&
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <RefreshIcon className='animate__animated animate__rotateOut animate__infinite'/>
            </Box>
            <h3 class="animate__animated animate__flash animate__slower animate__infinite">Loading</h3>
            </Box>}
            {!isFetching &&
            <article>{html}</article>}
        </Paper>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <TextField placeholder='Say Something...' value={query} onChange={(e)=>{
                handleChange(e);
            }} sx={{width:'400px', marginTop:'20px'}}/>
            <IconButton onClick={handleSubmit}>
                <SendIcon sx={{fontSize:'50px', marginTop:'15px', color:'#2196f3'}}/>
            </IconButton>
        </Box>
    </div>
  );
}

export default Query;