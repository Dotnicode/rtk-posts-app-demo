import { client } from '@/api/client'
import { RootState } from '@/app/app.store'
import { createAppAsyncThunk } from '@/app/app.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  username: null,
}

export const login = createAppAsyncThunk('auth/login', async (username: string) => {
  await client.post('/fakeApi/login', { username })
  return username
})

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.post('/fakeApi/logout', {})
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      console.log('action', action)
      state.username = action.payload
    },
    userLoggedOut: (state) => {
      state.username = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null
      })
  },
})

export default authSlice.reducer
export const selectCurrentUsername = (state: RootState) => state.auth.username