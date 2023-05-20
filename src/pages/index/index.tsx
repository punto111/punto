
import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Input, Button, Modal, Table, Space, Select, Form, message,InputNumber } from 'antd';
import './index.less'
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'umi';


const { Header, Content, Sider } = Layout;

interface DataType {
  key: number;
  name: string;
  classname: string;
  age: number;
  serial: Number;
}

const data: DataType[] = [
  {
    key: 1,
    serial: 1,
    name: '周杰伦',
    classname: '三年级二班',
    age: 18888888888,
  },
  {
    key: 2,
    serial: 2,
    name: '林俊杰',
    classname: '三年级二班',
    age: 18888888888,
  },
];


const items2: MenuProps['items'] = [UserOutlined].map(
  (icon) => {

    return {
      key: '1',
      icon: React.createElement(icon),
      label: `内容管理`,

      children: (
        [{
          key: '2',
          label: <Link to="/">学员管理</Link>,
        },
        {
          key: '3',
          label: <Link to="/user">成绩信息</Link>,
        }, 
        {
          key: '4',
          label: <Link to="/info">课程管理</Link>,
        }]
      )
    };
  },
);

const IndexPage: React.FC = () => {
  const [grade, setGrade] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [selectList, setSelectList] = useState<DataType[]>([...data]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);



  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所在班级',
      dataIndex: 'classname',
      key: 'classname',
    },
    {
      title: '联系电话',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => {
        console.log('data = ', data)
        return <Space size="middle">
          <Button type="link" onClick={showEditModal}>
            编辑
          </Button>
          <Button type="link" onClick={() => onDelIndex(data)}>
            删除
          </Button>

        </Space>
      },
    }]

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onAddItemByIndex = (name: string, phone: string) => {
    console.log('name=', 'phone=');

    const newData = {
      key: selectList.length + 1,
      serial: selectList.length + 1,
      name: name,
      age: Number(phone),
      classname: grade,
    }
    selectList.push(newData);
    setSelectList([...selectList])

  };

  const handleCancel1 = () => {
    setShowModalOpen(false);
  };


  const onDelIndex = (info: DataType) => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      content: (
        <div>
          <p>确定要删除此学员信息吗？</p>
        </div>
      ),

      onOk: () => {
        const { key } = info;
        const findIndex = selectList.findIndex((_) => _.key === key)
        console.log(' findIndex = ', findIndex);
        if (findIndex >= 0) {
          selectList.splice(findIndex, 1);
          setSelectList([...selectList])
        }
      },
      onCancel: () => { }

    })

  }
  
  const handleOk = () => {
    onAddItemByIndex(name, id)
    setIsModalOpen(false);
    setId('')
    setName('')
  };
  const nameChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setName(value.target.value.replace(/(^\s*)|(\s*$)/g, ''))

  }

  const phoneChange = (value: React.ChangeEvent<HTMLInputElement>) => {

    setId(value.target.value.replace('^1[3-9]\d{9}$', "g"))

  }

  const handleOkSplice = () => {
    setShowModalOpen(false);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setShowModalOpen(false);
    setId('')
    setName('')
  };

  const handleChange = (value: string) => {
    setGrade(value)
    console.log(`selected ${value}`);
  };

  const showEditModal = () => {
    setisEditModalOpen(true);
  };
  const editModalOnOK = () => {
    setisEditModalOpen(false)
    setId('')
    setName('')
  }
  const editModalCanel = () => {
    setisEditModalOpen(false)
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'white', height: 50 }}>
      </Header>
      <Layout>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
            <div className='btn-top'>
              <div><Input placeholder="学员姓名" className='input-top' /></div>
              <div><Button type='primary' style={{ marginLeft: 24 }}>搜索</Button></div>
              <div><Button onClick={showModal} style={{ marginLeft: 24 }}>新增学员</Button></div>
            </div>
            <div style={{ marginTop: 24, }}>
              <div>
                <Modal title="新增学员信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600} >
                  <div>
                  <p>姓名<span style={{ color: 'red' }}>*</span></p>
                    <Input placeholder="请输入姓名" value={name} onChange={nameChange} style={{ width: 400 }} showCount maxLength={20} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                  <p>电话号码<span style={{ color: 'red' }}>*</span></p>
                    <Input placeholder="请输入正确号码" value={id} onChange={phoneChange} style={{ width: 400 }} showCount maxLength={20} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <p>班级：</p>
                    <Select
                      defaultValue=""
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        { value: '一年级一班', label: '一年级一班' },
                        { value: '二年级二班', label: '二年级二班' },
                        { value: '三年级三班', label: '三年级三班' },
                        { value: '四年级四班', label: '四年级四班' },
                        { value: '五年级五班', label: '五年级五班' },
                        { value: '六年级六班', label: '六年级六班' },

                      ]}
                    />
                  </div>
                </Modal>
                <Modal title="编辑学员信息" open={isEditModalOpen} onOk={editModalOnOK} onCancel={editModalCanel}>
                  <div>
                    <p>姓名<span style={{ color: 'red' }}>*</span></p>
                    <Input placeholder="请输入姓名" value={name} onChange={nameChange} style={{ width: 400 }} showCount maxLength={20} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                  <p>电话号码<span style={{ color: 'red' }}>*</span></p>
                    <Input placeholder="请输入正确号码" value={id} onChange={phoneChange} style={{ width: 400 }} showCount maxLength={20} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <p>班级：</p>
                    <Select
                      defaultValue="一年级"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        { value: '一年级', label: '一年级' },
                        { value: '二年级', label: '二年级' },
                        { value: '三年级', label: '三年级' },
                        { value: '四年级', label: '四年级' },
                        { value: '五年级', label: '五年级' },
                        { value: '六年级', label: '六年级' },

                      ]}
                    />
                  </div>
                </Modal>
              </div>
              <div>
                <div >
                  <Table className='table-style' columns={columns} dataSource={selectList} pagination={{pageSize:7}} />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default IndexPage;