import React, {useEffect,useState} from 'react'
import API from '../api'
export default function Blog(){
  const [posts,setPosts]=useState([])
  useEffect(()=>{ API.get('/api/posts').then(r=>setPosts(r.data)).catch(()=>{}) },[])
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      {posts.map(p=>(<article key={p.id} className="card mb-4"><h3 className="font-semibold">{p.title}</h3><div className="text-sm text-[var(--muted)]">By {p.author} • {new Date(p.created_at).toLocaleDateString()}</div><p className="mt-2">{p.content}</p></article>))}
    </section>
  )
}
