import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Courses from './pages/Courses'
import Announcements from './pages/Announcements'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div>
      <header className="header">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold" style={{color:'var(--primary)'}}>My Future Academy</h1>
            <div className="text-sm text-[var(--muted)]">Learn. Grow. Succeed.</div>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/announcements" className="nav-link">Announcements</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/admin" className="nav-link">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/announcements" element={<Announcements/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
      <footer className="bg-white mt-8 py-6">
        <div className="container text-center text-sm text-[var(--muted)]">© {new Date().getFullYear()} My Future Academy</div>
      </footer>
    </div>
  )
}
