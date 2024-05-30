'use client'
import { getAndSetAccessToken } from '@/app/utils/auth';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Login = () => {
  const searchParam = useSearchParams();

  useEffect(() => {
    sessionStorage.clear();

    let slug = searchParam.get("slug");
    try {
      if (slug) {
        getAndSetAccessToken(slug)
          .then(() => {
            window.location.href = '/appointment';
          })
          .catch(() => {
            handleSessionStorage('notFound');
          });
      } else {
        handleSessionStorage('missing');
      }
    } catch (error) {
      console.error("Error:", error);
      handleSessionStorage('error');
    }

    function handleSessionStorage(status: any) {
      let sessionStorageStatus;
      switch (status) {
        case 'missing':
          sessionStorageStatus = 'unauthorized';
          break;
        case 'error':
          sessionStorageStatus = 'error';
          break;
        case 'notFound':
        default:
          sessionStorageStatus = 'notFound';
          break;
      }
      sessionStorage.setItem('slugStatus', sessionStorageStatus);
      window.location.href = '/pageNotFound';
    }
  }, [searchParam]);



  return (
    <div className='main_sec'></div>
  );
};

export default Login;
