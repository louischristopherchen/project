import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {cekLogin,cookieChecked} from '../action/index';
import Cookies from 'universal-cookie';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {renderBintang} from './stuff/Rating';
const cookies = new Cookies();
class Resto extends Component{
    state={detailResto:[],menuResto:[],cekSit:0,errMsg:"",page:"",orderData:[{bookDate:"",jam:"",bookSit:"",keterangan:""}]}

    componentWillMount() {
            const cookie = cookies.get("userCookie");
        if(cookie !== undefined) {
            this.props.cekLogin(cookie);
        }
        else {
            this.props.cookieChecked();
        }        
    }
    componentWillReceiveProps(x){
        this.doGet(x.match.params.id);
        
    }

    doGet(x)
    {
        // console.log(x)
        axios.get(API_URL+"/detailResto",{
            params:{
                id:x
            }
        }).then(scs=>{
            // console.log(scs.data);
        this.setState({detailResto:scs.data[0]});
       
        }).catch((err) => {
            
            console.log(err);
        })
    }
    
    
    doGetMenu(x)
    {
        // console.log(x)
        axios.get(API_URL+"/menuResto",{
            params:{
                id:x
            }
        }).then(scs=>{
            console.log(scs.data);
        this.setState({menuResto:scs.data});
       
        }).catch((err) => {
            
            console.log(err);
        })
    }
    
    
    renderResto=()=>
    {
        const{imgUrl,nama,kota,rating,deskripsi}=this.state.detailResto;
        return ( 
            
        <div className="col-xs-12 col-md-6">
            
        <img className="img-responsive" src={imgUrl} alt={nama}/>
        <table style={{margin:"auto"}}>
            <tr>
                <td colSpan="3">{nama}</td>
            </tr>
            <tr style={{textAlign:"left"}}>
                <td>Kota</td>
                <td style={{padding:"0 3px"}}>:</td>
                <td>{kota}</td>
            </tr>
            <tr style={{textAlign:"left"}}>
                <td>Rating</td>
                <td style={{padding:"0 3px"}}>:</td>
                <td>{renderBintang(rating)}</td>
            </tr>
            <tr style={{textAlign:"left"}}>
                <td>Deskripsi</td>
                <td style={{padding:"0 3px"}}>:</td>
                <td>{deskripsi}</td>
            </tr>
        </table>
        
      
            </div>
        
        );
    }
    renderMenu=()=>
    {  return this.state.menuResto.map((temp,index)=>{
        return(
            <div key={index} style={{color:"white"}}>{temp.nama}</div>
        )
    })
        ;
    }
    CekSit=(x)=>{
        // console.log(this.refs.bookDate.value);
        // console.log(x);
        axios.get(API_URL+"/cekSit",{
            params:{
                bookDate:this.refs.bookDate.value,
                restoID:x
            }
        }).then(scs=>{
            // console.log(scs.data);
        this.setState({cekSit:scs.data[0].bookSit});
       
        }).catch((err) => {
            
            console.log(err);
        })
    }
    doTransaction=()=>{
        var date=new Date();
        console.log(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        console.log(this.refs.bookDate.value);
        console.log(this.refs.jam.value);
        console.log(this.refs.bookSit.value);
        console.log(this.refs.keterangan.value);
        if(this.refs.bookDate.value==="")
        {
            this.setState({errMsg:"silahkan isi tanggal pemesanan"});
        }
        else if(this.refs.jam.value==="")
        {
            this.setState({errMsg:"silahkan isi Jam pesanan"});
        }
        else if(this.refs.bookSit.value==="")
        {
            this.setState({errMsg:"silahkan isi jumlah Orang"});
        }
        else if(this.refs.bookSit.value>(this.state.detailResto.kapasitasSit-this.state.cekSit))
        {
            this.setState({errMsg:"Jumlah Orang Melebihi Kapasitas"});
        }
        else{
            this.doGetMenu(this.state.detailResto.restoID);
            this.setState({errMsg:"",page:"detail",orderData:[{bookDate:this.refs.bookDate.value,
                jam:this.refs.jam.value,
                bookSit:this.refs.bookSit.value,
                keterangan:this.refs.keterangan.value}]})
        }
        
        
    }
    doPageBack=()=>{
        this.setState({page:""});
    }
    render(){
        // console.log(this.props.user.cookieCheck)
        // console.log(this.props.user)
        // console.log(this.props.match.params.id);
        console.log(this.state.menuResto);
    
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
            // console.log(this.state);
            // console.log(this.state.cekSit);
            if(this.state.page==="")
            {
                return(
                
                    <div className="container-fluid bgMaroonWhite form-fit">
                     <div className="container" >
                        <div className="row dproduct" style={{padding:"2% 2%",margin:"10px"}}>
                            {this.renderResto()}
                            <div className="col-xs-12 col-md-6"style={{overflowX:"auto"}}>
                                
                                <table style={{margin:"auto"}}>
                                <thead>
                                <tr>
                                    <td colSpan="3"><h3>Order Form</h3></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{textAlign:"left"}}>
                                    <td>Tanggal</td>
                                    <td style={{padding:"0 3px"}}>:</td>
                                    <td><input type="date" style={{color:"maroon",maxWidth:"200px"}}defaultValue={this.state.orderData[0].bookDate} ref="bookDate" onChange={()=>this.CekSit(this.state.detailResto.restoID)}/></td>
                                </tr>
                                <tr style={{textAlign:"left"}}>
                                    <td>Jam</td>
                                    <td style={{padding:"0 3px"}}>:</td>
                                    <td><input type="time" defaultValue={this.state.orderData[0].jam} ref="jam"style={{color:"maroon"}}/></td>
                                </tr>
                                <tr style={{textAlign:"left"}}>
                                    <td>Jumlah Orang</td>
                                    <td style={{padding:"0 3px"}}>:</td>
                                    <td><input type="number" style={{color:"maroon",width:"50px"}} ref="bookSit" max={this.state.detailResto.kapasitasSit} defaultValue={this.state.orderData[0].bookSit}  required /><span className="validity">
                                    </span>{this.state.detailResto.kapasitasSit-this.state.cekSit} left</td>
                                </tr>
                                <tr style={{textAlign:"left"}}>
                                    <td>Keterangan</td>
                                    <td style={{padding:"0 3px"}}>:</td>
                                    <td><textarea cols="30" rows="5" type="text" ref="keterangan"defaultValue={this.state.orderData[0].keterangan} style={{color:"maroon"}} required/></td>
                                </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" style={{color:"red"}}>{this.state.errMsg}<br/></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><input type="button" value="Pesan Makanan >>" className="tombol" onClick={this.doTransaction}/>
                                        <input type="button" value="SKIP >>" className="tombol" onClick={this.doCheckOut}/>
                                        </td>
                                    </tr>
                                    
                                </tfoot>
                            </table>
                                
                                
                            </div>
                        </div>
                     </div>
                     
                    </div>
           
                );
            }
            else{
                console.log(this.state.orderData[0].jam);
               return  (
                        <div className="container-fluid bgMaroonWhite form-fit">
                        <div className="container" >
                            <div className="row dproduct" style={{padding:"2% 2%",margin:"10px"}}>
                           {this.renderMenu()}
                           <input type="button" value="back" onClick={this.doPageBack}/>
                            </div>
                        </div>
                        </div>
                  )
            }
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