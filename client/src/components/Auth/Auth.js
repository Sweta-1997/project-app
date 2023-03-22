import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import Input from './Input';
// import GoogleAuth from './GoogleAuth';
// import { gapi } from 'gapi-script';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false); 
    const [isSignUp, setIsSignUp] = useState(false); 
    const [formData, setFormData] = useState(initialState);

    const clientId = '618549829321-eeckcfo2fii7j8k4r5sg7asq035ve3kd.apps.googleusercontent.com';

    const dispatch = useDispatch();
    const history = useHistory();

    // useEffect(() => {
    //     function start(){
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ""
    //         })
    //     };
    //     gapi.load('client:auth2', start)
    // });
    // const isSignUp = false;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            dispatch(signup(formData, history));
        }else {
            dispatch(signin(formData, history));

        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log('Google login attempt...')
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign IN was unsuccessful. Try again later!');
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{ isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} fullWidth type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? 'text' : 'password' }  handleShowPassword={handleShowPassword}/>
                    { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        { isSignUp ? 'Sign Up' : 'Sign In' }    
                    </Button>
                    {/* Google Auth 2.0 alternate way */}
                   {/* <GoogleAuth /> */}
                    {/* <GoogleLogin 
                        clientId={clientId}
                        plugin-name="Memories App"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant="contained">
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                        prompt='consent'
                    /> */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button type="submit" className= {classes.label} onClick={switchMode}>
                               { isSignUp ? 'Already have an account ? Sign In' : "Don't have and account ? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>              
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;