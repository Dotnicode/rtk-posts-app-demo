import { client } from '@/api/client'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'

interface User {
  id: string
  name: string
}

interface UserState {
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const initialState: UserState = {
  users: [],
  status: 'idle',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.users.find((user) => user.id === userId)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}