import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';

export const doLogin =(user)=>{
    return(dispatch)=>{

        axios.get(API_URL+'/doLogin',{
            params:{
                username : user.username,
                password : user.password
            }
        }).then(res=>{
            // console.log(res.data);
            if(res.data.length!==0){
                dispatch({type:"LOGIN_BERHASIL",
                          payload:{userID:res.data[0].userID,
                                username:res.data[0].username,
                                nama:res.data[0].nama,
                                role:res.data[0].role,
                                error:"",
                                cookieCheck:"true"}
            });//dispatch
            }
            else{
                dispatch({type:"LOGIN_GAGAL"});
            }
    
        }).catch(err=> {
            console.log("error");
            
        })

    }
   
};

export const cekLogin =(user)=>{
    return(dispatch)=>{
        
        axios.get(API_URL+'/cekLogin',{
            params:{
                userID : user,
            }
        }).then(res=>{
            console.log(res.data);
            if(res.data.length!==0){
                dispatch({type:"LOGIN_BERHASIL",
                          payload:{userID:res.data[0].userID,
                                username:res.data[0].username,
                                nama:res.data[0].nama,
                                role:res.data[0].role,
                                error:"",
                                cookieCheck:"true"}
            });//dispatch
            }
            else{
                dispatch({type:"LOGIN_GAGAL"});
            }
    
        }).catch(err=> {
            console.log("error");
            
        })

    }
   
};

export const doLogOut =()=>{
    return {
        type:"LOGOUT",
    };
}

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}
export const doLogout = () => {
    return {
        type: "LOGOUT"
    };
}