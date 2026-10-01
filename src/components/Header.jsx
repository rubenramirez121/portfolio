import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'

const NAV = [
  ['#perfil', 'Perfil'],
  ['#experiencia', 'Experiencia'],
  ['#habilidades', 'Habilidades'],
  ['#educacion', 'Educación'],
  ['#contacto', 'Contacto'],
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 50)
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#C9A84C] origin-left"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full md:w-auto">
          <nav
            className={`flex items-center justify-between gap-6 md:gap-10 px-6 md:px-8 py-3 rounded-full transition-all duration-500 ${
              solid
                ? 'bg-[#0D0D12]/90 backdrop-blur-md border border-[#C9A84C]/20 shadow-xl shadow-black/50'
                : 'bg-transparent border border-transparent'
            }`}
          >
            <a href="#" className="text-sm text-[#C9A84C] tracking-widest font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>RRM</a>

            <div className="hidden md:flex items-center gap-8">
              {NAV.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/cv-ruben-ramirez.pdf"
                download="CV_Ruben_Ramirez.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#C9A84C] text-[#0D0D12] hover:bg-[#C9A84C]/85 transition-all duration-200 hover:scale-[1.03]"
              >
                <Download size={13} />
                <span className="hidden md:inline">Descargar</span> CV
              </a>
              <button
                type="button"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                className="md:hidden w-9 h-9 grid place-items-center rounded-full text-[#FAF8F5]/70 hover:text-[#C9A84C] transition-colors"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          <div
            id="mobile-nav"
            className={`md:hidden mt-3 rounded-[2rem] bg-[#0D0D12]/95 backdrop-blur-md border border-[#C9A84C]/20 shadow-xl shadow-black/50 overflow-hidden transition-all duration-300 origin-top ${
              open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <ul className="p-3">
              {NAV.map(([href, label], i) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="flex items-baseline justify-between px-5 py-4 rounded-[1.5rem] text-[#FAF8F5]/80 hover:bg-[#2A2A35]/50 hover:text-[#C9A84C] transition-colors"
                  >
                    <span className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{label}</span>
                    <span className="font-mono text-[10px] text-[#FAF8F5]/25">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
