import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  const existingNote = await prisma.notes.findUnique({
    where: { id: Number(id) }
  })

  if (!existingNote) {
    return NextResponse.json({ error: 'Note not found', status: 404 })
  }

  await prisma.notes.delete({
    where: { id: Number(id) }
  })

  return NextResponse.json({ message: 'Note deleted successfully', status: 200 })
}
