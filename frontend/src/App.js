import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,withRouter} from 'react-router-dom';
import {cekLogin,cookieChecked} from './action/index';
import Cookies from 'universal-cookie';
import './App.css';
import Header from './component/stuff/Header';
import Footer from './component/stuff/Footer';
import Home from './component/Home';
import Glogin from './component/Glogin';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Resto from './component/Resto';
const cookies = new Cookies();
class App extends Component {
  componentWillMount() {
    const cookie = cookies.get("userCookie");
    if(cookie !== undefined) {
        this.props.cekLogin(cookie);
    }
    else {
        this.props.cookieChecked();
    }
}
componentWillReceiveProps(cookie) {
  if(cookie.user.username === "") {
      cookies.remove("userCookie");
      
  }
  
}
  render() {
    
    return (
      <div className="App">
            <Header/>
            <br/><br/>
   
            <Route exact path ="/" component={Home}/>
            <Route path ="/home" component={Home}/>
            <Route path ="/glogin" component={Glogin}/>
            <Route path ="/signIn" component={SignIn}/>
            <Route path ="/signUp" component={SignUp}/>
            <Route path ="/resto/:id" component={Resto}/>
            <Footer/>
            
      </div>
    );
  }
}

const mapStateToProps =(state)=>{
  const user= state.cekLogin;
  return{user};
}
export default withRouter(connect(mapStateToProps,{cekLogin,cookieChecked})(App));
