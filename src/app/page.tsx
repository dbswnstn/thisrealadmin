
'use client'
import React, { useState , useEffect} from 'react';

import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { unstableSetRender } from 'antd'
import { createRoot } from 'react-dom/client'

// ✅ React 19 호환용 antd 설정 (최상단에서 한 번만 실행)
unstableSetRender((node, container) => {
  //@ts-ignore
  container._reactRoot ||= createRoot(container)
  //@ts-ignore
  const root = container._reactRoot
  root.render(node)
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    root.unmount()
  }
})

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

export default function Home() {
 
  useEffect(()=> {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => 
         {
          console.log("ssss", data.message) 
        
        });

  }, []);
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    total: 0,
  });

  const handleTableChange: TableProps<DataType>['onChange'] = (paginationInfo) => {
    console.log("ssdsfds", paginationInfo);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType>
         rowClassName={() => 'custom-row'}
        scroll={{ y: 500 }}
       rowSelection={rowSelection} 
       columns={columns}
        dataSource={dataSource} 
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true, // 페이지당 개수 변경 기능
          showQuickJumper: true, // 페이지 번호 직접 입력
          pageSizeOptions: ['100', '500', '1000'],
          defaultPageSize: 100
        }}
        onChange={handleTableChange}
        
        />
    </Flex>
  );
}
