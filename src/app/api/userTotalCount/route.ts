import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    const [manUser, womanUser] = await Promise.all([
        prisma.user.count({ where: { gender: "1" , user_status: "00" } }), // 남성
        prisma.user.count({ where: { gender: "2" , user_status: "00" } }), // 여성
      ]);
      
      console.log("manUsermanUser", manUser);
  

    return NextResponse.json({ manUser, womanUser});
}