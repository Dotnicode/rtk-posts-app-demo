import React from 'react'
import { Post, reactionAdded, ReactionName } from '../postsSlice'
import { useAppDispatch } from '@/app/hooks'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

interface ReactionButtonsProp {
  post: Post
}

export const ReactionButtons = ({ post }: ReactionButtonsProp) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    const reaction = stringName as ReactionName
    return (
      <button
        key={reaction}
        title={reaction.slice(0, 1).toUpperCase() + reaction.slice(1)}
        type="button"
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
