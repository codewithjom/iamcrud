import AddForm from './components/addForm'
import UserList from './components/userList'

export default async function Home() {
  return (
    <>
      <main>
        <h1 className="text-center text-4xl font-bold my-4">iamcrud</h1>
        <AddForm />
        <UserList />
      </main>
    </>
  )
}
