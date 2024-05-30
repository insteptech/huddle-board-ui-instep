'use client'
import { getHuddleBoardConfig } from '@/app/redux/actions/auth';
import { AppDispatch } from '@/app/redux/store';
import { getAndSetAccessToken } from '@/app/utils/auth';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {
  const searchParam = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  useEffect(() => {
    sessionStorage.clear();

    let slug = searchParam.get("slug");
    try {
      if (slug) {
        getAndSetAccessToken(slug)
          .then(() => {
            dispatch(getHuddleBoardConfig()).then((res) => {
              localStorage.setItem('huddleBoardConfig', JSON.stringify(res.payload));
              router.push('/appointment')
            })
          })
          .catch(() => {
            handleSessionStorage('notFound');
          });
      } else {
        handleSessionStorage('missing');
      }
    } catch (error) {
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
