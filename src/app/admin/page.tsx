'use client'

import { FC } from 'react';
import Link from 'next/link';
import { Card, Col, Row, Statistic } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

const App: FC = () => {
  return (
    <div>
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
          <Link href="/admin/create">
            <Card title="Other..." variant="outlined" hoverable style={{textAlign: 'center'}}>

            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' hoverable>
            <Statistic title="Конверсия" value={11.28} precision={2} suffix="%" />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card variant='borderless' hoverable>
            <Statistic title="Выручка (₽)" value={542100} precision={0} />
          </Card>
        </Col>

      </Row>
    </div>
  );
};

export default App;