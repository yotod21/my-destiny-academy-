import React, {useEffect,useState} from 'react'
import API from '../api'
export default function Events(){
  const [events,setEvents]=useState([])
  useEffect(()=>{ API.get('/api/events').then(r=>setEvents(r.data)).catch(()=>{}) },[])
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      {events.map(e=>(<div key={e.id} className="card mb-3"><h3 className="font-semibold">{e.title} — {e.date}</h3><p className="mt-1 text-[var(--muted)]">{e.description}</p></div>))}
    </section>
  )
}
