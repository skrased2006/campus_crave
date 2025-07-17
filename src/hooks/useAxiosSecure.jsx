import { useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://campas-crave-server.vercel.app',
});

const useAxiosSecure = () => {
  useEffect(() => {
    const auth = getAuth();
    axiosSecure.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));
  }, []);


  return axiosSecure;
};

export default useAxiosSecure;
