import { client } from '@/api/client'
import { RootState } from '@/app/app.store'
import { createAppAsyncThunk } from '@/app/app.types'
import { createSlice } from '@reduxjs/toolkit'

export interface ServerNotification {
  id: string
  date: string
  message: string
  user: string
}

export const fetchNotifications = createAppAsyncThunk('notifications/fetchNotifications', async (_unused, thunkApi) => {
  const allNotifications = selectAllNotifications(thunkApi.getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get<ServerNotification[]>(`/fakeApi/notifications?since=${latestTimestamp}`)
  return response.data
})

const initialState: ServerNotification[] = []

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => (a.date < b.date ? 1 : -1))
    })
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications