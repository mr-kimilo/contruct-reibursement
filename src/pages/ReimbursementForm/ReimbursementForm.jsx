
import { useNavigate } from 'react-router-dom';
import { submitReimbursement, saveDraft } from '../../api/reimbursementApi';
import { checkProjectBudget } from '../../api/budgetApi';

const { Option } = Select;

// 模拟数据
const departments = ['工程部', '采购部', '财务部'];
const projects = [
  { name: 'XX小区建设项目', code: 'PJT001' },
  { name: 'XX桥梁维修项目', code: 'PJT002' },
];
const feeTypes = ['材料采购费', '机械租赁费', '差旅费', '人工费', '办公费'];

// 金额小写转大写（简化版）
function numToCny(num) {
  // 这里只做简单演示，实际可用第三方库
  if (!num) return '';
  return '壹' + num + '元';


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, DatePicker, InputNumber, Upload, message, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const departments = ['工程部', '采购部', '财务部'];
const projects = [
  { name: 'XX小区建设项目', code: 'PJT001' },
  { name: 'XX桥梁维修项目', code: 'PJT002' },
];
const feeTypes = ['材料采购费', '机械租赁费', '差旅费', '人工费', '办公费'];

function numToCny(num) {
  if (!num) return '';
  return '壹' + num + '元';
}

export default function ReimbursementForm() {
  const [form] = Form.useForm();
  const [projectCode, setProjectCode] = useState('');
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = { name: '张三', department: '工程部', phone: '13800000000' };

  // 草稿回显
  useEffect(() => {
    if (location.search.includes('edit=1')) {
      const draft = localStorage.getItem('draftForm');
      if (draft) {
        const data = JSON.parse(draft);
        if (data.date) data.date = moment(data.date);
        if (data.details) {
          data.details = data.details.map(item => ({
            ...item,
            feeDate: item.feeDate ? moment(item.feeDate) : null
          }));
        }
        form.setFieldsValue(data);
        setProjectCode(data.projectCode || '');
      }
    }
  }, [location.search, form]);

  const handleProjectChange = (value) => {
    const project = projects.find(p => p.name === value);
    setProjectCode(project ? project.code : '');
    form.setFieldsValue({ projectCode: project ? project.code : '' });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };


  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 预算校验
      const total = (values.details || []).reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
      await checkProjectBudget({ projectCode: values.projectCode, amount: total });
      await submitReimbursement(values);
      message.success('提交成功');
      navigate('/my');
    } catch (e) {
      message.error(e.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setDraftLoading(true);
      const values = await form.validateFields();
      await saveDraft(values);
      message.success('草稿保存成功');
    } catch (e) {
      if (e.errorFields) {
        message.warning('请完善表单后再保存草稿');
      } else {
        message.error(e.message || '草稿保存失败');
      }
    } finally {
      setDraftLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: user.name,
        department: user.department,
        phone: user.phone,
        date: moment(),
        details: [
          { feeType: '', feeDate: null, amount: null, amountCny: '', usage: '', attachmentNo: '' }
        ]
      }}
      style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 8 }}
    >
      <h2 style={{ marginBottom: 24 }}>建筑行业财务报销表单</h2>
      {/* 报销人基本信息 */}
      <Form.Item label={<span style={{ color: 'red' }}>*</span>}>
        <Space>
          <Form.Item label="报销人姓名" name="name" rules={[{ required: true, message: '必填' }]} noStyle>
            <Input disabled style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="所在部门" name="department" rules={[{ required: true, message: '必填' }]} noStyle>
            <Select style={{ width: 120 }}>
              {departments.map(dep => <Option key={dep} value={dep}>{dep}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '必填' }]} noStyle>
            <Input style={{ width: 150 }} />
          </Form.Item>
        </Space>
      </Form.Item>
      {/* 项目信息 */}
      <Form.Item label={<span style={{ color: 'red' }}>*</span>}>
        <Space>
          <Form.Item label="项目名称" name="projectName" rules={[{ required: true, message: '必填' }]} noStyle>
            <Select style={{ width: 180 }} onChange={handleProjectChange} placeholder="请选择项目">
              {projects.map(p => <Option key={p.name} value={p.name}>{p.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="项目编号" name="projectCode" rules={[{ required: true, message: '必填' }]} noStyle>
            <Input style={{ width: 120 }} disabled value={projectCode} />
          </Form.Item>
        </Space>
      </Form.Item>
      {/* 报销日期 */}
      <Form.Item label="报销日期" name="date" rules={[{ required: true, message: '必填' }]}
        style={{ width: 250 }}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      {/* 费用明细（动态行） */}
      <Form.List name="details" rules={[{ validator: async(_, details) => { if (!details || details.length < 1) throw new Error('至少添加一项费用明细'); } }]}> 
        {(fields, { add, remove }, { errors }) => (
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}><span style={{ color: 'red' }}>*</span>费用明细</div>
            {fields.map((field, idx) => (
              <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                <Form.Item {...field} name={[field.name, 'feeType']} rules={[{ required: true, message: '费用类别' }]} noStyle>
                  <Select placeholder="费用类别" style={{ width: 120 }}>
                    {feeTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'feeDate']} rules={[{ required: true, message: '费用日期' }]} noStyle>
                  <DatePicker placeholder="费用日期" style={{ width: 120 }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'amount']} rules={[{ required: true, message: '金额' }]} noStyle>
                  <InputNumber
                    placeholder="金额(小写)"
                    min={0}
                    step={0.01}
                    precision={2}
                    style={{ width: 120 }}
                    onChange={val => {
                      const details = form.getFieldValue('details');
                      details[idx].amountCny = numToCny(val);
                      form.setFieldsValue({ details });
                    }}
                  />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'amountCny']} noStyle>
                  <Input placeholder="金额(大写)" style={{ width: 120 }} disabled />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'usage']} rules={[{ required: true, message: '用途说明' }]} noStyle>
                  <Input placeholder="用途说明" style={{ width: 180 }} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'attachmentNo']} noStyle>
                  <Input placeholder="附件编号" style={{ width: 100 }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />
                ) : null}
              </Space>
            ))}
            <Form.ErrorList errors={errors} />
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: 120, marginBottom: 16 }}>
              添加行
            </Button>
          </div>
        )}
      </Form.List>
      {/* 附件上传 */}
      <Form.Item label="附件上传" name="attachments" valuePropName="fileList" getValueFromEvent={e => e && e.fileList} extra="支持PDF/JPG/PNG格式，最多上传5个文件">
        <Upload
          beforeUpload={file => {
            const isAllowed = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
            if (!isAllowed) {
              message.error('仅支持PDF/JPG/PNG格式');
            }
            return isAllowed ? true : Upload.LIST_IGNORE;
          }}
          multiple
          fileList={fileList}
          onChange={handleFileChange}
          maxCount={5}
        >
          <Button icon={<UploadOutlined />}>上传附件</Button>
        </Upload>
      </Form.Item>
      {/* 底部按钮 */}
      <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
        <Button type="default" style={{ marginRight: 16 }} onClick={handleSaveDraft} loading={draftLoading}>保存草稿</Button>
        <Button type="primary" htmlType="submit" loading={loading}>提交审批</Button>
      </Form.Item>
    </Form>
  );
}
