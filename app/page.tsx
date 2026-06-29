'use client';

import Main_Content from '@/components/layout/main_content';
import Layout_Header from '@/components/layout/header';
import Layout_Sider from '@/components/layout/sider';
import Mobile_Controls from '@/components/layout/mobile_controls';
import { Layout, Spin, theme } from 'antd';
import { useState } from 'react';
import { categories } from '@/lib/constants/constants';
import { useInventory } from '@/lib/contexts/inventory-context';
const { Header, Sider, Content } = Layout;

export default function Home() {
  const { token } = theme.useToken();
  const [activeCategory, setActiveCategory] = useState('All');
  const state = useInventory();
  if (!state.isReady) {
    return (
      <div
        className='flex min-h-screen items-center justify-center'
        style={{
          background: token.colorBgLayout,
        }}
      >
        <Spin size='large' description='Loading inventory...' />
      </div>
    );
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: token.colorBgLayout,
      }}
    >
      <Header
        style={{
          height: 'auto',
          padding: 16,
          background: token.colorBgLayout,
        }}
      >
        <Layout_Header />
      </Header>

      <Layout
        hasSider
        style={{
          background: token.colorBgLayout,
          padding: '0 16px 16px',
          gap: 16,
        }}
      >
        <Sider
          width={330}
          trigger={null}
          className='hidden lg:block'
          style={{
            background: 'transparent',
          }}
        >
          <Layout_Sider />
        </Sider>

        <Content className='pb-28 lg:pb-0'>
          <Main_Content
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </Content>
      </Layout>

      <Mobile_Controls
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />
    </Layout>
  );
}
