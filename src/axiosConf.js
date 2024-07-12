import axios from 'axios';

const axiosCustom = axios.create({
  baseURL: 'https://api.dezinfeksiyatashkent.uz/api/', // Replace with your API base URL
});

axiosCustom.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['X-Refresh-Token'] = refreshToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCustom;
