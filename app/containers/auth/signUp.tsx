'use client'
import { getHuddleBoardConfig } from '@/app/redux/actions/auth';
import { AppDispatch } from '@/app/redux/store';
import { getAndSetAccessToken } from '@/app/utils/auth';
import { deleteLocalStorage } from '@/app/utils/helper';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Logino from "../../images/Logino.svg"
import { useDispatch } from 'react-redux';
import {
  MainLogin
} from '@/app/styles/customStyle';

const SignUp = () => {

  const searchParam = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  useEffect(() => {
    sessionStorage.clear();
    let decodedString = "";

    if (!searchParam.has("ref") && !searchParam.has("slug") && !searchParam.has("")) {
      window.location.href = "/auth/login";
      return;
    }

    if (searchParam.has("ref")) {
      const refParam: string | null = searchParam.get("ref");
      decodedString = atob(refParam || "");
      console.log(decodedString, "decodedString")
      const isValidBase64 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(decodedString);

      if (!isValidBase64) {
        localStorage.setItem('refEmail', decodedString)
        window.location.href = "/unauthorized";
      }
    }

    const slug = searchParam.get("slug") || decodedString;

    try {
      if (slug) {
        getAndSetAccessToken(slug)
          .then(() => {
            dispatch(getHuddleBoardConfig()).then((res: any) => {
              localStorage.setItem('huddleBoardConfig', JSON.stringify(res.payload));
              router.push('/appointment');
            });
          })
          .catch(() => {
            deleteLocalStorage();
            window.location.href = '/unauthorized';
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
    <div>
      <MainLogin sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <img src={Logino.src} />
      </MainLogin>
    </div>
  );
};

export default SignUp;
