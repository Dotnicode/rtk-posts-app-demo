import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { selectCurrentUsername } from './features/auth/auth.slice'
import { LoginPage } from './features/auth/pages/LoginPage'
import { EditPostForm } from './features/posts/components/EditPostForm'
import PostsMainPage from './features/posts/pages/PostsMainPage'
import { SinglePostPage } from './features/posts/pages/SinglePostPage'
import { UsersList } from './features/users/components/UsersList'
import { UserPage } from './features/users/pages/UserPage'
import { useAppSelector } from './app/app.hooks'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  return !username ? <Navigate to="/" replace /> : children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App