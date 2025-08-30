import React, { useState } from 'react';
import { Table, Input, DatePicker, Button, Space, Tag, Modal } from 'antd';
import moment from 'moment';

const { Search } = Input;
const { RangePicker } = DatePicker;

// 模拟归档数据
const mockData = [
  {
    key: '1',
    code: 'BX20250830001',
    project: 'XX小区建设项目',
    archiveDate: '2025-08-25',
    attachments: [
      { name: '发票.pdf', url: '#' },
      { name: '采购合同.jpg', url: '#' },
    ]
  },
  {
    key: '2',
    code: 'BX20250830002',
    project: 'XX桥梁维修项目',
    archiveDate: '2025-08-26',
    attachments: [
      { name: '住宿发票.jpg', url: '#' }
    ]
  }
];

export default function ArchiveQuery() {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [preview, setPreview] = useState({ visible: false, file: null });

  const handleSearch = (value) => {
    setSearch(value);
    filterData(value, dateRange);
  };
  const handleDateChange = (dates) => {
    setDateRange(dates);
    filterData(search, dates);
  };
  const filterData = (searchVal, dates) => {
    let filtered = mockData;
    if (searchVal) {
      filtered = filtered.filter(item =>
        item.code.includes(searchVal) || item.project.includes(searchVal)
      );
    }
    if (dates && dates.length === 2) {
      filtered = filtered.filter(item => {
        const d = moment(item.archiveDate);
        return d.isBetween(dates[0], dates[1], 'day', '[]');
      });
    }
    setData(filtered);
  };

  const columns = [
    { title: '报销单号', dataIndex: 'code', key: 'code' },
    { title: '项目名称', dataIndex: 'project', key: 'project' },
    { title: '归档日期', dataIndex: 'archiveDate', key: 'archiveDate' },
    {
      title: '附件',
      dataIndex: 'attachments',
      key: 'attachments',
      render: (files) => files.map(f => (
        <Button type="link" key={f.name} onClick={() => setPreview({ visible: true, file: f })}>{f.name}</Button>
      ))
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
        <RangePicker onChange={handleDateChange} />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{ pageSize: 8 }}
      />
      <Modal
        open={preview.visible}
        title={preview.file?.name}
        footer={null}
        onCancel={() => setPreview({ visible: false, file: null })}
        width={600}
      >
        {preview.file && preview.file.name.match(/\.(jpg|jpeg|png)$/i) ? (
          <img src={preview.file.url} alt={preview.file.name} style={{ maxWidth: '100%' }} />
        ) : (
          <p>无法预览该文件类型，请下载后查看。</p>
        )}
      </Modal>
    </div>
  );
}
