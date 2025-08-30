// 审批相关模拟接口
export function submitApproval({ code, node, opinion, result }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, message: '审批已提交' });
    }, 800);
  });
}
