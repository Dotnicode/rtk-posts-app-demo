import { useAppDispatch } from '@/app/hooks'
import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { postAdded } from '@/features/posts/postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const handleSumbit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    console.log('Values: ', { title, content })

    const newPost = {
      id: nanoid(),
      title,
      content
    }

    dispatch(postAdded(newPost))

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSumbit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" required />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />

        <button>Save Post</button>
      </form>
    </section>
  )
}
