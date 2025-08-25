import { useAppDispatch, useAppSelector } from '@/app/app.hooks'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from '../posts.slice'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { Spinner } from '@/components/Spinner'

interface PostExcerptProps {
  post: Post
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>

      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />

      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default function PostsList() {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
