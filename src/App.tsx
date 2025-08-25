import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import React from 'react'
import { useAppSelector } from './app/app.hooks'
import { Navbar } from './components/Navbar'
import { selectCurrentUsername } from './features/auth/auth.slice'
import { LoginPage } from './features/auth/pages/LoginPage'
import { EditPostForm } from './features/posts/components/EditPostForm'
import PostsMainPage from './features/posts/pages/PostsMainPage'
import { SinglePostPage } from './features/posts/pages/SinglePostPage'

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
