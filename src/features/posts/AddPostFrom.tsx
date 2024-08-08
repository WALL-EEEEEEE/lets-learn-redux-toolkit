import { useAppDispatch, useAppSelector } from '@/hooks'
import { nanoid } from "@reduxjs/toolkit"
import React, { FormEvent } from 'react'
import { Post, postAdded } from './postSlice'
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUserName } from '../auth/authSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement
    postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)
    const userId = useAppSelector(selectCurrentUserName)

    const handleSubmit = (e: FormEvent<AddPostFormElements>) => {
        e.preventDefault()
        const { elements } = e.currentTarget
        const title = elements.postTitle.value
        const content = elements.postContent.value
        console.log("Values: ", {title, content})
        dispatch(postAdded(title, content, userId!))
        e.currentTarget.reset()
    }
    const userOptions = users.map(user=> (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" defaultValue="" required/>
                <label htmlFor="postAuthor">Author:</label>
                <select name="postAuthor" id="postAuthor" required>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea name="postContent" id="postContent" defaultValue="" required></textarea>
                <button> Save Post</button>
            </form>
        </section>
    )
}