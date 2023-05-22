import { useTranslation } from 'react-i18next';
import SelectLanguage from '../../components/SelectLanguage';
import '../../style/pages/Home.css';
import '../../style/pages/Test3.css';
import { Col, Layout, Row, Space, Table, Typography } from 'antd';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { MouseEvent, useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DefaultOptionType } from 'antd/es/select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearForm, changeValues } from '../../store/slice/formSlice';
import dayjs from 'dayjs';

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  phoneNo: string;
  nationality: string;
  option?: string;
}

const initData: DataType[] = [];

function Test3() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(initData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const formState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  const onClickHomepage = () => {
    navigate(`/`);
  };

  const optionsTitle: Array<DefaultOptionType> = [
    { value: t('test3.options.title.mr'), label: t('test3.options.title.mr') },
    { value: t('test3.options.title.mrs'), label: t('test3.options.title.mrs') },
    { value: t('test3.options.title.ms'), label: t('test3.options.title.ms') },
    { value: t('test3.options.title.other'), label: t('test3.options.title.other') },
  ];
  const optionsNationality: Array<DefaultOptionType> = [
    { value: 'thai', label: t('test3.options.nationality.thai') },
    { value: 'other', label: t('test3.options.nationality.other') },
  ];
  const optionsGender: Array<DefaultOptionType> = [
    { value: 'male', label: t('test3.options.gender.male') },
    { value: 'female', label: t('test3.options.gender.female') },
    { value: 'none', label: t('test3.options.gender.none') },
  ];

  const optionsPhone: Array<DefaultOptionType> = [{ value: '+66', label: '+66' }];

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

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onClickClearForm = (event: MouseEvent) => {
    dispatch(clearForm());
    form.resetFields();
  };

  const onValuesChange = (changedValues: any, values: any) => {
    console.log(changedValues);
    console.log(values);
    const newValues = { ...values };
    if (values.birthday) {
      newValues.birthday = dayjs(newValues.birthday).format('MM/DD/YYYY');
    }
    dispatch(changeValues(newValues));
  };

  useEffect(() => {
    let newFormState = { ...formState };
    newFormState.birthday = dayjs(newFormState.birthday);

    form.setFieldsValue(newFormState);
  }, []);

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
            initialValues={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
          >
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item
                  style={{ display: 'inline-block', width: '100%' }}
                  label={t('test3.form.title')}
                  wrapperCol={{ span: 'auto' }}
                  name="titleName"
                  rules={[{ required: true, message: `${t('test3.form.message.title')}` }]}
                >
                  <Select placeholder={t('test3.form.placeholder.title')} options={optionsTitle} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  className="d-inline-block w-100"
                  label={t('test3.form.name')}
                  name="name"
                  rules={[{ required: true, message: `${t('test3.form.message.name')}` }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  className="d-inline-block w-100"
                  label={t('test3.form.surname')}
                  name="surname"
                  rules={[{ required: true, message: `${t('test3.form.message.surname')}` }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  label={t('test3.form.birthday')}
                  name="birthday"
                  rules={[{ required: true, message: `${t('test3.form.message.birthday')}` }]}
                >
                  <DatePicker
                    className="w-100"
                    name="birthday"
                    placeholder={`${t('test3.form.placeholder.birthday')}`}
                    format={'MM/DD/YYYY'}
                  />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item
                  label={t('test3.form.nationality')}
                  name="nationality"
                  rules={[{ required: true, message: `${t('test3.form.message.nationality')}` }]}
                >
                  <Select
                    className="w-100"
                    placeholder={t('test3.form.placeholder.nationality')}
                    options={optionsNationality}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label={t('test3.form.idNo')} style={{ marginBottom: 0 }}>
                  <Typography.Paragraph>
                    <Form.Item name={['idNo', 'idNo1']} className="d-inline-block mb-0 mx-8 w-8">
                      <Input maxLength={1} />
                    </Form.Item>
                    -
                    <Form.Item name={['idNo', 'idNo2']} className="d-inline-block mb-0 mx-8 w-16">
                      <Input maxLength={4} />
                    </Form.Item>
                    -
                    <Form.Item name={['idNo', 'idNo3']} className="d-inline-block mb-0 mx-8 w-20">
                      <Input maxLength={5} />
                    </Form.Item>
                    -
                    <Form.Item name={['idNo', 'idNo4']} className="d-inline-block mb-0 mx-8 w-12">
                      <Input maxLength={2} />
                    </Form.Item>
                    -
                    <Form.Item name={['idNo', 'idNo5']} className="d-inline-block mb-0 mx-8 w-8">
                      <Input maxLength={1} />
                    </Form.Item>
                  </Typography.Paragraph>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  className="d-inline-block w-100"
                  label={t('test3.form.gender')}
                  name="gender"
                  rules={[{ required: true, message: `${t('test3.form.message.gender')}` }]}
                >
                  <Radio.Group name="gender">
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
                  className="mb-0"
                  label={t('test3.form.phoneNo')}
                  name={'phoneNo'}
                  rules={[{ required: true, message: '' }]}
                >
                  <Typography.Paragraph style={{ marginBottom: 0 }}>
                    <Form.Item
                      className="d-inline-block w-15 mx-8 mb-0"
                      name={'phonePrefix'}
                      rules={[{ required: true, message: `${t('test3.form.message.phone.prefix')}` }]}
                    >
                      <Select options={optionsPhone} />
                    </Form.Item>
                    -
                    <Form.Item
                      className="d-inline-block w-40 mx-8"
                      name={'phoneNo'}
                      rules={[{ required: true, message: `${t('test3.form.message.phone.number')}` }]}
                    >
                      <Input />
                    </Form.Item>
                  </Typography.Paragraph>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item className="d-inline-block w-100" label={t('test3.form.passportNo')} name={'passportNo'}>
                  <Input width={'100%'} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  className="d-inline-block w-100"
                  label={t('test3.form.expectedSalary')}
                  name={'expectedSalary'}
                  rules={[{ required: true, message: `${t('test3.form.message.expectedSalary')}` }]}
                >
                  <Input width={'100%'} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Space size={48} className="d-flex justify-content-center">
                  <Form.Item>
                    <Button className="min-w-100px" onClick={onClickClearForm}>
                      {t('test3.form.button.clear')}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button className="min-w-100px" htmlType="submit">
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
