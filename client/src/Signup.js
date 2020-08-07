import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './UserContext';
import Axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// function Signup() {

//     const history = useHistory();
//     const { userData, setUserData } = useContext(UserContext);

//     useEffect(()=> {

//         if (userData.token_state) history.push('/');

//     },[userData]);

   
    

//     const submit = async (e) => {
//         e.preventDefault();
//         const newUser = {username, email, password}
//         setIsDisable(true)
//         const signupUser = await Axios.post('http://localhost:5000/accounts/signup',newUser);
//         const signupSuccessful = signupUser.data._id;

//         setIsDisable(false)
//         if (!signupSuccessful) return console.log(signupUser.data);

//         console.log('Signed Up!')
//     }

//     return (
//         <div>
//             <h1>Sign Up:</h1>
//             <form onSubmit={submit}>
//                 Username: <input onChange={e => setUsername(e.target.value)} />
//                 Email: <input onChange={e => setEmail(e.target.value)} />
//                 Password: <input type='password' onChange={e => setPassword(e.target.value)} />
//                 <button disabled={isDisable}>Sign Up!</button>
//             </form>
//         </div>
//     )
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    
    const classes = useStyles();

    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {firstname, lastname, email, password}
    
        const signupUser = await Axios.post('http://localhost:5000/accounts/signup',newUser);
        const signupSuccessful = signupUser.data._id;
        
        
        if (!signupSuccessful) return console.log(signupUser.data);
        
        console.log('Signed Up!')
     }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={ submit }>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange = { e => {setFirstname(e.target.value)} }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange = { e => {setLastname(e.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = { e => {setEmail(e.target.value)} }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = { e => {setPassword(e.target.value)} }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}
