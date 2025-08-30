import axios from '../utils/request';

// 查询归档列表
export const getArchiveList = (params) => {
  return axios.get('/api/archive/list', { params });
};

// 查看归档详情
export const getArchiveDetail = (id) => {
  return axios.get(`/api/archive/${id}`);
};

// 预览附件
export const previewAttachment = (id) => {
  return axios.get(`/api/archive/attachment/${id}`);
};
