
import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const SiteConfigContext = createContext();

const SiteConfigProvider = ({ children }) => {

  const [siteConfig, setSiteConfig] = useState();

  const fetchSiteConfig = async () => {
    const formData = new FormData();
    formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
    
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/get-site-settings`,
        data: formData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    };
    const response = await axios(config)
    return response.data.data.config;
  };

  useEffect(()=>{
      fetchSiteConfig().then(res =>{
        setSiteConfig(res);
      })
      .catch(err =>{});

  },[]);

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export { SiteConfigContext, SiteConfigProvider };