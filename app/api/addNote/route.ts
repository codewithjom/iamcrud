import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const addNote = await prisma.notes.create({
    data: {
      title: body.title,
      message: body.message
    }
  })

  return NextResponse.json(addNote, { status: 201 })
}
