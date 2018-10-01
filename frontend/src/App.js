import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './component/stuff/Header';
import Footer from './component/stuff/Footer';
import Home from './component/Home';
import Resto from './component/Resto';
import Glogin from './component/Glogin';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';

class App extends Component {
 
  render() {
    return (
      <div className="App">
            <Header/>
            <br/><br/>
   
            <Route exact path ="/" component={Home}/>
            <Route path ="/resto" component={Resto}/>
            <Route path ="/glogin" component={Glogin}/>
            <Route path ="/signIn" component={SignIn}/>
            <Route path ="/signUp" component={SignUp}/>
            {/* <Route path ="/" component={RestoList}/>
            <Route path ="/" component={HowTo}/> */}
            <Footer/>
            
      </div>
    );
  }
}


export default App;
