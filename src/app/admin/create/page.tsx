'use client'

import Link from 'next/link'
import { FC, ReactNode, useState } from 'react'
import { Layout, theme } from 'antd'
import {
  Button,
  Flex,
  Splitter,
  Input,
  Form
} from 'antd'
import type { FormProps } from 'antd'

import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadProps } from 'antd'

const { Dragger } = Upload
const { Header, Content } = Layout

import { MemeVariantType } from '@/entities'
import { createMemeAction } from '@/features'

type FieldType = {
  title?: string
  description?: string
  slug?: string
};

type VariantDraft = {
  id: string
  file: File
  previewUrl: string
  type: MemeVariantType
}

const App: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [sizes, setSizes] = useState<(number | string)[]>(['50%', '50%'])
  const [variants, setVariants] = useState<VariantDraft[]>([])
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const result = await createMemeAction({
      title: values.title!,
      slug: values.slug!,
      description: values.description,

      variants: variants.map((item) => ({
        file: item.file,
        type: item.type,
      })),
    })
    if (result.success) {
      setVariants([])
      form.resetFields()
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const uploadProps: UploadProps = {
    multiple: true,
    accept: 'image/*',
    name: 'file',
    showUploadList: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList)
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`)
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
    beforeUpload(file) {
      const previewUrl = URL.createObjectURL(file)

      setVariants((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          file,
          previewUrl,
          type: 'image',
        },
      ])

      return false; // отключает auto-upload Ant Design. это ОЧЕНЬ важно
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

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
                  <Dragger {...uploadProps} style={{ maxHeight: 300 }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                      banned files.
                    </p>
                  </Dragger>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="
                          rounded-xl
                          border
                          border-zinc-800
                          overflow-hidden
                        "
                      >
                        <img
                          src={variant.previewUrl}
                          className="
                            aspect-[9/16]
                            w-full
                            object-cover
                          "
                        />

                        <div className="p-3">
                          <select
                            value={variant.type}
                            onChange={(e) => {
                              setVariants((prev) =>
                                prev.map((v) =>
                                  v.id === variant.id
                                    ? {
                                        ...v,
                                        type: e.target
                                          .value as MemeVariantType,
                                      }
                                    : v,
                                ),
                              )
                            }}
                          >
                            <option value="image">
                              image
                            </option>

                            <option value="sketch">
                              sketch
                            </option>

                            <option value="pixel">
                              pixel
                            </option>

                            <option value="gif">
                              gif
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
              </Splitter.Panel>


              <Splitter.Panel size={sizes[1]}>
                <Form
                  name="basic"
                  form={form}
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