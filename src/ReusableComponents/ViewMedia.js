import { Typography, Box, Paper, Card, CardActionArea, CardContent } from '@mui/material';
import * as React from 'react';

function ViewMedia(props){
    const {files} = props;
    /*const files = [
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022',
            'file': 'media/EAOfferLetterIndia_81d068I.pdf'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022',
            'file': 'media/EAOfferLetterIndia_81d068I.pdf'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022',
            'file': 'media/EAOfferLetterIndia_81d068I.pdf'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022',
            'file': 'media/EAOfferLetterIndia_81d068I.pdf'
        },
        {
            'sender': 'subhajit.cjc@gmail.com',
            'receiver': 'devi.sethi@gmail.com',
            'title': 'Report',
            'time': '24th May 2022',
            'file': 'media/EAOfferLetterIndia_81d068I.pdf'
        }

    ]*/

    const arr = ['#42a5f5', '#ba68c8', '#ef5350', '#ff9800', '#4caf50'];

    return(
        <Box sx={{height:'350px', width:'300px'}}>
            <Typography color='primary.main' variant='h6' align='center'>
                View Media
            </Typography>
            <Paper variant="elevation" elevation={2} sx={{ height:"260px", width:'260px', overflow:"auto", padding:"20px", backgroundColor:"#EEEEEE", paddingTop:'0px'}}>
            {
                files.map((file)=>{
                    var clr = arr[Math.floor(Math.random() * 5)];
                    var x = 'http://127.0.0.1:8000/'+file.file;
                    console.log(x);
                    return(
                        <CardActionArea  key={file.time} href={x}>
                        <Card sx={{ display: 'flex',  margin:'auto', marginTop:"20px", height:'60px', width:"250px" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Box sx={{display: 'flex', flexDirection: 'column', marginTop:'-15px'}}>
                                <Typography variant='subtitle2' align='left' sx={{color:clr}}>
                                    {file.title}
                                </Typography>
                                <Box sx={{display: 'flex', flexDirection: 'row', marginTop:'0px'}}>
                                <Typography variant='body2' component='span' sx={{color:'#696969', fontSize:'14px'}}>
                                    Sender -
                                </Typography>
                                <Typography variant='body2' component='span' sx={{marginLeft: '5px'}}>
                                    {file.sender}
                                </Typography>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', marginTop:'-3px', alignItems: 'flex-end'}}>
                                <Typography variant='body2' component='span' sx={{color:'#696969', fontSize:'12px'}}>
                                    On -
                                </Typography>
                                <Typography variant='body2' component='span' sx={{color:'#696969', fontSize:'13px', marginLeft: '5px'}}>
                                    {file.time.substring(0,10)}
                                </Typography>
                                </Box>

                            </Box>
                        </CardContent>
                        </Card>
                        </CardActionArea>
                    );
                })
            }
            </Paper>
        </Box>
    );
}

export default ViewMedia;