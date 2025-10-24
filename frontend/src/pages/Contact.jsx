import React, {useState} from 'react'
import API from '../api'
export default function Contact(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [subject,setSubject]=useState(''); const [body,setBody]=useState(''); const [msg,setMsg]=useState('')
  const submit = async (e)=>{ e.preventDefault(); try{ await API.post('/api/contact',{name,email,subject,body}); setMsg('Message sent'); setName('');setEmail('');setSubject('');setBody(''); }catch(e){ setMsg('Error'); } }
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <form onSubmit={submit} className="card max-w-lg">
        <label className="block mb-2">Name <input className="form-input" value={name} onChange={e=>setName(e.target.value)} /></label>
        <label className="block mb-2">Email <input className="form-input" value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label className="block mb-2">Subject <input className="form-input" value={subject} onChange={e=>setSubject(e.target.value)} /></label>
        <label className="block mb-2">Message <textarea className="form-input" value={body} onChange={e=>setBody(e.target.value)} /></label>
        <button className="btn mt-2">Send</button>
        {msg && <div className="text-sm text-[var(--muted)] mt-2">{msg}</div>}
      </form>
    </section>
  )
}
