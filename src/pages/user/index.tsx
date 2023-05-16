/*
 * @Author: wyf 1017618540@qq.com
 * @Date: 2023-05-16 14:14:47
 * @LastEditors: wyf 1017618540@qq.com
 * @LastEditTime: 2023-05-16 14:58:16
 * @FilePath: \new-app\src\pages\user\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'
import { Link } from 'react-router-dom';
const { Header, Content ,Sider} = Layout;

const items2: MenuProps['items'] = [UserOutlined].map(
    (icon) => {
  
      return {
        key: '1',
        icon: React.createElement(icon),
        label: `内容管理`,
  
        children: (
          [{
            key: '2',
            label: <Link to="/index">学员管理</Link>,
          },
          {
            key: '3',
            label: <Link to="/">成绩信息</Link>,
          }, 
          {
            key: '4',
            label: <Link to="/info">课程管理</Link>,
          }]
        )
      };
    },
  );
const UserPage:React.FC = ()=> {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'white', height: 50 }}>
      </Header>
      <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['3']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
      <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
        信息页面
      </Content>
    </Layout>
  );
}

export default UserPage;
