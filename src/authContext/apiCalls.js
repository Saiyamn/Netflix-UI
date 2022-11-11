import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';
import BASE_API_URL from '../api/routes';

export const login = async (user,dispatch)=>{
  dispatch(loginStart());

  try{
     const url = BASE_API_URL+'auth/login';
     const res = await axios.post(url,user);
     dispatch(loginSuccess(res.data));
  }catch(err){
    dispatch(loginFailure());
  }
}