'use client'
import { getHuddleBoardConfig } from '@/app/redux/actions/auth';
import { AppDispatch } from '@/app/redux/store';
import { getAndSetAccessToken } from '@/app/utils/auth';
import { deleteLocalStorage } from '@/app/utils/helper';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {
  const searchParam = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  useEffect(() => {

    sessionStorage.clear();

    let decodedString = "";

    if (searchParam.has("ref")) {
      const refParam: string | null = searchParam.get("ref");
      decodedString = atob(refParam || "");
      const isValidBase64 = /^[A-Za-z0-9+/=]+$/i.test(decodedString);
      if (!isValidBase64) {
        window.location.href = "/unauthorized";
      }
    }

    const slug = searchParam.get("slug") || decodedString;

    try {
      if (slug) {
        getAndSetAccessToken(slug)
          .then(() => {
            dispatch(getHuddleBoardConfig()).then((res) => {
              localStorage.setItem('huddleBoardConfig', JSON.stringify(res.payload));
              router.push('/appointment');
            });
          })
          .catch(() => {
            deleteLocalStorage();
            window.location.href = '/pageNotFound';
          });
      } else {
        deleteLocalStorage();
        window.location.href = '/unauthorized';
      }
    } catch (error) {
      deleteLocalStorage();
      window.location.href = '/pageNotFound';
    }
  }, [searchParam]);


  return (
    <div className='main_sec'></div>
  );
};

export default Login;
