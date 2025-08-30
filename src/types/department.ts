export interface Department {
  id: number;
  name: string;
  code: string;
  parentId?: number;
  managerName?: string;
  managerId?: number;
  path?: string;
  level: number;
  isActive: boolean;
}

export interface DepartmentTree extends Department {
  children?: DepartmentTree[];
}

export interface DepartmentBudget {
  id?: number;
  departmentId: number;
  departmentName: string;
  year: number;
  totalBudget: number;
  usedBudget: number;
  remainingBudget: number;
  lastUpdatedDate?: string;
}
