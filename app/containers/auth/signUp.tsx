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
import { auditLog } from '@/app/redux/actions/appointment';

const SignUp = () => {

  const searchParam = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();

    let decodedString = "";

    if (!searchParam.has("ref") && !searchParam.has("slug") && !searchParam.has("")) {
      window.location.href = "/auth/login";
      return;
    }

    // if (searchParam.has("ref")) {

    //   const refParam: string | null = searchParam.get("ref" || "REF" || "Ref");
    //   decodedString = atob(refParam || "");
    //   console.log(decodedString, "decodedString")
    //   const isValidBase64 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(decodedString);

    //   console.log(isValidBase64)

    //   if (isValidBase64) {
    //     localStorage.setItem('refEmail', decodedString)
    //     window.location.href = "/unauthorized";
    //   }
    // }

    const slug = searchParam.get("slug");

    try {
      if (slug) {

        getAndSetAccessToken(slug)
          .then(() => {
            dispatch(getHuddleBoardConfig()).then((res: any) => {
              console.log("bdjgbdjbgjdfbgjjgdf")
              localStorage.setItem('huddleBoardConfig', JSON.stringify(res.payload));
              router.push("/appointment");
              window.location.href = "/appointment"
            });
          })
          .catch(() => {
            deleteLocalStorage();
            window.location.href = '/unauthorized';
            handleAddEventData("FRONTEND_LOGIN_FAILURE", "FRONTEND_LOGIN_FAILURE", "FRONTEND Login Using Slug Failed")
          });
      } else {
        deleteLocalStorage();
        window.location.href = '/unauthorized';
        handleAddEventData("FRONTEND_LOGIN_FAILURE", "FRONTEND_LOGIN_FAILURE", "FRONTEND Login Using Slug Failed")

      }
    } catch (error) {
      deleteLocalStorage();
      window.location.href = '/pageNotFound';
      handleAddEventData("FRONTEND_LOGIN_FAILURE", "FRONTEND_LOGIN_FAILURE", "FRONTEND Login Using Slug Failed")

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
function handleAddEventData(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}

