建筑行业财务报销系统 - 技术说明文档
项目概述
本系统是一个针对建筑行业财务报销管理系统，提供报销申请、审批流程、归档查询等功能，帮助企业规范报销流程，提高财务管理效率。
技术栈
前端框架: React 18
UI 组件库: Ant Design
路由管理: React Router v6
状态管理: Context API (用户状态) + 本地状态
HTTP 客户端: Axios
日期处理: Moment.js
构建工具: Create React App
项目结构
plaintext
src/
├── api/                # API接口定义
├── components/         # 通用组件
│   ├── Layout/         # 布局组件
│   └── Toast/          # 提示组件
├── context/            # Context API 状态管理
├── pages/              # 页面组件
│   ├── Login/          # 登录页面
│   ├── ReimbursementForm/ # 报销表单页面
│   ├── MyReimbursement/ # 我的报销页面
│   ├── ApprovalDetail/ # 审批详情页面
│   └── ArchiveQuery/   # 归档查询页面
├── router/             # 路由配置
├── store/              # 状态管理入口
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
│   └── request.js      # Axios封装
├── App.js              # 应用入口组件
└── index.js            # 应用启动入口
核心功能模块
1. 用户认证模块
登录功能: 实现用户身份验证，支持工号密码登录
状态管理: 使用 Context API 管理用户登录状态和权限信息
路由保护: 通过路由配置实现未登录状态下的页面访问控制
关键代码:
src/pages/Login/Login.jsx: 登录页面实现
src/context/UserContext.js: 用户状态管理
src/router/index.jsx: 路由配置与保护
2. 报销申请模块
表单填写: 支持填写报销人信息、项目信息、费用明细等
动态表单: 费用明细支持动态添加 / 删除行
附件上传: 支持上传 PDF/JPG/PNG 格式的报销凭证
预算校验: 提交前检查项目预算是否充足
草稿保存: 支持保存草稿功能，方便后续继续编辑
关键代码:
src/pages/ReimbursementForm/ReimbursementForm.jsx: 报销表单实现
src/api/reimbursementApi.js: 报销相关 API
src/api/budgetApi.js: 预算检查 API
3. 审批流程模块
多级审批: 支持部门审核→财务审核→领导审批的多级审批流程
审批操作: 审批人可查看详情并执行同意 / 驳回操作
审批记录: 展示完整的审批历史记录
状态流转: 自动处理审批状态流转逻辑
关键代码:
src/pages/ApprovalDetail/ApprovalDetail.jsx: 审批详情页面
src/api/approvalApi.js: 审批相关 API
4. 报销查询模块
我的报销: 展示当前用户提交的所有报销单
状态筛选: 支持按报销状态筛选
关键词搜索: 支持按报销单号和项目名称搜索
草稿编辑: 支持对草稿状态的报销单继续编辑
关键代码:
src/pages/MyReimbursement/MyReimbursement.jsx: 我的报销页面
5. 归档查询模块
归档列表: 展示已归档的报销记录
日期筛选: 支持按日期范围筛选
附件预览: 支持查看归档的报销附件
关键代码:
src/pages/ArchiveQuery/ArchiveQuery.jsx: 归档查询页面
src/api/archiveApi.js: 归档相关 API
API 设计
系统采用 RESTful 风格 API 设计，主要接口分类如下:
用户相关: src/api/userApi.js
用户登录
获取用户信息
获取部门列表
报销相关: src/api/reimbursementApi.js
提交报销申请
保存草稿
获取报销列表
获取报销详情
预算相关: src/api/budgetApi.js
获取项目预算
检查预算是否充足
审批相关: src/api/approvalApi.js
提交审批结果
归档相关: src/api/archiveApi.js
查询归档列表
获取归档详情
预览附件
状态管理
全局状态: 使用 Context API 管理用户信息
src/context/UserContext.js定义了用户上下文
通过useUser钩子在组件中访问用户状态
本地状态: 各页面使用 React useState 管理组件内部状态
持久化存储: 使用 localStorage 存储草稿数据和认证信息
路由设计
系统采用 React Router v6 实现路由管理，主要路由如下:
/login: 登录页面
/form: 报销表单页面
/my: 我的报销页面
/approval: 审批详情页面
/archive: 归档查询页面
路由配置见src/router/index.jsx，使用嵌套路由实现布局共享。
错误处理
API 错误处理: 在src/utils/request.js中统一处理
401 未授权错误自动跳转登录页
其他错误显示相应提示信息
表单验证: 使用 Ant Design Form 组件的表单验证功能
必输项验证
格式验证
自定义验证逻辑
用户提示: 使用 Ant Design 的 message 组件和自定义 Toast 组件提供操作反馈
扩展性说明
状态管理扩展: 当前使用 Context API，如需更复杂状态管理，可通过src/store/index.js扩展为 Redux Toolkit
API 扩展: 所有 API 接口已按功能模块化，新增功能只需在对应模块添加接口定义
组件复用: 通用功能已封装为组件，新增页面可直接复用
类型定义: 提供了 TypeScript 类型定义 (src/types/)，便于后续 TypeScript 迁移和类型检查
运行说明
安装依赖: npm install
启动开发服务器: npm start
构建生产版本: npm run build