import {combineReducers} from 'redux';
import cekLoginReducer from './cekLoginReducer';
export default combineReducers({
    cekLogin:cekLoginReducer
});