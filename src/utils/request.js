import axios from 'axios';
import { message } from 'antd';

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { data } = response;
    // 假设后端返回格式为 { code: number, data: any, message: string }
    if (data.code === 0) {
      return data.data;
    }
    message.error(data.message || '请求失败');
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('请先登录');
          // 跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          message.error('没有权限');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error('请求失败');
      }
    } else {
      message.error('网络错误');
    }
    return Promise.reject(error);
  }
);

export default instance;
