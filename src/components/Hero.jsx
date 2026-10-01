import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'

const Letters = ({ word }) =>
  [...word].map((ch, i) => (
    <span key={i} data-h-char className="inline-block will-change-transform">{ch}</span>
  ))

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rub%C3%A9n-ram%C3%ADrez-mart%C3%ADnez-6a62b31b6', external: true },
  { label: 'GitHub', href: 'https://github.com/rubenramirez121', external: true },
  { label: 'Email', href: 'mailto:ruben.rm.rca@gmail.com' },
]

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-h-meta]',    { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 })
        .from('[data-h-rule]',    { scaleX: 0, duration: 1.1, transformOrigin: 'left', ease: 'power4.inOut' }, 0)
        .from('[data-h-char]',    { yPercent: 115, duration: 1.1, stagger: 0.035, ease: 'power4.out' }, 0.25)
        .from('[data-h-lede]',    { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from('[data-h-body]',    { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')
        .from('[data-h-side]',    { opacity: 0, duration: 1 }, '-=0.4')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col px-6 pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 10% 0%, #1c1c26 0%, #0D0D12 60%), #0D0D12',
      }}
    >
      {/* Brillo champán, descentrado */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '55vw', height: '55vw', right: '-20vw', bottom: '-25vw',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full flex-1 flex flex-col">

        {/* Cabecera editorial */}
        <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#FAF8F5]/40 pb-4">
          <span data-h-meta>Madrid, ES</span>
          <span data-h-meta className="hidden md:block">Ahora en HCLTech</span>
          <span data-h-meta className="text-right text-[#C9A84C]/80">Abierto a nuevas oportunidades</span>
        </div>
        <div data-h-rule className="h-px bg-[#FAF8F5]/12" />

        {/* Nombre */}
        <h1
          aria-label="Rubén Ramírez"
          className="mt-auto pt-14 select-none"
          style={{
            fontFamily: 'Syne, sans-serif',
            // Syne es muy ancha (~1.08em por letra): RAMÍREZ + sangría debe caber en el contenedor
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
          }}
        >
          <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.04em] text-[#FAF8F5]">
            <Letters word="RUBÉN" />
          </span>
          <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.06em] md:pl-[6vw] text-[#C9A84C]">
            <Letters word="RAMÍREZ" />
          </span>
        </h1>

        {/* Pie asimétrico */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          <p
            data-h-lede
            className="md:col-span-5 font-serif italic text-[#FAF8F5]/80 leading-[1.2]"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.65rem)' }}
          >
            Backend Developer. Desarrollo de servicios y puesta en producción.
          </p>

          <div className="md:col-span-6 md:col-start-7">
            <p
              data-h-body
              className="text-[#FAF8F5]/50 leading-relaxed mb-7 text-[15px]"
              style={{ fontWeight: 300 }}
            >
              Desarrollo, pruebo y despliego servicios backend en entornos críticos.
              Bash, Java, Python y MySQL sobre Linux.
            </p>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
              <a
                data-h-body
                href="/cv-ruben-ramirez.pdf"
                download="CV_Ruben_Ramirez.pdf"
                className="group relative overflow-hidden px-6 py-3 rounded-full bg-[#C9A84C] text-[#0D0D12] font-bold text-sm tracking-wide transition-transform duration-200 hover:scale-[1.03]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <span className="absolute inset-0 bg-[#FAF8F5] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10">Descargar CV</span>
              </a>
              {LINKS.map(({ label, href, external }) => (
                <a
                  key={label}
                  data-h-body
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="link-draw inline-flex items-center gap-1.5 text-sm text-[#FAF8F5]/70 hover:text-[#FAF8F5]"
                >
                  {label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll en el margen izquierdo, simétrico al texto vertical derecho */}
      <a
        href="#perfil"
        data-h-side
        aria-label="Ir al perfil"
        className="hidden xl:flex absolute left-6 bottom-12 flex-col items-center gap-4 font-mono text-[10px] tracking-[0.35em] uppercase text-[#FAF8F5]/30 hover:text-[#C9A84C] transition-colors"
      >
        <span style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <span className="relative h-16 w-px bg-[#FAF8F5]/10 overflow-hidden">
          <span className="scroll-cue absolute inset-0 bg-[#C9A84C]" />
        </span>
      </a>
    </section>
  )
}
