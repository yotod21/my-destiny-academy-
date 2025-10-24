import React from 'react'
export default function Home(){
  return (
    <section>
      <div className="card mb-6">
        <h2 className="text-3xl font-bold">Welcome to My Future Academy</h2>
        <p className="mt-2 text-[var(--muted)]">A place of learning, growth, and a bright future for every student.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold">Our Mission</h3><p className="text-sm text-[var(--muted)] mt-2">Provide quality education accessible to all.</p></div>
        <div className="card"><h3 className="font-semibold">Programs</h3><p className="text-sm text-[var(--muted)] mt-2">STEM, Arts, Languages and more.</p></div>
        <div className="card"><h3 className="font-semibold">Enroll</h3><p className="text-sm text-[var(--muted)] mt-2">Contact us to register for classes.</p></div>
      </div>
    </section>
  )
}
