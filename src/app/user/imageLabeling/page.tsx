
'use client'
import React, { useState , useEffect} from 'react';
import { Button, Flex, Table } from 'antd';

export default function ImageLabeling() {
 
  useEffect(()=> {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => 
         {
          console.log("ssss", data.message) 
        
        });

  }, []);
  
  return (
    <Flex gap="middle" vertical>
       <div>프로필 이미지 라벨링</div>
    </Flex>
  );
}
