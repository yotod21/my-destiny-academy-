import React, {useEffect,useState} from 'react'
import API from '../api'
export default function Gallery(){
  const [items,setItems]=useState([])
  const toAbsolute=(url)=>{
    if(!url) return ''
    try{ return url.startsWith('http') ? url : new URL(url, API.defaults.baseURL).toString() }catch(e){ return url }
  }
  useEffect(()=>{ API.get('/api/gallery').then(r=>setItems(r.data)).catch(()=>{}) },[])
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid-3">
        {items.map(it=>(<div key={it.id} className="card"><img src={toAbsolute(it.url)} alt={it.caption || 'Gallery image'} className="w-full h-40 object-cover rounded mb-2"/><div className="text-sm text-[var(--muted)]">{it.caption}</div></div>))}
      </div>
    </section>
  )
}
