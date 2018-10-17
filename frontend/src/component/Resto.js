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
        const cookie = cookies.get("userCookie");
        if(cookie !== undefined) {
            this.props.cekLogin(cookie);
        }
        else {
            this.props.cookieChecked();
        }
    }
    // componentDidUpdate(){
    //     if(this.props.user.role==="")
    //     {
    //         return <Redirect to="/signIn" />;
    //     }
        
    // }
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
        console.log(this.props.user.cookieCheck)
        console.log(this.props.user)
        if(this.props.user.cookieCheck){
            if(this.props.user.role==="admin")
        {
            return(
                <div>
                    <div className="container-fluid bgMaroonWhite form-fit">
                        
                    </div>
                </div>
                );
        }
        else if(this.props.user.role==="customer")
        {
            return(
                <div>
                    <div className="container-fluid bgMaroonWhite form-fit">
                        
                    </div>
                </div>
                );
        }
        else if(this.props.user.role==="resto")
        {
            return(
                <div>
                    <div className="container-fluid bgMaroonWhite form-fit">
                        
                    </div>
                </div>
                );
        }
        else
        {
            return <Redirect to="/signIn" />;
        }
        
        }
        
         return <div></div>;
        
       
        
    }
}
const mapStateToProps =(state)=>{
    const user= state.cekLogin;
    return{user};
  }
export default connect(mapStateToProps,{cekLogin,cookieChecked})(Resto);