import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';


class Glogin extends Component{

  
responseGoogle = (response) => {
    console.log(response);
  }
  logout = () => {
    console.log("succes");
  }
    

    render(){
        return(
       <div>
           <GoogleLogin
               clientId="772339808872-bc6fimh3sitemm75kh2g24ol5a19tjek.apps.googleusercontent.com"
               buttonText="Login"
               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
             />
         
         <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={this.logout}
    >
    </GoogleLogout>
       </div> 
         
          )
    }
}

export default Glogin;