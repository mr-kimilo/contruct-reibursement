import axios from '../utils/request';

// 用户登录
export const login = (data) => {
  return axios.post('/api/user/login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return axios.get('/api/user/info');
};

// 获取部门列表
export const getDepartments = () => {
  return axios.get('/api/departments');
};
