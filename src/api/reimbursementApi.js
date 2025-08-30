import axios from '../utils/request';

// 获取报销表单配置（部门、项目、费用类型等）
export const getFormConfig = () => {
  return axios.get('/api/reimbursement/config');
};

// 提交报销申请
export const submitReimbursement = (data) => {
  return axios.post('/api/reimbursement/submit', data);
};

// 获取项目列表
export const getProjects = () => {
  return axios.get('/api/projects');
};

// 获取我的报销列表
export const getMyReimbursementList = (params) => {
  return axios.get('/api/reimbursement/my', { params });
};

// 获取报销详情
export const getReimbursementDetail = (id) => {
  return axios.get(`/api/reimbursement/${id}`);
};

// 保存草稿
export const saveDraft = (data) => {
  return axios.post('/api/reimbursement/draft', data);
};

// 获取草稿
export const getDraft = (id) => {
  return axios.get(`/api/reimbursement/draft/${id}`);
};
