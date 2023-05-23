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

  const onClickHomepage = () => {
    navigate(`/`);
  };

  const onClickMoveShape = (moveShape: 'left' | 'right') => {
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

  const onClickMovePosition = () => {
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

  const onClickRandomShape = () => {
    let copyShapes: string[] = [...shapes];
    const newShapes: string[] = [];

    while (copyShapes.length > 0) {
      const randomIndexShape = Math.floor(Math.random() * copyShapes.length);
      const randomShape = copyShapes[randomIndexShape];
      copyShapes = [...copyShapes.filter((shape) => shape !== randomShape)];
      newShapes.push(randomShape);
    }

    setShapes(newShapes);
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
              <Button onClick={onClickHomepage}>{t('homepage')}</Button>
            </Space>
          </Col>
        </Row>

        <Content style={{ padding: '50px 100px' }}>
          {/* Header Button */}
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={() => onClickMoveShape('left')}>
                <div className="left-triangle" />
                {/* Label Button */}
                <div className="label-btn-move">{t('test1.moveShape')}</div>
              </Button>
            </Col>

            <Col span={12}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={onClickMovePosition}>
                <div className="up-triangle" />
                <div className="down-triangle" />
                {/* Label Button */}
                <div className="label-btn-move">{t('test1.movePosition')}</div>
              </Button>
            </Col>

            <Col span={6}>
              <Button className="btn-sharp btn-move" type="ghost" onClick={() => onClickMoveShape('right')}>
                <div className="right-triangle" />
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
                      <Button className="btn-sharp" type="ghost" onClick={onClickRandomShape}>
                        <div className={sharp} />
                      </Button>
                    </Col>
                  );
                } else {
                  return (
                    <Col key={sharp} span={6}>
                      <Button className="btn-sharp" type="ghost" onClick={onClickRandomShape}>
                        <div className={sharp} />
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
