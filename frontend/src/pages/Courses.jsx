import React, {useEffect,useState} from 'react'
import API from '../api'
export default function Courses(){
  const [courses,setCourses]=useState([])
  useEffect(()=>{ API.get('/api/courses').then(r=>setCourses(r.data)).catch(()=>{}) },[])
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {courses.map(c=>(<div key={c.id} className="card"><h3 className="font-semibold">{c.title} <span className="text-sm text-[var(--muted)]">({c.code})</span></h3><p className="mt-2 text-sm">{c.description}</p></div>))}
      </div>
    </section>
  )
}
