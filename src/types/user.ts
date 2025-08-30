export interface User {
  id: number;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  departmentId: number;
  departmentName: string;
  roles: string[];
  isActive: boolean;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface PasswordChange {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
