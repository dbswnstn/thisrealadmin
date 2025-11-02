
'use client'
import React, { useState , useEffect} from 'react';

import { Button, Flex, Table } from 'antd';
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
  { title: 'Address', dataIndex: 'address',width:'10%' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

export default function Home() {
 
  useEffect(()=> {
    fetch('/api/total')
      .then(res => res.json())
      .then(data =>  {
          console.log("ssss222dd", data) 
        });

  }, []);
  
  

  return (
    
    <Flex gap="middle" vertical>
      <div>
        
      </div>
    </Flex>
  );
}
