import '../../style/pages/Home.css';
import { Card, Col, Layout, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useTranslation } from 'react-i18next';
import SelectLanguage from '../../components/SelectLanguage';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuLists = [1, 2, 3];

  const handleClickCard = (menu: number) => () => {
    if (menu === 2) return;

    navigate(`test${menu}`);
  };

  return (
    <Layout className="layout">
      <Content>
        <SelectLanguage className={'select-button'} />

        <Row className="home-content">
          <Col>
            <Space>
              {menuLists.map((num) => {
                const className = num !== 2 ? 'btn-card-menu' : 'btn-card-menu disabled';
                return (
                  <Card
                    key={`menu${num}`}
                    className={className}
                    title={t(`home.menu${num}.title`)}
                    onClick={handleClickCard(num)}
                  >
                    <p>{t(`home.menu${num}.description`)}</p>
                  </Card>
                );
              })}
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;
