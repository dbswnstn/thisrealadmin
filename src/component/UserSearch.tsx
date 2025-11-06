
'use client'
import React, { useState , useEffect, forwardRef, ForwardedRef, useImperativeHandle} from 'react';

import { Button, Flex, Table, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';


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


type Gender = 'man' | 'woman';
interface DataType {
  key: React.Key;
  // 필요한 필드 추가
}

interface UserSearchProps {
  gender: Gender;
}

const UserSearch = forwardRef(function UserSearch(
  { gender }: UserSearchProps,
  ref: ForwardedRef<{
    getSelectedKeys: () => React.Key[];
  }>
) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    total: 0,
  });

  const handleTableChange: TableProps<DataType>['onChange'] = (
    paginationInfo
  ) => {
    console.log('pagination changed', paginationInfo);
    setPagination((prev) => ({
      ...prev,
      current: paginationInfo.current ?? prev.current,
      pageSize: paginationInfo.pageSize ?? prev.pageSize,
    }));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 60,
  };

  // 💡 부모에서 사용할 수 있는 메서드 정의
  useImperativeHandle(ref, () => ({
    getSelectedKeys() {
      return selectedRowKeys;
    },
  }));

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10}}>
        <div style={{ fontSize: 16 }}> 
          {`선택한 ${gender === 'woman' ? '여자' : '남자'} 수: ${
            selectedRowKeys.length
          }`}
        </div>
        <div>
          <Button type='primary' size='middle' onClick={() => setSelectedRowKeys([])}>
              초기화
          </Button>
        </div>
      </div>
     
      <Table<DataType>
        rowClassName={() => 'custom-row'}
        scroll={{ y: '50vh' }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter'],
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['100', '500', '1000'],
          defaultPageSize: 100,
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => {
            // ✅ 클릭 시 선택/해제 토글
            const selected = selectedRowKeys.includes(record.key);
            const newSelectedKeys = selected
              ? selectedRowKeys.filter((k) => k !== record.key)
              : [...selectedRowKeys, record.key];
  
            setSelectedRowKeys(newSelectedKeys);
          },
        })}
      />
    </div>
  );
});

export default UserSearch;