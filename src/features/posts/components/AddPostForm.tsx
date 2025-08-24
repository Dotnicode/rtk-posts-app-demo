import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { addNewPost } from '../postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = React.useState<'idle' | 'pending'>('idle')

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUsername)!

  const handleSumbit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user })).unwrap()
      form.reset()
    } catch (error) {
      console.error('Failed to save the post: ', error)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSumbit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" required />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />

        <button disabled={addRequestStatus === 'pending'}>Save Post</button>
      </form>
    </section>
  )
}