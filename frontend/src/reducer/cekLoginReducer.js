const INITIAL_BEBAS = {userID:"",username:"",nama:"",role:"",error:"",cookieCheck:false};
export default (state= INITIAL_BEBAS,action) =>{
    switch(action.type)
    {
        case "LOGIN_BERHASIL": return action.payload;
        case "LOGIN_GAGAL": return {...state,error:"Username & Password Invalid"};
        case "COOKIES_CHECKED": return{...state,cookieCheck:true};
        case "LOGOUT": return INITIAL_BEBAS;
        default: return state;
    }

}