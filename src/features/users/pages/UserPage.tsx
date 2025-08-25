import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/app.hooks'
import { selectPostsByUser } from '@/features/posts/posts.slice'
import { selectUserById } from '../users.slice'

type UserParams = {
  userId: string
}

export const UserPage = () => {
  const userId = useParams<UserParams>().userId!

  const user = useAppSelector((state) => selectUserById(state, userId))
  const postForUser = useAppSelector((state) => selectPostsByUser(state, userId))

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    )
  }

  const postTitles = postForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}