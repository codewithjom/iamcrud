import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function PUT(request: NextRequest) {
  const { id, title, message } = await request.json()

  const updateNote = await prisma.notes.update({
    where: { id: parseInt(id) },
    data: { title, message }
  })

  return NextResponse.json(updateNote, { status: 200 })
}
