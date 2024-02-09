import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const fetchNotes = await prisma.notes.findMany()

  return NextResponse.json(fetchNotes, { status: 200 })
}
