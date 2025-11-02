
'use client'

import { useState , useEffect} from 'react';
import { Flex } from 'antd';

export default function Home() {

  const [userCount, setUserCount] = useState();

  useEffect(()=> {
    fetch('/api/total')
      .then(res => res.json())
      .then(data =>  {
         setUserCount(data)
         // console.log("ssss222dd", data) 
        });

  }, []);
  
  return (
    <Flex gap="middle" vertical>
      {
        userCount && <>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>총 가입자 수</div>
            <div style={{fontSize: 18, display: 'flex', gap:20 }}> 
              <span>{`남 : ${userCount?.manUser}`}</span>
              <span>{`여 : ${userCount?.womanUser}`}</span>
            </div>
        </>
      }
    </Flex>
  );
}
