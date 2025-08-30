// 预算校验模拟接口
export function checkProjectBudget({ projectCode, amount }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 假设PJT001预算10000，PJT002预算20000
      const budgetMap = {
        PJT001: 10000,
        PJT002: 20000
      };
      const left = budgetMap[projectCode] || 0;
      if (amount > left) {
        reject(new Error('超出项目预算，需先申请预算调整'));
      } else {
        resolve({ success: true, left });
      }
    }, 500);
  });
}
