import { BookOutlined, DesktopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { BooksPage } from './pages/books';
import { MoviesPage } from './pages/movies';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type StepOptions = 'movies' | 'books';

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Filmes', 'movies', <DesktopOutlined />),
  getItem('Livros', 'books', <BookOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [step, setStep] = useState<StepOptions>('movies');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    setStep(e.key as StepOptions);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={['movies']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {step === 'movies' && <MoviesPage />}

            {step === 'books' && <BooksPage />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Criado por Juan Pablo</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
