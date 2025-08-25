import { useAppSelector } from '@/app/app.hooks'
import { selectUserById } from '@/features/users/users.slice'

interface PostAuthorProps {
  userId: string
  showPrefix?: boolean
}

export const PostAuthor = ({ userId, showPrefix = true }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span>
      {showPrefix && 'by '}
      {author?.name ?? 'Unknown Author'}
    </span>
  )
}