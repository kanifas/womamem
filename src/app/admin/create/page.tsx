'use client'

import { FC, useState } from 'react'
import { Layout, theme } from 'antd'
import {
  Button,
  Flex,
  Splitter,
  Input,
  Form,
} from 'antd'
import type { FormProps } from 'antd'

const { Header, Content } = Layout

import type { MemeVariantStyle, MemeVariantFormat, MemeVariantRole } from '@/entities'
import {
  AdminVariantManager,
  createMemeAction,
  getFileFormat,
  type VariantDraft
} from '@/features'

type FieldType = {
  title?: string
  description?: string
  slug?: string
};

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
      variants: variants
        .filter((item) => item.file)
        .map((item) => ({
          file: item.file as File,
          style: item.style,
          format: item.format,
          role: item.role,
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

  const onFiles = (
    files: FileList | null,
  ) => {
    if (!files) return

    const next = Array.from(files).map(
      (file, index) => ({
        id: crypto.randomUUID(),

        file,

        fileUrl: URL.createObjectURL(file),

        format: getFileFormat(file),

        style: 'original',

        role: 'content',

        sortOrder:
          variants.length + index,
      }),
    )

    setVariants((prev) => [
      ...prev,
      ...next,
    ])
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
                  <label
                    className="
                      flex
                      min-h-[220px]
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-zinc-700
                      bg-zinc-900
                      p-10
                      text-zinc-400
                    "
                  >
                    <input
                      type="file"
                      multiple
                      hidden
                      accept="
                        image/*,
                        video/*,
                        .gif,
                        .webp
                      "
                      onChange={(e) =>
                        onFiles(e.target.files)
                      }
                    />

                    Upload variants
                  </label>

                  <AdminVariantManager
                    variants={variants}
                    setVariants={setVariants}
                  />
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