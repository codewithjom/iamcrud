'use client'

import { useState, useEffect } from 'react'

interface Note {
  id: number
  title: string
  message: string
}

export default function FetchNotes() {
  const [notes, setNotes] = useState<Note[]>([])

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
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note.id} className='text-gray-500 bg-gray-100'>
                <td className='px-6 py-4'>{note.title}</td>
                <td className='px-6 py-4'>{note.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
