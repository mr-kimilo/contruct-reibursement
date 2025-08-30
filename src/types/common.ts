// 通用响应结构
export interface ApiResponse<T> {
  code: number;        // 状态码
  message: string;     // 提示信息
  data: T;            // 业务数据
  timestamp: number;   // 响应时间戳
}

// 分页请求参数
export interface PageParams {
  pageNum?: number;    // 页码
  pageSize?: number;   // 每页条数
  keyword?: string;    // 搜索关键词
  startDate?: string;  // 开始日期
  endDate?: string;    // 结束日期
}

// 分页响应结构
export interface PageResult<T> {
  total: number;       // 总条数
  pages: number;       // 总页数
  pageNum: number;     // 当前页码
  pageSize: number;    // 每页条数
  list: T[];          // 数据列表
}
