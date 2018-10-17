import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import image1 from '../support/img/webComponent/resto2.jpg';
import {doLogin} from '../action/index';
const cookies = new Cookies();
class SignIn extends Component
{
    componentWillReceiveProps(cookie)
    {
        if(cookie.user.username!=="")
        {            
            cookies.set("userCookie", cookie.user.userID,{path:"/"})
        }
    }
    onLogin=()=>{
       var username= this.refs.username.value;
       var password=this.refs.password.value;
        // console.log(`${username}${password}`);
        this.props.doLogin({username,password});
    }
    render(){
      
        // console.log(this.props.user.error);
        if(this.props.user.role!=="")
        {
            return <Redirect to="/" />;
        }
        return <div className="container-fluid form-center-maroon" style={{backgroundImage: `url(${image1})`}}>
        <div className="col-xs-12 col-md-6"></div>     
        <div className="col-xs-12 col-md-6">
        <div className="formSignIn">
        <h1>SignIn</h1>
        <table align="center">
        <tbody>
            <tr>
                <td style={{paddingRight:"10px"}}><h3><b>username</b></h3> </td>
                <td><input ref="username" type="text" className="form-control"/></td>
            </tr>
            <tr>
                <td style={{paddingRight:"10px"}}><h3><b>password</b></h3></td>
                <td><input ref="password" type="password" className="form-control"/></td>
            </tr>
            <tr><td colSpan="2">
            {this.props.user.error}
            <br/><input type="button" value="LOGIN" className="tombol" onClick={this.onLogin}/>
            </td></tr>
        </tbody>
        </table>

        </div>

        </div>
        
        </div>
    }
}
const mapStateToProps =(state)=>{
    const user= state.cekLogin;
    return{user};
}
export default connect(mapStateToProps,{doLogin})(SignIn);