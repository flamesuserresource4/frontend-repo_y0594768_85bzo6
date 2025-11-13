import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { ArrowRight, Download, ExternalLink, Mail, MapPin, Phone, Linkedin, Github, ChevronRight } from 'lucide-react'

const COLORS = {
  navy: '#0D1B2A',
  teal: '#1B6CA8',
  gray: '#E5E5E5',
  white: '#FFFFFF',
}

function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return { dark, setDark }
}

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 sm:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  )
}

function Navbar({ onNav }) {
  const { dark, setDark } = useTheme()
  const [open, setOpen] = useState(false)
  const items = [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['education', 'Education'],
    ['ai', 'AI & Innovation'],
    ['contact', 'Contact'],
  ]
  const go = (id) => {
    onNav?.(id)
    setOpen(false)
  }
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur border-b border-white/30 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-500" />
          <span className="font-semibold tracking-tight text-slate-900 dark:text-white">DEMO</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {items.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-900/60">
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://linkedin.com/in/demo177" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="mailto:dempgmail.com" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" aria-label="Email"><Mail size={18} /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" aria-label="GitHub"><Github size={18} /></a>
          <button onClick={() => setDark(!dark)} className="px-3 py-1.5 rounded-md text-sm bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            {dark ? 'Light' : 'Dark'}
          </button>
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setOpen(!open)} aria-label="Menu">
            <ChevronRight className={`transition-transform ${open ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/30 dark:border-slate-800 px-5 pb-4">
          <div className="grid pt-2">
            {items.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="py-2 text-left text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <div className="relative h-[92vh] min-h-[640px] w-full" id="home">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 rounded-2xl p-6 sm:p-10 max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-teal-700/80 dark:text-teal-300/90">Software Engineer • 4.7+ years</p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
              Building Secure, Scalable & AI-Driven Web Applications.
            </h1>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              I craft robust, enterprise-grade products blending ASP.NET, React, TypeScript and AI to deliver speed, security and intelligence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[--teal] text-white shadow hover:shadow-lg hover:translate-y-[-1px] transition" style={{ ['--teal'] : COLORS.teal }}>
                View My Work <ArrowRight size={18} />
              </a>
              <a href="/resume.txt" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200/60 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800">
                <Download size={18} /> Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="grid md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            I’m DEMO, a results-driven Software Engineer with 4.7 years of experience in full-stack development, AI integration, and cloud-based enterprise systems. I specialize in combining code and creativity to build secure, fast, and intelligent web solutions.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              ['Secure', 'OWASP-aware, robust auth and data protection'],
              ['Scalable', 'Optimized APIs, caching and DB tuning'],
              ['AI-Driven', 'Prompt engineering + AI-assisted workflows'],
            ].map(([title, sub], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl p-4 bg-white/70 dark:bg-slate-800/60 border border-white/50 dark:border-slate-800 shadow-sm">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">Career Timeline</h3>
          <div className="mt-4 space-y-4">
            {[
              { t: '2017 – 2021', d: 'B.Tech (CSE), SISTec Bhopal' },
              { t: '2021 – Present', d: 'Software Engineer, MindRuby Technology LLP' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative pl-6">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-teal-500" />
                <div className="rounded-lg p-4 bg-white/70 dark:bg-slate-800/60 border border-white/50 dark:border-slate-800">
                  <div className="text-sm text-teal-700 dark:text-teal-300 font-medium">{item.t}</div>
                  <div className="text-slate-800 dark:text-slate-100">{item.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  const tabs = useMemo(() => ({
    Frontend: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    Backend: ['ASP.NET', 'C#', 'SQL Server', 'Python', 'API Design'],
    Cloud: ['Azure', 'AWS', 'Linux', 'Git', 'Agile/Scrum'],
    AI: ['AI Integration', 'Prompt Engineering'],
  }), [])
  const [tab, setTab] = useState('Frontend')

  const skillColor = 'bg-gradient-to-r from-teal-500 to-blue-600'

  const renderSkill = (name, i) => (
    <motion.div key={name} initial={{ width: 0, opacity: 0 }} whileInView={{ width: `${80 - i * 5}%`, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
      <div className={`h-full ${skillColor}`} />
    </motion.div>
  )

  return (
    <Section id="skills" className="bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tabs).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`px-3 py-1.5 rounded-full text-sm border transition ${tab === k ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-300 border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'}`}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tabs[tab].map((s) => (
              <motion.div key={s} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl px-3 py-2 bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm shadow-sm hover:shadow">
                {s}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {tabs[tab].map((s, i) => (
            <div key={s}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700 dark:text-slate-300">{s}</span>
                <span className="text-xs text-slate-500">{80 - i * 5}%</span>
              </div>
              {renderSkill(s, i)}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Experience() {
  const cards = [
    {
      role: 'Software Engineer',
      company: 'MindRuby Technology LLP',
      duration: '2021 – Present',
      bullets: [
        'Agile development across full-stack projects with ASP.NET, React & SQL Server',
        'AI-enhanced tools and prompt engineering to accelerate development',
        'Optimized backend performance and improved database security',
      ],
    },
  ]
  return (
    <Section id="experience" className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Experience</h2>
      <div className="mt-8 grid gap-6">
        {cards.map((c, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-6 bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{c.role} — {c.company}</div>
                <div className="text-sm text-teal-700 dark:text-teal-300">{c.duration}</div>
              </div>
            </div>
            <ul className="mt-4 list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              {c.bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  const items = [
    {
      title: 'E-Commerce Platform',
      stack: 'ASP.NET MVC, SQL Server',
      code: '#',
      demo: '#',
    },
    {
      title: 'Web Scraping Real Estate System',
      stack: 'Python, HTML, CSS, JS',
      code: '#',
      demo: '#',
    },
    {
      title: 'Anime Music System',
      stack: 'HTML, CSS, Bootstrap, JS',
      code: '#',
      demo: '#',
    },
    {
      title: 'Crawler-based Search Engine',
      stack: 'Python',
      code: '#',
      demo: '#',
    },
  ]
  return (
    <Section id="projects" className="bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Projects</h2>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }} className="group rounded-2xl p-5 bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 shadow hover:shadow-xl hover:-translate-y-1 transition will-change-transform">
            <div className="h-28 rounded-xl bg-gradient-to-br from-teal-500/20 via-blue-500/20 to-purple-500/20 border border-slate-200/70 dark:border-slate-800" />
            <div className="mt-4">
              <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{p.stack}</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a href={p.code} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-slate-300/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                View Code <ExternalLink size={14} />
              </a>
              <a href={p.demo} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                Live Demo <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Education & Certifications</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-6 bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 shadow-sm">
          <div className="font-semibold text-slate-900 dark:text-white">B.Tech (CSE) – SISTec, Bhopal</div>
          <div className="text-sm text-teal-700 dark:text-teal-300">2017–2021 • 8.10 CGPA</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-6 bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 shadow-sm md:col-span-2">
          <div className="font-semibold text-slate-900 dark:text-white">Certifications</div>
          <ul className="mt-2 list-disc pl-5 text-slate-700 dark:text-slate-300 grid sm:grid-cols-2 gap-y-1">
            <li>Azure Fundamentals (AZ-900)</li>
            <li>Python 3</li>
            <li>AWS</li>
            <li>Linux</li>
            <li>RHCSA</li>
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}

function AIInnovation() {
  return (
    <Section id="ai" className="bg-white dark:bg-slate-950">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">AI & Innovation</h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            Leveraging AI-driven development and prompt engineering to optimize workflows, enhance code quality, and maintain robust security across products and platforms.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
            <li>• Intelligent code reviews and automated testing prompts</li>
            <li>• AI-assisted API design, schema generation and migration planning</li>
            <li>• Security-first AI linting and dependency risk analysis</li>
          </ul>
        </div>
        <div className="h-80 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (form.message.trim().length < 10) e.message = 'Please provide a bit more detail'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent('Portfolio contact from ' + form.name)
    const body = encodeURIComponent(form.message + '\n\n— ' + form.name + ' (' + form.email + ')')
    window.location.href = `mailto:dempgmail.com?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Let’s build something great</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Have a project in mind or just want to say hello? Reach out anytime.</p>
          <div className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2"><Mail size={18} /> dempgmail.com</div>
            <div className="flex items-center gap-2"><Phone size={18} /> +91-0000000000</div>
            <div className="flex items-center gap-2"><Linkedin size={18} /> <a href="https://linkedin.com/in/demo177" className="underline" target="_blank" rel="noreferrer">demo177</a></div>
            <div className="flex items-center gap-2"><MapPin size={18} /> India</div>
          </div>
          <div className="mt-6 h-56 rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="rounded-2xl p-6 bg-white/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 shadow">
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Name</label>
              <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300/70 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Email</label>
              <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300/70 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Message</label>
              <textarea rows="5" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300/70 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[--teal] text-white shadow hover:shadow-lg hover:translate-y-[-1px] transition" style={{ ['--teal'] : COLORS.teal }}>
              Send Message <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}

export default function App() {
  const onNav = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar onNav={onNav} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <AIInnovation />
        <Contact />
      </main>
      <footer className="py-10 border-t border-slate-200/60 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} DEMO — Built with React, Tailwind & Spline. All rights reserved.
      </footer>
    </div>
  )
}
