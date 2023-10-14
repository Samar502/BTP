import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import {useState} from 'react';
import axios from 'axios';

const theme = createTheme();

export default function SignIn() {
  const navigate=useNavigate();
  const [identity, setIdentity] = useState('patient');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var user = data.get('email');
    var to = '/Doctor Chats/:' + user +'/:' + user;

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
    axios.post('http://127.0.0.1:8000/SignIn/', {
            email: data.get('email'),
            identity: identity,
            password: data.get('password')
        })
        .then((response) => {
            console.clear();
            const x = response.data;
            if(x.msg == 1){
              if(identity == 'patient')
                navigate('/Blogs',{
                  state: {
                    user1: data.get('email')
                  }
                });
              else
                navigate(to,{
                  state: {
                    user1: data.get('email') 
                  }
                })

            }
        }, (error) => {
            console.log(error);
        });

  };

  const handleChange = (event) =>{
    setIdentity(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={identity}
              label="Identity"
              onChange={handleChange}
              fullWidth
              >
                <MenuItem value={'patient'}>Patient</MenuItem>
                <MenuItem value={'doctor'}>Doctor</MenuItem>
            </Select>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}