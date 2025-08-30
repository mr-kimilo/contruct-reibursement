import axios from '../utils/request';

// 获取项目预算信息
export const getProjectBudget = (projectCode) => {
  return axios.get(`/api/budget/${projectCode}`);
};

// 检查预算是否充足
export const checkProjectBudget = ({ projectCode, amount }) => {
  return axios.post('/api/budget/check', { projectCode, amount });
};
