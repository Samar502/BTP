import * as React from 'react';
import { Typography, Box, Grid, Paper, Card, CardActionArea, CardContent, TextField, IconButton } from '@mui/material';
import {useState, useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Header from './../PatientComponents/BlogsHeader';
import ViewMedia from './../ReusableComponents/ViewMedia';
import RecentConversations from './../ReusableComponents/RecentConversations';
import axios from 'axios';
import io from 'socket.io-client'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { OutlinedInput } from '@mui/material';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const socket = io.connect("http://localhost:3001/");

const sections = [
    { title: 'Add Blogs', url: '/AddBlogs'},
    { title: 'Chats', url: '#' },
    { title: 'Test', url: '/Test' },
    { title: 'Queries', url: '/Queries' }
  ];

 


export default function PatientChat(){
    
    var flag=0, user1="", user2="",c=0, prevDir1='left';
    const [newMsg, setNewMsg] = useState('');
    const [newFileTitle, setNewFileTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState('');
    const [media, setMedia] = useState([]);
    const [recent, setRecent] = useState([]);

    var chatSocket;

    var cur = window.location.href;

    const handleReceiveMessage = (data) => {
        //console.log('Message Received:', data);
        setPosts((prevPosts)=>[...prevPosts, data]);
    }

    for(var i=0;i<cur.length;i++){
        if(cur[i]=='#')
        break;
        if(cur[i]=='/'){
            c++;
            continue;
        }
        else if(cur[i]==':')
            continue;
        else if(c==4)
            user1+=cur[i];
        else if(c==5)
            user2+=cur[i];
    }

    const room = user1+user2;
    var x = 'http://127.0.0.1:8000/Chat/'+user1+'/'+user2;
    var y = 'http://127.0.0.1:8000/LoadMedia/'+user1+'/'+user2;
    var z = 'http://127.0.0.1:8000/RecentChats/'+user1;

    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get(x);
                const res2 = await axios.get(y);
                const res3 = await axios.get(z);
                setMedia(res2.data);
                setRecent(res3.data);
                console.log(res3.data);
                setPosts(response.data);
                setIsLoading(false);
            }catch(error){
                console.log('GetData Error:',error);
            }
        }
        getData()
        socket.emit("join_room", room);
        socket.on("receive_message", handleReceiveMessage)  

        return () => {
            //console.log('PatientChat component unmounted');
            socket.off("receive_message", handleReceiveMessage)
            // TODO: leave the room by emitting the <leaveRoom> event
        }
      }, []);

      

      const handleSubmit =()=>{
        //console.log('Sending Socket Message');
        socket.emit("send_message",{
            message: {
            sender: user1,
            receiver: user2,
            content: newMsg,
            readStatus: 'no',
        },
        room: room });
        // console.log("Inside");

        setPosts((posts)=>[...posts,{
            sender: user1,
            receiver: user2,
            content: newMsg,
            readStatus: 'no',
        }]);

        //console.log('Sending post message');
        axios.post('http://127.0.0.1:8000/createNewMsg/', {
            sender: user1,
            receiver: user2,
            content: newMsg,
            readStatus: 'no',
        })
        .then((response) => {
            setNewMsg('');
           // console.log('New Post message done');
        }, (error) => {
            //console.log('New Post message error');
            //console.log(error);
        });

      };

      const handleUpload= ()=>{
        const formData = new FormData();
        formData.append('sender',user1);
        formData.append('receiver',user2);
        formData.append('title', newFileTitle);
        formData.append('file',file);
        console.log(formData);
        axios.post('http://127.0.0.1:8000/posts/',
            formData
        )
        .then((response) => {
            setIsUploading(false);
            setNewFileTitle('');
            window.location.reload();
            //console.log('New File Uploaded');
        }, (error) => {
            //console.log('New File Upload error');
            console.log(error);
        })
      }

      const mediaStyle = {marginTop:'-35px'}
      const recentStyle = {marginTop:'-10px'}
    return (
        <>{ !isLoading &&
        <>
        <Header title="Chats" sections={sections}/>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <Box sx={{display:'flex', flexDirection: 'column'}}>
            <Box style={recentStyle}>
            <RecentConversations chats={recent} user1={user1} />
            </Box>
            <Box style={mediaStyle}>
            <ViewMedia files={media} />
            </Box>
        </Box>
        <Box sx={{flex:'4'}}>
        <Box sx={{
            margin: 'auto',
            marginTop: '2%'
        }}>
        
        <Box 
        sx={{height:"420px",
        width:"60%",
        margin: 'auto'
        }}
        >
            <Paper variant="elevation" elevation={4} sx={{ height:"400px", overflow:"auto", padding:"20px", backgroundColor:"#EEEEEE"}}>
            <Grid>
            {
            posts.map((post) => {
            flag++;
            var dir1='right',dir2=prevDir1;
            if(post.sender !== user1){
                dir1='left';
            }
            prevDir1=dir1;

            return(
            <>
            <CardActionArea component="a" href="#"  key={post.content}>
                <Card sx={{ display: 'flex', marginTop:"20px", width:"50%", float:dir1, clear:dir2 }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h6" variant="h6" sx={{
                        align:'left'
                    }}>
                    {post.sender}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                    {post.content}
                    </Typography>
                </CardContent>
                </Card>
            </CardActionArea>
            </>
            );})}
            </Grid>
                </Paper>
        </Box>
        </Box>
        <Box>
            {!isUploading && <Box>
                <TextField  onChange={(e)=>{
                    //console.log('Message Content:', e.target.value);
                    setNewMsg(e.target.value)
                }} value={newMsg} variant="outlined" size="medium" placeholder="Say Something..."sx={{ width:"50%", marginTop:"30px"}} />
                <IconButton onClick={handleSubmit} sx={{
                    marginTop:'30px'
                }}>
                <SendIcon color="primary" sx={{fontSize:"40px"}}/>
                </IconButton>
                <IconButton sx={{marginTop: '30px'}} onClick={()=>{
                        //console.log("Inside callback function");
                        setIsUploading(true);
                }}>
                    <UploadFileOutlinedIcon color="primary" sx={{fontSize: "40px"}} />
                </IconButton>
            </Box>}
            {isUploading && <Box sx={{marginTop:'-55px', opacity:'0.9'}}>
                <Paper variant='elevation' elevation={4} sx={{height: '200px', width: '600px', margin: 'auto', marginTop:'30px'}}>
                    <OutlinedInput type='file' sx={{marginTop: '30px'}} onChange={(e)=>{
                        setFile(e.target.files[0]);
                    }} /> <br/>
                    <TextField  onChange={(e)=>{
                    setNewFileTitle(e.target.value)
                    }} value={newFileTitle} variant="outlined" size="medium" placeholder="Add Short Description"sx={{marginTop:"30px"}} />
                    <IconButton sx={{marginTop: '30px'}} onClick={handleUpload}>
                        <IosShareOutlinedIcon color="primary" sx={{fontSize: "40px"}}/>
                    </IconButton>
                </Paper>
            </Box>}
        </Box>
                </Box>
        </Box>
                </>}
        </>
    );
}