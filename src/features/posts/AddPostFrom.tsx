import { useAppDispatch } from '@/hooks'
import { nanoid } from "@reduxjs/toolkit"
import React, { FormEvent } from 'react'
import { Post, postAdded } from './postSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement
    postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
    const dispatch = useAppDispatch()
    const handleSubmit = (e: FormEvent<AddPostFormElements>) => {
        e.preventDefault()
        const { elements } = e.currentTarget
        const title = elements.postTitle.value
        const content = elements.postContent.value
        console.log("Values: ", {title, content})
        const newPost: Post = {
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" defaultValue="" required/>
                <label htmlFor="postContent">Content:</label>
                <textarea name="postContent" id="postContent" defaultValue="" required></textarea>
                <button> Save Post</button>
            </form>
        </section>
    )
}