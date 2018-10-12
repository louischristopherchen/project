import React, {Component} from 'react';
import Slide from './stuff/Slide';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import queryString from 'query-string';
class Home extends Component{
    state={listResto:[],search:""}

    componentWillMount(){
        
        let params = queryString.parse(this.props.location.search);
        console.log(params.temp);
        
        if(params.temp===""||params.temp===undefined)//kosong
        {
            this.doGet();
           
        }
        else{
            
       this.setState({listResto:[]});
        }
    }
    componentWillReceiveProps(){
        var params = queryString.parse(this.props.location.search)
        console.log(params.temp);
        if(params.temp===""||params.temp===undefined)//kosong
        {
            this.doGet();
          
        }
        else{
            
       this.setState({listResto:[]});
        }
    }
    doGet()
    {
        axios.get(API_URL+"/listResto")
        .then(scs=>{
            // console.log(scs.data);
        this.setState({listResto:scs.data});
       
        })
        .catch((err) => {
            alert('Error!');
            console.log(err);
        })
    }
    
    // doSearch()
    // {
    //     axios.get(API_URL+"/searchResto")
    //     .then(scs=>{
    //         // console.log(scs.data);
    //     this.setState({listResto:scs.data});
       
    //     })
    //     .catch((err) => {
    //         alert('Error!');
    //         console.log(err);
    //     })
    // }
  
    renderResto=()=>
    {
        return this.state.listResto.map((temp,index)=>
            <div key={index} className="playout">
        <img className="gbulat" src={temp.imgUrl} alt={temp.nama}/>
        <p/>{temp.nama}
        <p/>kota:{temp.kota}
        </div>
        );
    }
    render(){
        
        return(
            <div>
                <div className="container-fluid bgMaroonWhite">
                
                {this.renderResto()}
                </div>
                <div className="container-fluid bgBlackGold">
                <h1 >HOW TO USE/FITUR</h1>
                <Slide></Slide>

                </div>
             
            </div>
         

                 );
    }
}

export default Home;