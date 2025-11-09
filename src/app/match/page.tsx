
'use client'
import React, { useState , useEffect, useRef} from 'react';

import { Button, Flex, Table, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import UserSearch from '@/component/UserSearch';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' , width: '20%'},
  { title: 'Age', dataIndex: 'age', width: '20%'},
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

interface UserSearchHandle {
  getSelectedKeys: () => React.Key[];
}

export default function Match() {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
 
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false); 
  const userSearchRef = useRef<UserSearchHandle[]>([]);

  const [userList, setUserList] = useState<{manUser: [], womanUser:[]}>({manUser: [], womanUser:[]});


  const registerRef = (index: number, ref: UserSearchHandle | null) => {
    if (ref) {
      userSearchRef.current[index] = ref;
    }
  };

  const showModal = () => {
    setOpen(true);
    userSearchRef.current.forEach(element => {
      console.log("people element", element.getSelectedKeys());
    });
  };

  const handleOk = () => {
    alert("OK");
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(()=> {
    fetch('/api/userSearch')
      .then(res => res.json())
      .then(data =>  {
        setUserList(data);
        });
  }, []);



  return (
    <Flex gap='middle' vertical>
      <Flex gap="small" vertical>
        <UserSearch gender='man' ref={ref => registerRef(0, ref)} dataSource={userList.manUser}/>
        <UserSearch gender='woman' ref={ref => registerRef(1, ref)} dataSource={userList.womanUser} />
      </Flex>
      <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
        <Button type='primary' size='large' onClick={showModal}>
          매칭 하기
        </Button>
      </div>
      <Modal
        title="매칭 리스트"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <div>
          ddd
        </div>
      </Modal>
    </Flex>

  );
}
