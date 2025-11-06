import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonStringifyWithBigInt } from '@/utils/function';

export async function GET() {

  const oneWeekAgo = new Date();
  new Date().setDate(oneWeekAgo.getDate() - 7);

  const matches = await prisma.match_user.findMany({ orderBy: { created_at: 'desc' }});

  return NextResponse.json(jsonStringifyWithBigInt(matches));
}