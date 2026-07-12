import React from 'react'

const Headers = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex items-center">
      <div className="absolute -left-20 top-20 w-96 h-96 rounded-full bg-blue-400/40 filter blur-3xl mix-blend-multiply opacity-60" />
      <div className="absolute right-0 bottom-10 w-96 h-96 rounded-full bg-purple-600/40 filter blur-3xl mix-blend-multiply opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-900/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            About this web
          </span>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              A fun project that you can upload your fav book
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              A lightweight React hero section with layered gradient blobs, responsive layout and a clear call to action.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold text-slate-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/20">
            <p className="text-slate-300">Hero preview card or image placeholder</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Headers