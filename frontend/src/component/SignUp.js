import React, {Component} from 'react';
import image1 from '../support/img/webComponent/resto.jpg';
class SignUp extends Component
{
    render(){
        return <div className="container-fluid form-center" style={{backgroundImage: `url(${image1})`}}>
        <div className="col-xs-12 col-md-6"></div>
        
        <div className="col-xs-12 col-md-6">
        <div className="formSignUp">
        
        
        <h1>SignUp</h1>
        <table align="center">
        <tbody>
            <tr>
                <td style={{paddingRight:"10px"}}><h3><b>username</b></h3> </td>
                <td><input type="text" className="form-control"/></td>
            </tr>
            <tr>
                <td style={{paddingRight:"10px"}}><h3><b>password</b></h3></td>
                <td><input type="password" className="form-control"/></td>
            </tr>
            <tr><td colSpan="2"><br/><input type="button" value="LOGIN" className="tombol"/></td></tr>
        </tbody>
        </table>
        </div>
        </div>
        
        </div>
    }
}
export default SignUp;