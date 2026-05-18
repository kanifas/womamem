'use client'

import { FC, useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Splitter,
  Input,
  Form,
} from 'antd'
import type {
  FormProps,
} from 'antd'


// import type { MemeVariantStyle, MemeVariantFormat, MemeVariantRole } from '@/entities'
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
  const [sizes, setSizes] = useState<(number | string)[]>(['50%', '50%'])
  const [variants, setVariants] = useState<VariantDraft[]>([])
  const [form] = Form.useForm();
  // const [errors, setErrors] = useState<ReturnType<typeof form.getFieldsError>>([])

  // 1. Отслеживаем поле 'username' без перерисовки всей формы
  const slugValue = Form.useWatch('slug', form);
  // 1. Отслеживаем поле 'username' без перерисовки всей формы
  const titleValue = Form.useWatch('title', form);
  // 1. Отслеживаем поле 'username' без перерисовки всей формы
  const descriptionValue = Form.useWatch('description', form);

  // 2. Получаем массив ошибок всех полей
  const fieldsError = form.getFieldsError();

  // 3. Вычисляем: есть ли хотя бы одна ошибка в форме
  // hasErrors возвращает true, если поле touched (тронуто) И имеет ошибки
  const hasErrors = fieldsError.some(({ errors }) => errors.length > 0);

  // 4. Проверяем, являются ли поля 'touched' (чтобы не блокировать кнопку до ввода)
  // Для этого можно использовать form.isFieldsTouched(true)
  const isTouched = form.isFieldsTouched(true);

  const checkErrors = () => {
    form.validateFields()
      .then(() => {
        console.log('Ошибок нет');
      })
      .catch((errorInfo) => {
        console.log('Найдены ошибки:', errorInfo);
        // errorInfo.errorFields — массив объектов с ошибками
      });
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const validVariants = variants.filter(item => item.file)

    if (validVariants.length === 0) {
      return
    }

    const invalidVideo = validVariants.find(variant => variant.format === 'video' && !variant.posterFile)
    if (invalidVideo) {
      alert('Каждому видео обязателен Poster')
      return
    }

    const result = await createMemeAction({
      title: values.title!,
      slug: values.slug!,
      description: values.description,
      variants: validVariants
        .filter((item) => item.file)
        .map((item) => ({
          file: item.file as File,
          posterFile: item.posterFile,
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
      (file, index): VariantDraft => ({
        id: crypto.randomUUID(),
        file,
        fileUrl: URL.createObjectURL(file),
        format: getFileFormat(file),
        style: 'original',
        role: 'content',
        sortOrder: variants.length + index,
      }),
    )

    setVariants((prev) => [
      ...prev,
      ...next,
    ])
  }

  return (
    <div>
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

              {variants.some((v) => v.format === 'video' && !v.posterFile) && (
                <div
                  className="
                    mb-4
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-500/10
                    p-3
                    text-sm
                    text-red-300
                  "
                >
                  All video variants must have poster
                </div>
              )}
              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    variants.length === 0 || variants.some(v => v.format === 'video' && !v.posterFile)
                    || !isTouched
                    || hasErrors
                  }
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Splitter.Panel>
        </Splitter>
      </Flex>
    </div>
  );
};

export default App;