import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '@/features/users/usersSlice'
import React from 'react'

interface PostAuthorProps {
  userId: string
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown Author'}</span>
}
