import { React, useRef } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

const HttpInterceptor = () => {
const loadingBarRef = useRef();

axios.interceptors.request.use((config) => {
  // Show loading bar
  loadingBarRef.current.continuousStart();
//   return config;
}, (error) => {
//   return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  // Hide loading bar
  loadingBarRef.current.complete();
//   return response.data;
}, (error) => {
  // Hide loading bar
  loadingBarRef.current.complete();
//   return Promise.reject(error);
});

  return <LoadingBar ref={loadingBarRef} color='#f11946' />;
};

export default HttpInterceptor;