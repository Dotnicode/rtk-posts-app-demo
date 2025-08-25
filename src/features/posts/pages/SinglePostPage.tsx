import { useAppSelector } from '@/app/app.hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostsById } from '../posts.slice'
import { PostParams } from '../types/post-params.type'
import { PostAuthor } from '../components/PostAuthor'
import { selectCurrentUsername } from '@/features/auth/auth.slice'

export const SinglePostPage = () => {
  const { postId } = useParams<PostParams>()
  const post = useAppSelector((state) => selectPostsById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}
