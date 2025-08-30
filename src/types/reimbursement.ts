export interface ProjectReimbursement {
  id?: number;                  // 报销单ID
  projectId: number;           // 项目ID
  projectName: string;         // 项目名称
  departmentId: number;        // 部门ID
  departmentName: string;      // 部门名称
  feeTypeId: number;          // 费用类型ID
  feeTypeName: string;        // 费用类型名称
  amount: number;             // 报销金额
  description: string;        // 报销说明
  attachmentUrls: string[];   // 附件URL列表
  status: string;             // 审批状态
  applicantId: number;        // 申请人ID
  applicantName: string;      // 申请人姓名
  applyDate: string;         // 申请日期
  lastModifiedBy?: string;   // 最后修改人
  lastModifiedDate?: string; // 最后修改时间
}

export interface ReimbursementForm {
  projectId: number;
  feeTypeId: number;
  amount: number;
  description: string;
  attachmentUrls: string[];
}

export interface FeeType {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}

export interface Project {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  departmentName: string;
  status: string;
  budget: number;
  startDate: string;
  endDate: string;
}

export interface ApprovalHistory {
  id: number;
  reimbursementId: number;
  approverId: number;
  approverName: string;
  approvalDate: string;
  status: string;
  comments: string;
}
