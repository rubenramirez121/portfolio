import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react'

const EMAIL = 'ruben.rm.rca@gmail.com'
const PHONE = '+34 711 756 267'

// En móvil llama; en escritorio (donde tel: no hace nada) copia el número
function PhoneLink() {
  const [copied, setCopied] = useState(false)

  const handleClick = async e => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(PHONE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `tel:${PHONE.replace(/\s/g, '')}`
    }
  }

  return (
    <a
      href={`tel:${PHONE.replace(/\s/g, '')}`}
      onClick={handleClick}
      title="Copiar número"
      className="link-draw inline-flex items-center gap-1.5 font-mono text-[13px] text-[#FAF8F5]/55 hover:text-[#FAF8F5]"
    >
      {PHONE}
      {copied
        ? <span className="inline-flex items-center gap-1 text-[#C9A84C]"><Check size={13} /> Copiado</span>
        : <Copy size={12} className="opacity-60" />}
    </a>
  )
}

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rub%C3%A9n-ram%C3%ADrez-mart%C3%ADnez-6a62b31b6', external: true },
  { label: 'GitHub', href: 'https://github.com/rubenramirez121', external: true },
]

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden pt-24 md:pt-28 pb-10 px-6 rounded-t-[3rem] border-t border-[#C9A84C]/20"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.10) 0%, transparent 60%), #111116' }}
    >
      <div className="max-w-5xl mx-auto">

        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/35 mb-6">Contacto</p>

        <h2
          className="leading-[0.9] mb-10"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.75rem,7.5vw,5.5rem)', fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.04em' }}
        >
          Hablemos<span className="text-[#C9A84C]">.</span>
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-center gap-3 text-[#FAF8F5]/75 hover:text-[#C9A84C] transition-colors duration-300 break-all"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.1rem,2.6vw,1.9rem)', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          <span className="link-draw">{EMAIL}</span>
          <ArrowUpRight className="shrink-0 w-5 h-5 md:w-7 md:h-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-6">
          <PhoneLink />
          {links.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="link-draw inline-flex items-center gap-1.5 font-mono text-[13px] text-[#FAF8F5]/55 hover:text-[#FAF8F5]"
            >
              {label}
              {external && <ArrowUpRight size={13} />}
            </a>
          ))}

          <a
            href="/cv-ruben-ramirez.pdf"
            download="CV_Ruben_Ramirez.pdf"
            className="group relative overflow-hidden md:ml-auto inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#C9A84C]/60 text-[#C9A84C] hover:text-[#0D0D12] font-bold text-sm tracking-wide transition-[color,transform] duration-300 hover:scale-[1.03]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <span className="absolute inset-0 bg-[#C9A84C] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            <Download size={15} className="relative z-10" />
            <span className="relative z-10">Descargar CV completo</span>
          </a>
        </div>

        <div className="mt-20 pt-6 border-t border-[#2A2A35] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#FAF8F5]/25">
          <span>© {new Date().getFullYear()} Rubén Ramírez Martínez</span>
          <span>Madrid, España</span>
          <a href="#" className="link-draw hover:text-[#FAF8F5]/60">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  )
}
