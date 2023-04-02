import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: Request) {
  try {
    const data = await prisma.accounts.findMany()
    return NextResponse.json(data)
  } catch (error) {
    return new Response('Sorry, no data here', {
      status: 500
    })
  }
}
