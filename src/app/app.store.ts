import authReducer from '@/features/auth/auth.slice'
import postsReducer from '@/features/posts/posts.slice'
import usersReducer from '@/features/users/users.slice'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, any>
