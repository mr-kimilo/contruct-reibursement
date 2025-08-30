import React from 'react';
import { message } from 'antd';

// 全局提示组件（可按需扩展为自定义UI）
export function showToast(type, content) {
  if (type === 'success') message.success(content);
  else if (type === 'error') message.error(content);
  else if (type === 'warning') message.warning(content);
  else message.info(content);
}

export default null; // 仅导出showToast函数
