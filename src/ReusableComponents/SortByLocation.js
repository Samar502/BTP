//import * as React from 'react';
import {Button, Box, TextField, IconButton} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useState } from "react";
import DoctorsList from './../PatientComponents/DoctorsList';
import React, {useRef} from 'react';

function SortByLocation(){

    const [isClicked, setIsClicked] = useState(false);
    const [userLocation, setUserLocation] = useState('');
    const doctorsListRef = useRef(null);
    const doctorsList = <DoctorsList ref={doctorsListRef} />;

    const handleClick = ()=>{
        setIsClicked(true);
    }


    return(
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginBottom:'20px' , marginTop:'5px' }}>
            <Button variant="contained" onClick={handleClick}> Sort by location </Button>
            { isClicked &&
                <>
                <TextField placeholder='Your Location' value={userLocation} onChange={(e)=>{
                    setUserLocation(e.target.value);
                }}  sx={{marginLeft:'10px'}} />
                <IconButton onClick={()=>{
                    doctorsListRef.current.handleSubmit(userLocation);
                }}>
                    <ChangeCircleIcon sx={{fontSize:'35px'}}/>
                </IconButton>
                </>
            }
        </Box>
    );
}

export default SortByLocation;