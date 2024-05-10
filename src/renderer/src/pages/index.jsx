import React, { useState, useCallback } from 'react'
import { VChart } from '@visactor/react-vchart'
import { Layout, Nav } from '@douyinfe/semi-ui'
import {
  IconBytedanceLogo,
  IconGridView1,
  IconKanban,
  IconLayers,
  IconMinus,
  IconListView
} from '@douyinfe/semi-icons'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom/dist'
import Titles from './Titles'
export function Index() {
  const { Header, Sider, Content } = Layout

  return (
    <Layout style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Header
        style={{
          width: '100vw',
          height: '10vh'
        }}
      >
        <Titles></Titles>
      </Header>
      <Layout style={{ maxheight: '90vh' }}>
        <Sider
          style={{
            backgroundColor: 'var(--semi-color-bg-1)',
            border: '1px solid var(--semi-color-border)',
            height: '90vh'
          }}
        >
          <Nav
            renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
              return (
                <Link style={{ textDecoration: 'none' }} to={props.itemKey}>
                  {itemElement}
                </Link>
              )
            }}
            defaultSelectedKeys={['zt']}
            style={{ maxWidth: 220, height: '90vh' }}
            items={[
              {
                itemKey: 'zt',
                text: '涨停',
                icon: <IconMinus size="large" />
              },
              {
                itemKey: 'fenshi',
                text: '涨停分时',
                icon: <IconMinus size="large" />
              },
              {
                itemKey: 'bk',
                text: '板块',
                icon: <IconLayers size="large" />
              },
              {
                itemKey: 'qxzqb',
                text: '情绪周期表',
                icon: <IconGridView1 size="large" />
              },
              {
                itemKey: 'ltt',
                text: '龙图腾',
                icon: <IconKanban size="large" />
              },
              {
                itemKey: 'lhb',
                text: '龙虎榜',
                icon: <IconListView size="large" />
              }
            ]}
            header={{
              logo: <IconBytedanceLogo style={{ fontSize: 32, color: 'red' }} />,
              text: '短线复盘'
            }}
            footer={{
              collapseButton: true
            }}
          />
        </Sider>
        <Content style={{ backgroundColor: 'var(--semi-color-bg-1)', height: '90vh' }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
