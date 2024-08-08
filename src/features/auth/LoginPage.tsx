import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate } from "react-router"
import { FormEvent } from "react"
import { userLoggedIn } from "./authSlice"




interface LoginPageFormFields extends HTMLFormControlsCollection {
    username: HTMLSelectElement
}
interface LoginPageFormElements extends HTMLFormElement {
    readonly elements: LoginPageFormFields
}

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<LoginPageFormElements>) => {
        e.preventDefault()
        const username = e.currentTarget.elements.username.value
        dispatch(userLoggedIn(username))
        navigate('/posts')
    }
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Welcome to Tweeter!</h2>
            <h3>Please log in:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User:</label>
                <select name="username" id="username" required>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <button>Login</button>
            </form>
        </section>
    )
}