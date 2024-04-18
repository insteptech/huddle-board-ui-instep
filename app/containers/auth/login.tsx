'use client'
import { signInCall } from '@/app/redux/actions/auth';
import { AppDispatch } from '@/app/redux/store';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>()

  const login  = () =>{
    dispatch(signInCall({slug:"c5c16a0b-f012-4ef5-b6d7-22cf8a588868"}));
  }
  return (
      <div className='main_sec'>
        <h1>this is login page</h1>
        <button onClick={()=>login()}>login</button>
      </div>
  );
};

export default Login;
