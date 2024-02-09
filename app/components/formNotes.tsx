'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title too short.'
  }),
  message: z.string().min(5, {
    message: 'Message too short.'
  })
})

export default function FormNotes() {
  // 1. define your form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      message: ''
    }
  })

  // 2. define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        console.log('Notes added successfully')
        reset()
      } else {
        console.error('Error creating notes')
      }
    } catch (error) {
      console.error('Error creating notes', error)
    }
  }
  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm mx-auto'>
          <div>
            <input {...register('title')} type='text' placeholder='Title' className='w-full mb-2 p-2.5 rounded-lg' />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <textarea {...register('message')} rows={4} cols={50} placeholder='Type your message here' className='p-2.5 w-full mb-2 rounded-lg' />
            {errors.message && <p>{errors.message.message}</p>}
          </div>

          <button type='submit' className='bg-green-400 text-white py-2 px-4 w-full rounded-lg'>
            Submit
          </button>
        </form>
      </main>
    </>
  )
}
