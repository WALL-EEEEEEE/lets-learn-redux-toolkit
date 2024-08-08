import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"
import { selectCurrentUserName } from "../auth/authSlice"


interface User {
    id: string
    name: string
}

const initialState: User[] = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    selectors: {
        selectAllUsers(state) {
            return state
        },
        selectUserById(state, userId: string | null) {
            return state.find(user => user.id === userId)
        },

    }
})

export default usersSlice.reducer
export const selectCurrentUser = (state: RootState) => {
    const currentUsername = selectCurrentUserName(state)
    return selectUserById(state, currentUsername)
}
export const { selectAllUsers, selectUserById } = usersSlice.selectors