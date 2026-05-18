'use client'

import Link from 'next/link'

import {
  Layout,
  Menu,
  theme,
} from 'antd'

import {
  AppstoreOutlined,
  PlusSquareOutlined,
  PictureOutlined,
} from '@ant-design/icons'

const {
  Sider,
  Content,
  Header,
} = Layout

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    token: {
      colorBgContainer,
    },
  } = theme.useToken()

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        width={240}
        theme="dark"
      >
        <div
          className="
            px-6
            py-5
            text-xl
            font-bold
            text-white
          "
        >
          Meme Admin
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'dashboard',
              icon: <AppstoreOutlined />,
              label: (
                <Link href="/admin">
                  Dashboard
                </Link>
              ),
            },

            {
              key: 'memes',
              icon: <PictureOutlined />,
              label: (
                <Link href="/admin/memes">
                  Memes
                </Link>
              ),
            },

            {
              key: 'create',
              icon: <PlusSquareOutlined />,
              label: (
                <Link href="/admin/create">
                  Create Meme
                </Link>
              ),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            borderBottom:
              '1px solid rgba(255,255,255,0.06)',
          }}
        />

        <Content
          style={{
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}