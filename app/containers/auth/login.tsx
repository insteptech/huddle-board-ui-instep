'use client'
import { AppDispatch } from '@/app/redux/store';
import { getAndSetAccessToken } from '@/app/utils/auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getAndSetAccessToken().then((response:any) => {
      window.location.href= '/appointment';
    })
  }, []);

  return (
      <div className='main_sec'></div>
  );
};

export default Login;
