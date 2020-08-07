import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserContext from './UserContext';
import Axios from 'axios';

import './App.css';
import Nav from './Nav.js';
import Login from './Login.js';
import Signup from './Signup';
import Feed from './Feed';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    token_state: null,
    user: undefined,
    user_id: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {

      let token = localStorage.getItem("auth-token");
      
      if (token === null) {
        localStorage.setItem('auth-token', "");
        token = "";
      }

      const tokenRespond = await Axios.post('http://localhost:5000/validToken', null, 
      {headers:{"auth-token": token}} 
      );

      if (!tokenRespond.data) return false;

      const userProfile = await Axios.get('http://localhost:5000/user/profile', {
        headers: { 'auth-token': token }
      });

      const fullname = `${userProfile.data.firstname} ${userProfile.data.lastname}`
      
      const newData = {
        token: token,
        token_state: tokenRespond.data,
        user: fullname,
        user_id: userProfile.data._id
     }

     if (userData.token != newData.token ) setUserData(newData);
    
  };
    checkLoggedIn();
  }, [userData]);

  const feedRoute = (<Route path='/' exact component={Feed}/> );
  const loginSingupRoute = (
    <>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
    </>
  )

  return (
    <div className="app">
    <Router>
      <UserContext.Provider value={{userData, setUserData}}>
      <div className='app__nav' ><Nav /></div>
        <Switch >
          <div className='app__main'>
            {(userData.token_state) ? feedRoute : loginSingupRoute }
          </div>
        </Switch>
      </UserContext.Provider>
    </Router>

    </div>
  );
}

export default App;