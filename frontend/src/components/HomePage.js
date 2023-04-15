import { Layout, theme } from 'antd';
import Map from './Map';
import SearchBox from './SearchBox';
import ToiletService from '../service/ToiletService';
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    ToiletService.getToilets();
  }, []);

  return (
    <Layout className="layout">
      <Header
        style={{
        position: 'sticky',
        marginBottom: '25px',
        zIndex: 1,
        width: '100%',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            color: 'white',
            textAlign: 'center',
            lineHeight: '31px',
            fontSize: 'large',
            fontWeight: 'bold',
            fontStyle: 'oblique',
            cursor: 'pointer'
          }}
        >
        HK Toilet Map
        </div>
        <div
          style={{
            marginTop: '-8px'
          }}
        >
          <SearchBox />
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Map />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        HK Toilet Map ©2023 Created by HKUST students
      </Footer>
    </Layout>
  );
};

export default HomePage;