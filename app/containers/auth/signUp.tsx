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
    let decodedString = "";

    if (!searchParam.has("ref") && !searchParam.has("slug") && !searchParam.has("")) {
      window.location.href = "/auth/login";
      return;
    }

    if (searchParam.has("ref")) {

      const refParam: string | null = searchParam.get("ref" || "REF" || "Ref");
      decodedString = atob(refParam || "");
      console.log(decodedString, "decodedString")
      const isValidBase64 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(decodedString);

      console.log(isValidBase64)

      if (isValidBase64) {
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
              dispatch(auditLog([{ event_type: "FRONTEND_LOGIN_SUCCESS", output: "FRONTEND_LOGIN_SUCCESS", misc_info: "FRONTEND Login Using Slug Success" }]))

              router.push('/appointment');
            });
          })
          .catch(() => {
            deleteLocalStorage();
            window.location.href = '/unauthorized';
            dispatch(auditLog([{ event_type: "FRONTEND_LOGIN_FAILURE", output: "FRONTEND_LOGIN_FAILURE", misc_info: "FRONTEND Login Using Slug Failed" }]))

          });
      } else {
        deleteLocalStorage();
        window.location.href = '/unauthorized';
        dispatch(auditLog([{ event_type: "FRONTEND_LOGIN_FAILURE", output: "FRONTEND_LOGIN_FAILURE", misc_info: "FRONTEND Login Using Slug Failed" }]))

      }
    } catch (error) {
      deleteLocalStorage();
      window.location.href = '/pageNotFound';
      dispatch(auditLog([{ event_type: "FRONTEND_LOGIN_FAILURE", output: "FRONTEND_LOGIN_FAILURE", misc_info: "FRONTEND Login Using Slug Failed" }]))

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
