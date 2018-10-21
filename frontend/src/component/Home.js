import React, {Component} from 'react';
// import Slide from './stuff/Slide';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import queryString from 'query-string';
import {connect} from 'react-redux';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {renderBintang} from './stuff/Rating';
class Home extends Component{
    state={listResto:[],search:""}

    componentWillMount(){
        
        let params = queryString.parse(this.props.location.search);
        // console.log(this.props);
        
        if(params.temp===""||params.temp===undefined)//kosong
        {
            this.doGet();
        }
        else{
            
            this.doSearch(params.temp);
        }
    }
   componentWillReceiveProps(x){
        // console.log(queryString.parse(x.location.search).temp);
        var a= queryString.parse(x.location.search).temp;
        if(a==="")//kosong
        {
            this.doGet();
        }
        else
        {
        this.doSearch(a);
        }
    }

    doSearch(a)
    {
        axios.get(API_URL+"/listResto",{
            params:{
                search:a
            }
        }).then(scs=>{
            // console.log(scs.data);
        this.setState({listResto:scs.data});
       
        }).catch((err) => {
            
            console.log(err);
        })
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
    toBook(id){
        // console.log(id);
        this.props.history.push(`/resto/${id}`); 
    }


    renderResto=()=>
    {
        if(this.state.listResto.length===0)
        {
            return <div className="form-center"><h1 style={{  color:"white"}}>NOT FOUND</h1></div>
        }
        return ( this.state.listResto.map((temp,index)=>
     
            <div key={index} className="playout">
        <img className="gbulat" src={temp.imgUrl} alt={temp.nama}/>
        <table style={{margin:"auto"}}>
            <tr>
                <td colSpan="3">{temp.nama}</td>
            </tr>
            <tr style={{textAlign:"center"}}>
            
                <td>{temp.kota}</td>
            </tr>
            <tr style={{textAlign:"center"}}>
          
                <td>{renderBintang(temp.rating)}</td>
            </tr>
        
        </table>
        <div className="overlay">
                <div className="text-overlay"><input type="button" value="book" className="tombol-overlay" onClick={()=>this.toBook(temp.restoID)}/></div>
                </div>
        </div>
        
        ));
    }
    render(){
        // console.log(this.props.user.role);
        console.log(this.props.user)
        if(this.props.user.role==="admin")
        {
            return(

                    <div className="container-fluid bgMaroonWhite form-fit">
                    ADMIN Home
                    </div>

                     );
        }
        else if(this.props.user.role==="resto")
        {
            return(

                    <div className="container-fluid bgMaroonWhite form-fit">
                    Resoran Home
                    </div>

                     );
        }
        else{
            return(
              
                    <div className="container-fluid bgMaroonWhite form-fit">
                    {this.renderResto()}
                    </div>

                     );
        }
       
    }
}
const mapStateToProps =(state)=>{
    const user= state.cekLogin;
    return{user};
  }
export default connect(mapStateToProps)(Home);
