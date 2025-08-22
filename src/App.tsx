import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import PostsPage from './pages/PostsPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome to the Redux Essentials example app!</h2>
              </section>
            }
          />
          <Route path='/posts' element={<PostsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
