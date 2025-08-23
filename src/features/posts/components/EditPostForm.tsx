import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated, selectPostsById } from '../postsSlice'
import { PostParams } from '../types/postParams'

interface EditPostFormFields extends HTMLFormControlsCollection {
  id: HTMLInputElement
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
  const { postId } = useParams<PostParams>()
  const post = useAppSelector((state) => selectPostsById(state, postId!))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <section>
      <h2>Edit Posts</h2>

      <form action="POST" onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />

        <label htmlFor="postContent">Post Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button>Save Post</button>
      </form>
    </section>
  )
}
