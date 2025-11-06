import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonStringifyWithBigInt } from '@/utils/function';

export async function GET() {

  const [manUser, womanUser] = await Promise.all([
    prisma.user.findMany({ where : { gender: "1", user_status: "00" }}), // 남성
    prisma.user.findMany({ where : { gender: "2", user_status: "00" }}), // 여성
  ]);
  
  return NextResponse.json({ manUser: jsonStringifyWithBigInt(manUser),womanUser: jsonStringifyWithBigInt(womanUser)});
}