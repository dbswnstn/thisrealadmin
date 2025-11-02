
'use client'
import React, { useState , useEffect} from 'react';
import { Button, Flex, Table } from 'antd';

export default function IdentificationCheck() {
 
  useEffect(()=> {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => { console.log("ssss", data.message) });
  }, []);
  
  return (
    <Flex gap="middle" vertical>
       <div>신원 인증 심사</div>
    </Flex>
  );
}
