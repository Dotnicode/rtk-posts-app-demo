import React from 'react'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <a href="/">Home</a>
            <a href="/posts">Posts</a>
          </div>
        </div>
      </section>
    </nav>
  )
}
