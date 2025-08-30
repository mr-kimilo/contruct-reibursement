// 登录相关模拟接口
export function login({ jobNumber, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (jobNumber === '1001' && password === '123456') {
        resolve({
          name: '张三',
          department: '工程部',
          role: 'user',
        });
      } else {
        reject(new Error('工号或密码错误'));
      }
    }, 800);
  });
}
