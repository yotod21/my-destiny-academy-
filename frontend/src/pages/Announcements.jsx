import React, {useEffect,useState} from 'react'
import API from '../api'
export default function Announcements(){
  const [a,setA]=useState([])
  useEffect(()=>{ API.get('/api/announcements').then(r=>setA(r.data)).catch(()=>{}) },[])
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {a.map(x=>(<div key={x.id} className="card mb-3"><h3 className="font-semibold">{x.title}</h3><p className="mt-1 text-[var(--muted)]">{x.content}</p></div>))}
    </section>
  )
}
