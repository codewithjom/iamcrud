'use client'

import { useEffect, useState } from 'react'

interface User {
  id: number
  username: string
  password: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchUser')
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        } else {
          console.error('Failed to fetch data: ', response.status)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()

    // Set up data revalidation every 5 seconds
    const intervalId = setInterval(fetchData, 5000)

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <section className="mt-10">
        <h2 className="text-center font-bold text-xl">Users</h2>
        <ul>
          {users.map(user => (
            <>
              <div className="flex justify-center items-center space-x-4">
                <li key={user.id}>Username: {user.username}</li>
                <li>Password: {user.password}</li>
              </div>
            </>
          ))}
        </ul>
      </section>
    </>
  )
}
