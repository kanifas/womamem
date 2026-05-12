'use client'

import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { Layout, theme } from 'antd';
import { Button, Flex, Splitter, Switch, Typography, Input, Checkbox, Form } from 'antd';
import type { FormProps } from 'antd';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const { Header, Content } = Layout;

type FieldType = {
  title?: string;
  description?: string;
  slug?: string;
};

const props: UploadProps = {
  name: 'file',
  multiple: false,
  accept: 'image/*',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [sizes, setSizes] = useState<(number | string)[]>(['50%', '50%']);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Flex vertical gap="medium">
            <Splitter
              onResize={setSizes}
              style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
            >
              <Splitter.Panel size={sizes[0]} resizable={false}>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                      banned files.
                    </p>
                  </Dragger>
              </Splitter.Panel>
              <Splitter.Panel size={sizes[1]}>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ padding: 20 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item<FieldType>
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Обязательно' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Обязательно' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Описание"
                    name="description"
                    rules={[{ required: true, message: 'Обязательно' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  {/* <Form.Item<FieldType>name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item> */}

                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Сохранить
                    </Button>
                  </Form.Item>
                </Form>
              </Splitter.Panel>
            </Splitter>
          </Flex>
        </div>
      </Content>
    </Layout>
  );
};

export default App;