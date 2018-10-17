import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
class Temp extends Component{
    state={}

    componentWillMount(){

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
        return <Redirect to="/SignIn" />;
    }
}
const mapStateToProps =(state)=>{
    const user= state.cekLogin;
    return{user};
  }
export default connect(mapStateToProps)(Temp);