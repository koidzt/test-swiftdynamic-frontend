import { useTranslation } from 'react-i18next';
import SelectLanguage from '../../components/SelectLanguage';
import '../../style/pages/Home.css';
import '../../style/pages/Test3.css';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DefaultOptionType } from 'antd/es/select';

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  phoneNo: string;
  nationality: string;
  option?: string;
}

const initData: DataType[] = [];
for (let i = 0; i < 20; i++) {
  if (i % 2 === 0) {
    initData.push({
      key: i,
      name: `Edward King ${i}`,
      gender: 'male',
      phoneNo: `London, Park Lane no. ${i}`,
      nationality: 'Thai',
    });
  } else {
    initData.push({
      key: i,
      name: `Edward King ${i}`,
      gender: 'Female',
      phoneNo: `London, Park Lane no. ${i}`,
      nationality: 'Thai',
    });
  }
}

function Test3() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(initData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onClickHomepage = () => {
    navigate(`/`);
  };

  const optionsTitle: Array<DefaultOptionType> = [
    { value: t('test3.options.title.mr'), label: t('test3.options.title.mr') },
    { value: t('test3.options.title.mrs'), label: t('test3.options.title.mrs') },
    { value: t('test3.options.title.ms'), label: t('test3.options.title.ms') },
    { value: t('test3.options.title.other'), label: t('test3.options.title.other') },
  ];
  const optionsGender: Array<DefaultOptionType> = [
    { value: 'male', label: t('test3.options.gender.male') },
    { value: 'female', label: t('test3.options.gender.female') },
    { value: 'none', label: t('test3.options.gender.none') },
  ];

  const optionsPhone: Array<DefaultOptionType> = [
    { value: '+66', label: '+66' },
    { value: '+84', label: '+84' },
    { value: '+86', label: '+86' },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: t('test3.table.header.name'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: t('test3.table.header.gender'),
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: t('test3.table.header.phoneNo'),
      dataIndex: 'phoneNo',
      sorter: (a, b) => a.phoneNo.length - b.phoneNo.length,
    },
    {
      title: t('test3.table.header.nationality'),
      dataIndex: 'nationality',
      sorter: (a, b) => a.nationality.length - b.nationality.length,
    },
    {
      title: t('test3.table.header.option'),
      dataIndex: 'option',
    },
  ];

  const onClickDelete = () => {
    let newData = [...data];
    selectedRowKeys.forEach((item) => {
      newData = newData.filter((data) => data.key !== item);
    });

    setData(newData);
  };

  const onClickSelectAll = (event: CheckboxChangeEvent) => {
    console.log(event);

    let newSelectedRowKeys: number[] = [];

    if (event.target.checked) {
      newSelectedRowKeys = data.map((item) => Number(item.key));
    } else {
      newSelectedRowKeys = [];
    }

    console.log(newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeBirthday: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeGender = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: 20 }}>
        <Row>
          <Col span={18}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {t('test3.title')}
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <SelectLanguage />
              <Button onClick={onClickHomepage}>{t('homepage')}</Button>
            </Space>
          </Col>
        </Row>

        <Content className="content-page">
          <Form
            form={form}
            className="form-box"
            name="form-register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item
                  label={t('test3.form.title')}
                  wrapperCol={{ span: 'auto' }}
                  name="titleName"
                  rules={[{ required: true, message: 'title is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Select placeholder={t('test3.form.placeholder.title')} options={optionsTitle} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={t('test3.form.name')}
                  name="name"
                  rules={[{ required: true, message: 'name is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input width={'100%'} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={t('test3.form.surname')}
                  name="surname"
                  rules={[{ required: true, message: 'surname is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col>
                <Form.Item
                  label={t('test3.form.birthday')}
                  name="birthday"
                  rules={[{ required: true, message: 'date of birth is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <DatePicker name="birthday" onChange={onChangeBirthday} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t('test3.form.nationality')}
                  name="nationality"
                  rules={[{ required: true, message: 'nationality is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item label={t('test3.form.idNo')} style={{ marginBottom: 0 }}>
                  <Typography.Paragraph>
                    <Form.Item
                      name={['idNo', 'idNo1']}
                      style={{ display: 'inline-block', margin: '0px 8px', minWidth: '30px', width: '8%' }}
                    >
                      <Input />
                    </Form.Item>
                    -
                    <Form.Item
                      name={['idNo', 'idNo2']}
                      style={{ display: 'inline-block', margin: '0px 8px', minWidth: '55px', width: '16%' }}
                    >
                      <Input />
                    </Form.Item>
                    -
                    <Form.Item
                      name={['idNo', 'idNo3']}
                      style={{ display: 'inline-block', margin: '0px 8px', minWidth: '65px', width: '20%' }}
                    >
                      <Input />
                    </Form.Item>
                    -
                    <Form.Item
                      name={['idNo', 'idNo4']}
                      style={{ display: 'inline-block', margin: '0px 8px', minWidth: '40px', width: '12%' }}
                    >
                      <Input />
                    </Form.Item>
                    -
                    <Form.Item
                      name={['idNo', 'idNo5']}
                      style={{ display: 'inline-block', margin: '0px 8px', minWidth: '30px', width: '8%' }}
                    >
                      <Input />
                    </Form.Item>
                  </Typography.Paragraph>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={t('test3.form.gender')}
                  name="gender"
                  rules={[{ required: true, message: 'gender is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Radio.Group onChange={onChangeGender}>
                    {optionsGender.map((gender) => (
                      <Radio key={gender.value} value={gender.value}>
                        {gender.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={t('test3.form.phoneNo')}
                  name={'phone'}
                  rules={[{ required: true, message: '' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Typography.Paragraph style={{ marginBottom: 0 }}>
                    <Form.Item
                      name={['phone', 'prefix']}
                      rules={[{ required: true, message: 'prefix is required' }]}
                      style={{ display: 'inline-block', width: '15%', marginLeft: '8px', marginRight: '8px' }}
                    >
                      <Select options={optionsPhone} />
                    </Form.Item>
                    -
                    <Form.Item
                      name={['phone', 'number']}
                      rules={[{ required: true, message: 'number is required' }]}
                      style={{ display: 'inline-block', width: '40%', marginLeft: '8px', marginRight: '8px' }}
                    >
                      <Input width={'100%'} />
                    </Form.Item>
                  </Typography.Paragraph>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label={t('test3.form.passportNo')}
                  name={'passportNo'}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input width={'100%'} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label={t('test3.form.expectedSalary')}
                  name={'passportNo'}
                  rules={[{ required: true, message: 'expected salary is required' }]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input width={'100%'} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Space size={48}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        form.resetFields();
                      }}
                      style={{ minWidth: '100px' }}
                    >
                      {t('test3.form.button.clear')}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" style={{ minWidth: '100px' }}>
                      {t('test3.form.button.send')}
                    </Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Form>

          <div className="table-box">
            <Space style={{ display: 'flex', marginBottom: '8px' }}>
              <Checkbox onChange={onClickSelectAll}>{t('test3.table.selectAll')}</Checkbox>
              <Button danger onClick={onClickDelete} disabled={!hasSelected}>
                {t('test3.table.delete')}
              </Button>
            </Space>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="small" scroll={{ y: 235 }} />
          </div>
        </Content>
      </Content>
    </Layout>
  );
}

export default Test3;
