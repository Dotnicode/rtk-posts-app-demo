import React from 'react'

import { useAppSelector } from '@/app/app.hooks'
import { PostAuthor } from '@/features/posts/components/PostAuthor'
import TimeAgo from '@/features/posts/components/TimeAgo'
import { selectAllNotifications } from '../notification.slice'

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications)

  const renderedNotifications = notifications.map((notification) => (
    <div key={notification.id} className="notification">
      <div>
        <b>
          <PostAuthor userId={notification.user} showPrefix={false} />
        </b>
        {notification.message}
      </div>
      <TimeAgo timestamp={notification.date} />
    </div>
  ))

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}