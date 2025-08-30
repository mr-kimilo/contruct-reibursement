import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可添加token等
    return config;
  },
  error => {
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      message.error(error.response.data.message || '服务器错误');
    } else {
      message.error('网络异常，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

export default instance;
