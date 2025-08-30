import React, { useState } from 'react';
import { Descriptions, Table, Tag, Button, Input, Space, Badge, List, message, Timeline } from 'antd';
import moment from 'moment';

// 模拟数据
const initialDetail = {
  code: 'BX20250830001',
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
};

const statusColor = {
  '待部门审核': 'processing',
  '待财务审核': 'warning',
  '待领导审批': 'default',
  '已通过': 'success',
  '已驳回': 'error',
};

export default function ApprovalDetail() {
  // 审批节点流转顺序
  const nodeFlow = ['部门', '财务', '领导'];
  const statusFlow = ['待部门审核', '待财务审核', '待领导审批', '已通过', '已驳回'];
  const [detail, setDetail] = useState(initialDetail);
  // 当前节点：根据状态判断
  const [node, setNode] = useState('部门');
  const [opinion, setOpinion] = useState('');
  const [history, setHistory] = useState([]);

  // 根据当前状态推断节点
  React.useEffect(() => {
    if (detail.status === '待部门审核') setNode('部门');
    else if (detail.status === '待财务审核') setNode('财务');
    else if (detail.status === '待领导审批') setNode('领导');
    else setNode('');
  }, [detail.status]);

  const handleApprove = (result) => {
    if (!opinion) {
      message.warning('请填写审批意见');
      return;
    }
    // 记录审批历史
    const approver = node === '部门' ? '部门负责人' : node === '财务' ? '财务人员' : '领导';
    const newHistory = [
      ...history,
      {
        node,
        approver,
        result: result === 'agree' ? '同意' : '驳回',
        opinion,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    ];
    setHistory(newHistory);

    // 节点流转
    let nextStatus = detail.status;
    if (detail.status === '待部门审核' && result === 'agree') nextStatus = '待财务审核';
    else if (detail.status === '待财务审核' && result === 'agree') nextStatus = '待领导审批';
    else if (detail.status === '待领导审批' && result === 'agree') nextStatus = '已通过';
    else if (result === 'reject') nextStatus = '已驳回';

    setDetail({ ...detail, status: nextStatus });
    setOpinion('');
    message.success(result === 'agree' ? '审批同意' : '审批驳回');
  };

  const columns = [
    { title: '费用类别', dataIndex: 'type', key: 'type' },
    { title: '费用日期', dataIndex: 'date', key: 'date' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: v => `¥${v.toFixed(2)}` },
    { title: '用途说明', dataIndex: 'usage', key: 'usage' },
    { title: '附件编号', dataIndex: 'attachmentNo', key: 'attachmentNo' },
  ];

  return (
    <div style={{ background: '#fff', padding: 32, borderRadius: 8, maxWidth: 900, margin: '0 auto' }}>
      {/* 顶部信息 */}
      <Space style={{ marginBottom: 24 }}>
        <span style={{ fontWeight: 'bold', fontSize: 18 }}>报销单号：{detail.code}</span>
        <span>提交日期：{detail.date}</span>
        <Badge status={statusColor[detail.status]} text={detail.status} />
      </Space>
      {/* 基本信息 */}
      <Descriptions title="基本信息" bordered size="small" column={2} style={{ marginBottom: 24 }}>
        <Descriptions.Item label="报销人">{detail.user}</Descriptions.Item>
        <Descriptions.Item label="部门">{detail.department}</Descriptions.Item>
        <Descriptions.Item label="项目名称">{detail.project}</Descriptions.Item>
        <Descriptions.Item label="项目编号">{detail.projectCode}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{detail.phone}</Descriptions.Item>
        <Descriptions.Item label="报销总金额">¥{detail.total.toFixed(2)}</Descriptions.Item>
      </Descriptions>
      {/* 费用明细 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8 }}>费用明细</div>
        <Table columns={columns} dataSource={detail.details} pagination={false} rowKey="key" size="small" />
      </div>
      {/* 附件列表 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8 }}>附件列表</div>
        <List
          dataSource={detail.attachments}
          renderItem={item => (
            <List.Item>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
            </List.Item>
          )}
        />
      </div>
      {/* 审批历史 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8 }}>审批历史</div>
        <Timeline style={{ marginLeft: 16 }}>
          {history.length === 0 && <Timeline.Item color="gray">暂无审批记录</Timeline.Item>}
          {history.map((item, idx) => (
            <Timeline.Item key={idx} color={item.result === '同意' ? 'green' : 'red'}>
              <div><b>{item.approver}</b>（{item.node}）{item.result}</div>
              <div>意见：{item.opinion}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{item.time}</div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      {/* 审批操作区 */}
      {node && (detail.status === '待部门审核' || detail.status === '待财务审核' || detail.status === '待领导审批') && (
        <div style={{ borderTop: '1px solid #eee', paddingTop: 24, textAlign: 'center' }}>
          <div style={{ marginBottom: 16, fontWeight: 'bold' }}>审批操作（{node}）</div>
          <Input.TextArea
            value={opinion}
            onChange={e => setOpinion(e.target.value)}
            placeholder="请输入审批意见"
            rows={3}
            style={{ maxWidth: 400, margin: '0 auto 16px' }}
          />
          <Space>
            <Button type="primary" onClick={() => handleApprove('agree')}>同意</Button>
            <Button danger onClick={() => handleApprove('reject')}>驳回</Button>
          </Space>
        </div>
      )}
    </div>
  );
}
