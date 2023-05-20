
import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { DatePicker as TDatePicker, DatePickerProps, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Input, Button, Modal, Table, Space, Select, Form, message } from 'antd';
import './index.less'
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'umi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';
const DatePicker: any = TDatePicker;



const { Header, Content, Sider } = Layout;

interface DataType {
  key: number;
  time: string;
  classname: string;
  name: string;
}

const data: DataType[] = [
  {
    key: 1,
    name: '期中',
    time: '2022-1-1',
    classname: '数学',
  },
  {
    key: 2,
    name: '期末',
    time: '2022-1-1',
    classname: '语文',
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
          label: <Link to="/index">学员管理</Link>,
        },
        {
          key: '3',
          label: <Link to="/">成绩信息</Link>,
        },
        {
          key: '4',
          label: <Link to="/user">课程管理</Link>,
        }]
      )
    };
  },
);

const InfoPage: React.FC = () => {
  const [grade, setGrade] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectList, setSelectList] = useState<DataType[]>([...data]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '考试时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '考试科目',
      dataIndex: 'classname',
      key: 'classname',
    },
    {
      title: '操作',
      key: 'action',
      render: (data, info, index) => {
        console.log('data = ', data, 'info =', info, 'index=', index)
        return <Space>
          <Link to="./user">
            <Button type="link">查看详情</Button>
          </Link>
          <Button type="link" onClick={() => showEditModal(data)}>
            修改
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

  const onAddIndex = (name: string, time: string) => {
    console.log('name=');

    const newOption = {
      key: selectList.length + 1,
      name: name,
      time: time,
      classname: grade,
    }
    selectList.push(newOption);
    setSelectList([...selectList])

  };

  const handleCancel1 = () => {
    setShowModalOpen(false);
  };


  const onDelIndex = (info: DataType) => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      content: '是否删除当前考试信息',

      onOk: () => {
        const { key } = info;
        const newList = selectList.filter((_) => _.key !== key)
        setSelectList([...newList]);
      },
      onCancel: () => { }

    })

  }
  const handleOk = () => {
    onAddIndex(name, time)
    setIsModalOpen(false);
    setName('')
  };
  const nameChange = (e: { target: { value: any; }; }) => {
    //setName(value.target.value.replace(/(^\s*)|(\s*$)/g, ''))
    setInfo({ ...info, name: e.target.value })
    // setInfo({...info, name: value})
  }
  const nameChange2 = (e: { target: { value: any; }; }) => {
    //setName(value.target.value.replace(/(^\s*)|(\s*$)/g, ''))
    // setName(value.target.value.replace(/(^\s*)|(\s*$)/g, ''))
    setInfo({ ...info, name: e.target.value })
    console.log('value =', e.target.value)
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
  const handleLessoChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChange = (value: string) => {
    // setGrade(value)
    setInfo({...info,classname:value})
    console.log(`selected ${value}`);
  };



  const defaultParams: any = {
    key: '',
    name: '',
    time: '',
    classname: '',
  }
  const [info, setInfo] = useState<any>(defaultParams);
  const showEditModal = (infos: any) => {
    setInfo(infos)
    setisEditModalOpen(true);
    const { key } = info;
    const newList = [...selectList]
    const newContent = selectList.findIndex((_) => _.key === key)
    console.log('newContent=',newContent,'info=',info)
    if(newContent>=0){
      newList[newContent] = info;
      setSelectList([...selectList])
    }
  };




  const editModalOnOK = () => {
    setIsModalOpen(false);
    const { key } = info;
    const newList = [...selectList];
    const newContent = newList.findIndex((_) => _.key === key)
    console.log('newContent=',newContent,'info=',info)
    if(newContent>=0){
      newList[newContent] = info;
      setSelectList(newList)
    } }
    // const { key } = info;
    // const newContent = selectList.findIndex((_) => _.key === key)
    // console.log('newContent=',newContent,'info=',info)
    // if(newContent>=0){
    //   selectList[newContent] = info
    //   setSelectList(selectList)
    // }
    setisEditModalOpen(false)
    // setId('')
    // setName('')
 
  const editModalCanel = () => {
    setisEditModalOpen(false)
  }
  const timeChange = (value: any, dateString: any) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setTime(dateString)
  }
  function onOk(value: any) {
    console.log('onOk: ', value);
    value = dayjs(value).format('YYYY-MM-DD')
  }

  const gradesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

  return (
    <Layout  className='layout-all'>
      <Header className='layout-header'>
      </Header>
      <Layout>
        <Sider className='layout-sider' >
          <Menu
            mode="inline"
            defaultSelectedKeys={['3']}
            defaultOpenKeys={['1']}
            className='menu-sider'
            items={items2}
          />
        </Sider>
        <Layout>
          <Content className='layout-concent'>
            <div className='btn-top'>
              <div>考试名称：</div>
              <div><Input placeholder="考试名称" className='input-top' value={name} /></div>
              <div style={{ marginLeft: 24 }}>科目：</div>
              <div>
                <Select
                  // value={info.classname}
                  className='select-top'
                  onChange={handleLessoChange}
                  options={[
                    { value: '语文', label: '语文' },
                    { value: '数学', label: '数学' },
                    { value: '英语', label: '英语' },
                    { value: '生物', label: '生物' },
                    { value: '化学', label: '化学' },
                    { value: '物理', label: '物理' },

                  ]}
                />
              </div>
              <div><Button type='primary' className='btn-Search'>搜索</Button></div>
              <div><Button onClick={showModal} className='btn-Search'>成绩录入</Button></div>
            </div>
            <div className='concent-modal'>
              <div>


                {/* 新增考试信息 */}
                <Modal title={info.key?'新增考试信息':'修改考试信息'} open={isModalOpen} onOk={editModalOnOK} onCancel={handleCancel}  className='modal-all' >
                  
                  <div>
                    <p>考试名称<span className='span-color'>*</span></p>
                    <Input placeholder="请输入考试名称" value={info.name} onChange={nameChange} className='input-len' showCount maxLength={20} />
                  </div>
                  <div className='modal-input'>
                    <p>考试时间<span className='span-color'>*</span></p>
                    <DatePicker className='input-len' format={dateFormat} onChange={timeChange} onOk={onOk} defaultValue={dayjs(`${info.time}`)}
                    />
                  </div>
                  <div className='modal-input'>
                    <p>考试科目<span className='span-color'>*</span></p>
                    <Select
                      className='select-senter'
                      value={info.classname}
                      onChange={handleChange}
                      options={[
                        { value: '语文', label: '语文' },
                        { value: '数学', label: '数学' },
                        { value: '英语', label: '英语' },
                        { value: '生物', label: '生物' },
                        { value: '化学', label: '化学' },
                        { value: '物理', label: '物理' },
                      ]}
                    />
                  </div>
                  <div>
                    <p>成绩录入<span className='span-color'>*</span></p>
                    <TextArea
                      style={{ height: 120, resize: 'none' }}
                      onChange={gradesChange}
                      placeholder="请输入内容"
                    />
                  </div>
                </Modal>
                <Modal title="提示" open={showModalOpen} onOk={handleOkSplice} onCancel={handleCancel1}>
                  <p >是否要删除学员</p>
                </Modal>

                {/* 修改考试信息 */}

                <Modal title="修改考试信息" open={isEditModalOpen} onOk={editModalOnOK} onCancel={editModalCanel}>
                  <div>
                    <p>考试名称<span className='span-color'>*</span></p>
                    <Input placeholder="请输入姓名" value={info.name} onChange={nameChange2} style={{ width: 400 }} showCount maxLength={20} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <p>考试时间<span className='span-color'>*</span></p>
                    <DatePicker style={{ width: 200 }} format={dateFormat} onChange={timeChange} onOk={onOk} defaultValue={dayjs(`${info.time}`)} />
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14 }}>
                    <p>班级：</p>
                    <Select
                      value={info.classname}
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        { value: '语文', label: '语文' },
                        { value: '数学', label: '数学' },
                        { value: '英语', label: '英语' },
                        { value: '生物', label: '生物' },
                        { value: '化学', label: '化学' },
                        { value: '物理', label: '物理' },
                      ]}
                    />
                  </div>  
                </Modal>
              </div>
              <div>
                <div >
                  <Table className='table-style' columns={columns} dataSource={selectList} pagination={{ pageSize: 7 }} />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default InfoPage;