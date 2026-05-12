'use client'

import { FC } from 'react';
import Link from 'next/link';
import { Layout, theme, Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ShoppingCartOutlined, PlusCircleTwoTone } from '@ant-design/icons';


const { Header, Content } = Layout;

// const menuItems = [
//   {
//     key: 'main',
//     label: <Link  href="/admin">Главная</Link>,
//   },
//   {
//     key: 'Настройки',
//     label: <a href="/admin/settings">Настройки</a>,
//   }
// ];

const App: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        /> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Ряд с плашками */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Link href="/admin/create">
                <Card title="Новый мем" variant="outlined" hoverable style={{textAlign: 'center'}}>
                  <PlusCircleTwoTone style={{fontSize: '80px'}} />
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic
                  title="Новые заказы"
                  value={93}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ShoppingCartOutlined />}
                  suffix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Конверсия" value={11.28} precision={2} suffix="%" />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Выручка (₽)" value={542100} precision={0} />
              </Card>
            </Col>

          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default App;