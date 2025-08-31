import React, { useState } from 'react';
import { Table, Input, Select, Button, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getReimbursementDetail } from '../../api/reimbursementApi';

const { Search } = Input;
const { Option } = Select;

// 模拟数据
const statusOptions = [
  '待部门审核',
  '待财务审核',
  '待领导审批',
  '已通过',
  '已驳回',
];
const mockData = [
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
  {
    key: '3',
    code: 'BX20250830003',
    project: 'XX小区建设项目',
    amount: 5000.00,
    date: '2025-08-22',
    status: '已驳回',
  },
  {
    key: '4',
    code: 'BX20250830004',
    project: 'XX小区建设项目',
    amount: 2000.00,
    date: '2025-08-25',
    status: '草稿',
  },
];

export default function MyReimbursement() {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearch(value);
    filterData(value, status);
  };
  const handleStatusChange = (value) => {
    setStatus(value);
    filterData(search, value);
  };
  const filterData = (searchVal, statusVal) => {
    let filtered = mockData;
    if (searchVal) {
      filtered = filtered.filter(item =>
        item.code.includes(searchVal) || item.project.includes(searchVal)
      );
    }
    if (statusVal) {
      filtered = filtered.filter(item => item.status === statusVal);
    }
    setData(filtered);
  };

  const handleContinueEdit = async (record) => {
    setLoading(true);
    // 获取草稿数据，模拟接口
    const draft = await getReimbursementDetail(record.code);
    setLoading(false);
    // 跳转并传递草稿数据（可用本地存储或全局状态，简化用localStorage）
    localStorage.setItem('draftForm', JSON.stringify(draft));
    navigate('/form?edit=1');
  };

  const columns = [
    { title: '报销单号', dataIndex: 'code', key: 'code' },
    { title: '项目名称', dataIndex: 'project', key: 'project' },
    { title: '报销总金额', dataIndex: 'amount', key: 'amount', render: val => `¥${val.toFixed(2)}` },
    { title: '提交日期', dataIndex: 'date', key: 'date' },
    {
      title: '审批状态',
      dataIndex: 'status',
      key: 'status',
      render: val => {
        if (val === '草稿') return <Tag color="orange">草稿</Tag>;
        let color = 'default';
        if (val === '已通过') color = 'green';
        else if (val === '已驳回') color = 'red';
        else color = 'blue';
        return <Tag color={color}>{val}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => record.status === '草稿'
        ? <Button type="link" onClick={() => handleContinueEdit(record)}>继续编辑</Button>
        : <Button type="link">查看详情</Button>
    }
  ];

  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="报销单号/项目名称"
          allowClear
          onSearch={handleSearch}
          style={{ width: 220 }}
        />
        <Select
          placeholder="全部状态"
          allowClear
          style={{ width: 150 }}
          onChange={handleStatusChange}
        >
          {statusOptions.map(s => <Option key={s} value={s}>{s}</Option>)}
          <Option value="草稿">草稿</Option>
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
