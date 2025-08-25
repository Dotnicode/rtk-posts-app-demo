import { Link } from 'react-router-dom'

import { useAppSelector } from '@/app/app.hooks'
import { selectAllUsers } from '../users.slice'

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers).users

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))
  return (
    <section>
      <h2>Users List</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}