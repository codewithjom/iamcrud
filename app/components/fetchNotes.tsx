'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

interface Note {
  id: number
  title: string
  message: string
}

export default function FetchNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [editNote, setEditNote] = useState<Note | null>(null)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedMessage, setUpdatedMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchNotes')
        if (response.ok) {
          const data = await response.json()
          setNotes(data)
        } else {
          console.error('Failed to fetch data: ', response.status)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()

    // Set up data revalidation every 2 seconds
    const intervalId = setInterval(fetchData, 2000)

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs once when the component mounts

  const handleUpdate = async (id: number) => {
    // Find the note to be updated
    const noteToUpdate = notes.find(note => note.id === id)
    if (noteToUpdate) {
      setEditNote(noteToUpdate)
      setUpdatedTitle(noteToUpdate.title)
      setUpdatedMessage(noteToUpdate.message)
    }
  }

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch('/api/updateNote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editNote?.id,
          title: updatedTitle,
          message: updatedMessage
        })
      })

      if (response.ok) {
        console.log('Note updated successfully')
        setEditNote(null)
      } else {
        console.error('Failed to update note')
      }
    } catch (error) {
      console.error('Error updating note', error)
    }
  }

  return (
    <>
      <div className='max-w-2xl mx-auto mt-10'>
        <table className='w-full text-left rtl:text-right text-gray-400'>
          <thead className='uppercase text-gray-700 bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Message
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note.id} className='text-gray-500 bg-gray-100'>
                <td className='px-6 py-4'>
                  {editNote && editNote.id === note.id ? (
                    <>
                      <input
                        type='text'
                        value={updatedTitle}
                        onChange={e => setUpdatedTitle(e.target.value)}
                        placeholder='Updated Title'
                        className='bg-gray-100 outline-none'
                      />
                    </>
                  ) : (
                    note.title
                  )}
                </td>
                <td className='px-6 py-4'>
                  {editNote && editNote.id === note.id ? (
                    <>
                      <input
                        type='text'
                        value={updatedMessage}
                        onChange={e => setUpdatedMessage(e.target.value)}
                        placeholder='Updated Message'
                        className='bg-gray-100 outline-none'
                      />
                    </>
                  ) : (
                    note.message
                  )}
                </td>
                <td className='px-6 py-4'>
                  {editNote && editNote.id === note.id ? (
                    <button onClick={handleSaveUpdate} className='bg-green-400 text-white py-2 px-4 w-full rounded-lg'>
                      Save
                    </button>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleUpdate(note.id)} className='text-blue-500 cursor-pointer mx-2' />
                      <FontAwesomeIcon icon={faTrash} className='text-red-500 cursor-pointer mx-2' />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
