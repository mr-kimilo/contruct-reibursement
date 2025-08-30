// 报销相关模拟接口
export function submitReimbursement(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, message: '提交成功' });
    }, 800);
  });
}

export function saveDraft(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, message: '草稿已保存' });
    }, 500);
  });
}

export function getProjects() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { name: 'XX小区建设项目', code: 'PJT001' },
        { name: 'XX桥梁维修项目', code: 'PJT002' },
      ]);
    }, 500);
  });
}

export function getMyReimbursementList() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          key: '1',
          code: 'BX20250830001',
          project: 'XX小区建设项目',
          amount: 12345.67,
          date: '2025-08-20',
          status: '待部门审核',
        },
        {
          key: '2',
          code: 'BX20250830002',
          project: 'XX桥梁维修项目',
          amount: 8888.00,
          date: '2025-08-21',
          status: '已通过',
        },
      ]);
    }, 600);
  });
}

export function getReimbursementDetail(code) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: code,
        date: '2025-08-20',
        status: '待部门审核',
        user: '张三',
        department: '工程部',
        project: 'XX小区建设项目',
        projectCode: 'PJT001',
        phone: '13800000000',
        total: 12345.67,
        details: [
          { key: 1, type: '材料采购费', date: '2025-08-18', amount: 8000, usage: '采购钢筋', attachmentNo: '附件1' },
          { key: 2, type: '差旅费', date: '2025-08-19', amount: 4345.67, usage: '项目考察', attachmentNo: '附件2' },
        ],
        attachments: [
          { name: '发票.pdf', url: '#' },
          { name: '采购合同.jpg', url: '#' },
        ]
      });
    }, 600);
  });
}
