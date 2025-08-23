import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { EditPostForm } from './features/posts/components/EditPostForm'
import PostsMainPage from './features/posts/pages/PostsMainPage'
import { SinglePostPage } from './features/posts/pages/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsMainPage />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
