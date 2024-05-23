'use client'
import { getAndSetAccessToken } from '@/app/utils/auth';
import {  useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Login = () => {
  const searchParam   = useSearchParams();

  useEffect(() => {
    let slug = searchParam.get("slug");
    if(slug){
      getAndSetAccessToken(slug).then((response:any) => {
        window.location.href= '/appointment';
      })
    }else{
      window.location.href= '/pageNotFound';
    }
  }, [searchParam]);

  return (
      <div className='main_sec'></div>
  );
};

export default Login;
