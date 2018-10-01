import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
class Resto extends Component{
    state={listResto:[]}
    componentWillMount(){
        this.doGet();    
    }
    doGet()
    {
        axios.get(API_URL+"/listResto")
        .then(scs=>{
            // console.log(scs.data);
        this.setState({listResto:scs.data});
       
        });
    }
  
        renderPage=()=>
        {
            return this.state.listResto.map((temp,index)=>
                <div key={index} className="playout">
            <img className="gbulat" src={temp.imgUrl} alt={temp.nama}/>
            <p/>{temp.nama}
            <p/>kota:{temp.kota}
            </div>
            );
        }
      
    render()
    {
        
        return ( <div className="container-fluid bgMaroonWhite">
        <h1>    Restaurant List</h1>
        {this.renderPage()}
        </div>);
    }
}
export default Resto;