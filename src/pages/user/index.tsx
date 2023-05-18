

import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { DatePicker as TDatePicker, DatePickerProps, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Input, Button, Card, Avatar, Carousel, Modal } from 'antd';
import './index.less'
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'umi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Chart, Interval, Tooltip, getTheme } from 'bizcharts';



dayjs.extend(customParseFormat);

const { Header, Content, Sider } = Layout;

const data = [
  { name: '第一名', sales: 1 },
  { name: '第二名', sales: 5 },
  { name: '第三名', sales: 10 },
  { name: '第四名', sales: 15 },
  { name: '第五名', sales: 17 },
  { name: '第六名', sales: 20 },
  { name: '第七名', sales: 30 },
  { name: '第八名', sales: 38 },
];
const getMockCardList = (count: number, prexName: string) => {
  const result: any[] = []
  for(let i = 0; i < count; i++) {

    result.push({
      key: i,
      avatar:`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
      name: `${prexName}-学员-${i}`,
      fraction: (Math.floor(Math.random() * 100) + 10) % 100
    })
  }
  return result;
}

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
          label: <Link to="/info">成绩信息</Link>,
        },
        {
          key: '4',
          label: <Link to="/">课程管理</Link>,
        }]
      )
    };
  },
);
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const UserPage: React.FC = () => {
  const [cardList, setCardList] = useState<any[]>(getMockCardList(15, '一班'))
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const onSortClick =() => {
    setCardList(getMockCardList(15,'二班'))
  }
  /**
   * 
   * @desc 学生成绩卡片列表
   */
  const renderCardList = () => {

    return cardList.map((_: any, index:number) => {
      return <Card  className='card-everyone' key={`card-${index}-${_.id}`}>
      <div className='card-list'>
        <div> <Avatar src={_.avatar} size='large' /></div>
        <div className='card-subjects'>
          <div>{_.name}</div>
          <div className='card-fraction'>分数:{_.fraction}</div>
        </div>
      </div>
    </Card>
    })
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='dsfcsdfbkukj'>

      </Header>
      <Layout>
        <Layout>
          <Content className='concent-card'>
            <div>      <Link to="./info">
              <Button className="e-button" type="link">返回</Button>
            </Link></div>
            <div>
              <div><h1 style={{ fontSize: 16 }}>考试详情信息</h1></div>
              <div>考试科目</div>
              <div className='center-card'>
                  <div className='card-all'>
                    {renderCardList()}
                </div>
              </div>
              <div className='btn-bootom'>
                <div><Button onClick={onSortClick}>排序</Button></div>
                <div>
                  <Link to="./carousel">
                    <Button className="e-button" type="primary">状元</Button>
                  </Link>
                </div>
              </div>
              <div className='chart'>
                <Chart height={300} autoFit data={data} >
                  <Interval position="name*sales" style={{ lineWidth: 4, stroke: getTheme().colors10[0] }} />
                  <Tooltip shared />
                </Chart>
              </div>
              {/* <div>
                <Carousel afterChange={onChange}>
                  <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div> 
                  </Carousel>
              </div> */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserPage;