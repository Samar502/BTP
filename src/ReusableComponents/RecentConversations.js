import { Typography, Box, Paper, Card, CardActionArea, CardContent } from '@mui/material';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import {useNavigate, Link} from "react-router-dom";
import * as React from 'react';

function RecentConversations(props){
    const {chats, user1} = props;
    const navigate =useNavigate();
    //var user3;

    {/*const user1 = 'subhajit.cjc@gmail.com';
    const chats = [
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'no'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'yes'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'no'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'no'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'yes'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'content': 'Aur bhai kya haalchaal',
            'time': '24th May 2022',
            'readStatus': 'yes'
        }

    ]*/}

    const arr = ['#42a5f5', '#ba68c8', '#ef5350', '#ff9800', '#4caf50'];

    /*function handleClick(){
        var to = '/Patient Chats/:'+user1+'/:'+user3;
        console.log(user3);
        navigate(to);
    }*/

    return(
        <Box sx={{height:'350px', width:'300px'}}>
            <Typography color='primary.main' variant='h6' align='center'>
                Recent Conversations
            </Typography>
            <Paper variant="elevation" elevation={2} sx={{ height:"260px", width:'260px', overflow:"auto", padding:"20px", backgroundColor:"#EEEEEE", paddingTop:'0px'}}>
            {
                chats.map((chat)=>{
                    var clr = arr[Math.floor(Math.random() * 5)];
                    var user3=chat.receiver;
                    var contentShort = chat.content.substring(0,12);
                    if(contentShort.length == 12)
                    contentShort+='...';

                    if(chat.sender!=user1)
                    user3=chat.sender;

                    var x = '/Patient Chats/:'+user1+'/:'+user3;
                    //console.log(user3);
                    const linkStyle = {textDecoration: 'none'};
                    return(
                        /*<Box onClick={()=>{
                            console.log(x);
                            navigate(x);
                        }}>*/
                        <Link to={x} style={linkStyle}>
                        <CardActionArea  key={chat.time}>
                        <Card sx={{ display: 'flex',  margin:'auto', marginTop:"20px", height:'60px', width:"250px" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Box sx={{display: 'flex', flexDirection: 'row', marginTop:'-10px'}}>
                                <Box sx={{display: 'flex', flexDirection:'column', flex:'3', alignItems:'left'}}>
                                    <Typography variant='subtitle1' align='left' sx={{color:clr, fontSize:'14px'}}>
                                        {user3}
                                    </Typography>
                                    <Typography variant='body2' align='left' sx={{color:'#696969', marginTop:'-5px', fontSize:'14px'}}>
                                        {contentShort}
                                    </Typography>
                                </Box>
                                <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'flex-end'}}>
                                    {chat.readStatus==='no' && <MarkChatUnreadOutlinedIcon color='primary.main'/>}
                                    {chat.readStatus==='yes' && <MarkChatReadOutlinedIcon color='primary.main'/>}
                                    <Typography sx={{color:'#696969', fontSize:'11px'}}>
                                        {chat.time.substring(0,10)}
                                    </Typography>
                                </Box>

                            </Box>
                        </CardContent>
                        </Card>
                        </CardActionArea>
                        </Link>
                        //</Box>
                    );
                })
            }
            </Paper>
        </Box>
    );
}

export default RecentConversations;