import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const fetchUsers = await prisma.user.findMany()
    return NextResponse.json(fetchUsers, { status: 200 })
  } catch (error) {
    console.log('Error fetching users', error)
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 })
  }
}
