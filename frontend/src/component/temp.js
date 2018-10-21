import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {cekLogin,cookieChecked} from '../action/index';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Resto extends Component{
    state={}

    componentWillMount() {
        if(this.props.match.params.id!=="")
        {
            const cookie = cookies.get("userCookie");
        if(cookie !== undefined) {
            this.props.cekLogin(cookie);
        }
        else {
            this.props.cookieChecked();
        }
        }
        else
        {
            return <Redirect to="/" />;
        }
        
    }

    doGet()
    {
        axios.get(API_URL+"/listResto")
        .then(scs=>{
            // console.log(scs.data);
        this.setState({listResto:scs.data});
       
        })
        .catch((res) => {
            alert('Error!');
            console.log(res);
        })
    }
  
    renderResto=()=>
    {
       
    }
    render(){
        // console.log(this.props.user.cookieCheck)
        // console.log(this.props.user)
        console.log(this.props.match.params.id);
        if(this.props.user.cookieCheck){
            if(this.props.user.role==="admin")
        {
            return(
   
                    <div className="container-fluid bgMaroonWhite form-center">
                        
                    </div>
            
                );
        }
        else if(this.props.user.role==="customer")
        {
            return(
                
                    <div className="container-fluid bgMaroonWhite form-center">
                        test
                    </div>
           
                );
        }
        else if(this.props.user.role==="resto")
        {
            return(
 
                    <div className="container-fluid bgMaroonWhite form-center">
                        
                    </div>

                );
        }
        else
        {
            return <Redirect to="/signIn" />;
        }
        
        }
        
         return <div>WAIT<p/>WAIT<p/>WAIT<p/>WAIT<p/></div>;
        
       
        
    }
}
const mapStateToProps =(state)=>{
    const user= state.cekLogin;
    return{user};
  }
export default connect(mapStateToProps,{cekLogin,cookieChecked})(Resto);