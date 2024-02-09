import FetchNotes from './components/fetchNotes'
import FormNotes from './components/formNotes'

export default function Home() {
  return (
    <>
      <h1 className='font-bold text-2xl text-center mt-10 mb-5'>Note App</h1>
      <FormNotes />
      <FetchNotes />
    </>
  )
}
