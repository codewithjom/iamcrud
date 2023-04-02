async function getAccounts() {
  const res = await fetch(`${process.env.BASE_URL}/getAccounts/`)
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

export default async function LoginPage() {
  const data: { email: string; password: string }[] = await getAccounts()
  console.log(data)
  return (
    <div className='flex h-screen'>
      <div className='flex items-center justify-around w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700'>
        <div>
          <h1 className='font-sans text-4xl font-bold text-white'>Hello</h1>
          <p className='mt-1 text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className='flex items-center justify-center w-1/2 bg-white'>
        <form className='bg-white'>
          <h1 className='mb-1 text-2xl font-bold text-gray-800'>Hello Again!</h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>Welcome Back</p>
          <div className='flex items-center px-3 py-2 mb-4 border-2 rounded-2xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
              />
            </svg>
            <input className='pl-2 border-none outline-none' type='email' placeholder='Email Address' />
          </div>
          <div className='flex items-center px-3 py-2 border-2 rounded-2xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            <input className='pl-2 border-none outline-none' type='password' placeholder='Password' />
          </div>
          <button
            type='submit'
            className='block w-full py-2 mt-4 mb-2 font-semibold text-white bg-indigo-600 rounded-2xl'
          >
            Login
          </button>
          <span className='ml-2 text-sm cursor-pointer hover:text-blue-500'>Forgot Password ?</span>
          {data.map(account => (
            <h1>{account.email}</h1>
          ))}
        </form>
      </div>
    </div>
  )
}
