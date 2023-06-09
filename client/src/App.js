import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import useStyles from './styles';


const App = () => {
   const user =  JSON.parse(localStorage.getItem('profile'));


  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Switch>
        <Route path='/' exact component={() => < Redirect to="/posts" />}/>
        <Route path='/posts' exact component={Home}/>
        <Route path='/posts/search' exact component={Home}/>
        <Route path ='/auth' exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/>)}/> 
        {/* <Route path ='/auth' exact component={Auth}/> */}
      </Switch>
 
      
    </Container>
    </BrowserRouter>
  );
};

export default App;