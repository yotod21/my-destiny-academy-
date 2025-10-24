import React, {useEffect,useState} from 'react'
import API from '../api'
import LoginForm from '../components/LoginForm'

function useFetch(path){ const [data,setData]=useState([]); useEffect(()=>{ API.get(path).then(r=>setData(r.data)).catch(()=>{}); },[]); return [data,setData]; }

export default function Admin(){
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true'
  })
  const [posts,setPosts]=useFetch('/api/posts')
  const [events,setEvents]=useFetch('/api/events')
  const [courses,setCourses]=useFetch('/api/courses')
  const [gallery,setGallery]=useFetch('/api/gallery')
  const [announcements,setAnnouncements]=useFetch('/api/announcements')
  const [messages,setMessages]=useFetch('/api/messages')

  const toAbsolute=(url)=>{
    if(!url) return ''
    try{ return url.startsWith('http') ? url : new URL(url, API.defaults.baseURL).toString() }catch(e){ return url }
  }

  const createPost = async (e)=>{ e.preventDefault(); const form = new FormData(e.target); await API.post('/api/posts', Object.fromEntries(form)); window.location.reload(); }
  const createEvent = async (e)=>{ e.preventDefault(); const form = new FormData(e.target); await API.post('/api/events', Object.fromEntries(form)); window.location.reload(); }
  const createCourse = async (e)=>{ e.preventDefault(); const form = new FormData(e.target); await API.post('/api/courses', Object.fromEntries(form)); window.location.reload(); }
  const createAnnouncement = async (e)=>{ e.preventDefault(); const form = new FormData(e.target); await API.post('/api/announcements', Object.fromEntries(form)); window.location.reload(); }
  const uploadGallery = async (e)=>{ e.preventDefault(); const fd = new FormData(e.target); await API.post('/api/gallery', fd); window.location.reload(); }

  const del = async (path,id)=>{ if(!confirm('Delete?')) return; await API.delete(path+'/'+id); window.location.reload(); }

  const handleLogin = (success) => {
    if (success) {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <section className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Panel</h2>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Create Post</h3>
          <form onSubmit={createPost}><input name="title" className="form-input mb-2" placeholder="Title"/><input name="slug" className="form-input mb-2" placeholder="Slug"/><textarea name="content" className="form-input mb-2" placeholder="Content"/><input name="author" className="form-input mb-3" placeholder="Author"/><button className="btn bg-blue-600 text-white hover:bg-blue-700">Create</button></form>
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Existing Posts</h3>
          {posts.map(p=>(<div key={p.id} className="border-b py-2"><strong>{p.title}</strong><div className="text-sm text-[var(--muted)]">By {p.author}</div><button onClick={()=>del('/api/posts',p.id)} className="mt-2 btn bg-red-600 text-white hover:bg-red-700">Delete</button></div>))}
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Create Event</h3>
          <form onSubmit={createEvent}><input name="title" className="form-input mb-2" placeholder="Title"/><input name="date" type="date" className="form-input mb-2"/><textarea name="description" className="form-input mb-3" placeholder="Description"/><button className="btn bg-blue-600 text-white hover:bg-blue-700">Create</button></form>
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Existing Events</h3>
          {events.map(e=>(<div key={e.id} className="border-b py-2"><strong>{e.title}</strong><div className="text-sm text-[var(--muted)]">{e.date}</div><button onClick={()=>del('/api/events',e.id)} className="mt-2 btn bg-red-600 text-white hover:bg-red-700">Delete</button></div>))}
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Create Course</h3>
          <form onSubmit={createCourse}><input name="title" className="form-input mb-2" placeholder="Title"/><input name="code" className="form-input mb-2" placeholder="Code"/><textarea name="description" className="form-input mb-3" placeholder="Description"/><button className="btn bg-blue-600 text-white hover:bg-blue-700">Create</button></form>
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Existing Courses</h3>
          {courses.map(c=>(<div key={c.id} className="border-b py-2"><strong>{c.title}</strong><div className="text-sm text-[var(--muted)]">{c.code}</div><button onClick={()=>del('/api/courses',c.id)} className="mt-2 btn bg-red-600 text-white hover:bg-red-700">Delete</button></div>))}
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Upload Gallery Image</h3>
          <form onSubmit={uploadGallery}><input name="file" type="file" className="mb-2"/><input name="caption" className="form-input mb-3" placeholder="Caption"/><button className="btn bg-blue-600 text-white hover:bg-blue-700">Upload</button></form>
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Gallery</h3>
          {gallery.map(g=>(<div key={g.id} className="border-b py-3 flex items-center gap-3"><img src={toAbsolute(g.url)} alt={g.caption || 'Gallery image'} className="w-40 h-24 object-cover rounded-lg shadow-md ring-1 ring-black/5"/><div className="flex-1"><div className="text-sm text-[var(--muted)]">{g.caption}</div><button onClick={()=>del('/api/gallery',g.id)} className="mt-2 btn bg-red-600 text-white hover:bg-red-700">Delete</button></div></div>))}
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Create Announcement</h3>
          <form onSubmit={createAnnouncement}><input name="title" className="form-input mb-2" placeholder="Title"/><textarea name="content" className="form-input mb-3" placeholder="Content"/><button className="btn bg-blue-600 text-white hover:bg-blue-700">Create</button></form>
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Announcements</h3>
          {announcements.map(a=>(<div key={a.id} className="border-b py-2"><strong>{a.title}</strong><div className="text-sm text-[var(--muted)]">{a.content}</div><button onClick={()=>del('/api/announcements',a.id)} className="mt-2 btn bg-red-600 text-white hover:bg-red-700">Delete</button></div>))}
        </div>
        <div className="card shadow-sm hover:shadow-md transition rounded-lg">
          <h3 className="font-semibold mb-2">Messages (from Contact)</h3>
          {messages.map(m=>(<div key={m.id} className="border-b py-2"><strong>{m.subject}</strong><div className="text-sm text-[var(--muted)]">{m.name} • {m.email}</div><div className="text-sm mt-1">{m.body}</div></div>))}
        </div>
      </div>
    </section>
  )
}
