import { useTranslation } from 'react-i18next';
import '../../style/pages/Home.css';
import '../../style/pages/Test1.css';
import { Button, Col, Divider, Layout, Row, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import SelectLanguage from '../../components/SelectLanguage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const manageLists = (lists: Array<string>) => {
  const rowSize = 3;
  const rowCount = Math.ceil(lists.length / rowSize);
  const displayShape = Array.from({ length: rowCount }, (item, index) => {
    return lists.slice(index * rowSize, (index + 1) * rowSize);
  });

  return displayShape;
};

const initShape = ['trapezoid', 'rectangle', 'parallelogram', 'square', 'circle', 'oval'];

function Test1() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<Array<string>>(initShape);
  const [offsetValue, setOffsetValue] = useState<Array<number>>([6, 3]);

  const rowShape = manageLists(shapes);

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleClickMoveShape = (moveShape: 'left' | 'right') => {
    const newShapes = [...shapes];
    if (moveShape === 'left') {
      const firstShape = newShapes.shift();
      if (firstShape) newShapes.push(firstShape);
    } else {
      const lastShape = newShapes.pop();
      if (lastShape) newShapes.unshift(lastShape);
    }
    setShapes(newShapes);
  };

  const handleClickMovePosition = () => {
    const newShapes: string[] = [...shapes];
    const newOffsetValue: number[] = [...offsetValue];
    for (let index = 0; index < 3; index++) {
      const firstShape = newShapes.shift();
      if (firstShape) newShapes.push(firstShape);
    }

    const firstOffsetValue = newOffsetValue.shift();
    if (firstOffsetValue) newOffsetValue.push(firstOffsetValue);

    setShapes(newShapes);
    setOffsetValue(newOffsetValue);
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: 20 }}>
        <Row>
          <Col span={18}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {t('test1.title')}
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <SelectLanguage />
              <Button onClick={handleClickHome}>{t('homepage')}</Button>
            </Space>
          </Col>
        </Row>

        <Content style={{ padding: '50px 100px' }}>
          {/* Header Button */}
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={() => handleClickMoveShape('left')}>
                <div className="left-triangle"></div>
                {/* Label Button */}
                <div className="label-btn-move">{t('test1.moveShape')}</div>
              </Button>
            </Col>

            <Col span={12}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={handleClickMovePosition}>
                <div className="up-triangle"></div>
                <div className="down-triangle"></div>
                {/* Label Button */}
                <div className="label-btn-move">{t('test1.movePosition')}</div>
              </Button>
            </Col>

            <Col span={6}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={() => handleClickMoveShape('right')}>
                <div className="right-triangle"></div>
                {/* Label Button */}
                <div className="label-btn-move">{t('test1.moveShape')}</div>
              </Button>
            </Col>
          </Row>

          <Divider />

          {rowShape.map((row, index) => (
            <Row key={`row-${index}`} gutter={16} style={{ padding: '8px 0px' }}>
              {row.map((sharp, idx) => {
                if (idx === 0) {
                  return (
                    <Col key={sharp} offset={index % 2 === 0 ? offsetValue[0] : offsetValue[1]} span={6}>
                      <Button className="btn-sharp" type="ghost">
                        <div className={sharp}></div>
                      </Button>
                    </Col>
                  );
                } else {
                  return (
                    <Col key={sharp} span={6}>
                      <Button className="btn-sharp" type="ghost">
                        <div className={sharp}></div>
                      </Button>
                    </Col>
                  );
                }
              })}
            </Row>
          ))}
        </Content>
      </Content>
    </Layout>
  );
}

export default Test1;
