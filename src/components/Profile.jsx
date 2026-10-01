import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Un despliegue nocturno típico, contado como lo vería cualquier equipo de backend
const LOG = [
  { t: '$ deploy nuevo-operador --env produccion', c: 'cmd' },
  { t: '→ tests de validación ........... 48/48 ok', c: 'dim' },
  { t: '→ copia de seguridad ............ ok', c: 'dim' },
  { t: '→ despliegue .................... ok', c: 'dim' },
  { t: '→ comprobación del servicio ..... ok', c: 'dim' },
  { t: '✓ en producción · 02:14 · sin incidencias', c: 'ok' },
  { t: '$ git log --oneline -1', c: 'cmd' },
  { t: 'a3f9c1e integra nuevo operador de principio a fin', c: 'dim' },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Terminal() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [line, setLine] = useState(0)
  const [char, setChar] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLine(LOG.length)
      return
    }
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!started) return
    if (line >= LOG.length) {
      const restart = setTimeout(() => { setLine(0); setChar(0) }, 4000)
      return () => clearTimeout(restart)
    }
    const current = LOG[line].t
    if (char < current.length) {
      const speed = LOG[line].c === 'cmd' ? 45 : 12
      const id = setTimeout(() => setChar(c => c + 1), speed)
      return () => clearTimeout(id)
    }
    const pause = LOG[line].c === 'ok' ? 700 : 220
    const id = setTimeout(() => { setLine(l => l + 1); setChar(0) }, pause)
    return () => clearTimeout(id)
  }, [started, line, char])

  const colors = { cmd: 'text-[#FAF8F5]/90', dim: 'text-[#FAF8F5]/40', ok: 'text-[#C9A84C]' }

  return (
    <div
      ref={ref}
      data-pf-reveal
      className="rounded-[2rem] border border-[#2A2A35] bg-[#08080B] overflow-hidden shadow-2xl shadow-black/60"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A35]">
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A2A35]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A2A35]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]/60" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#FAF8F5]/25">prod · 02:00</span>
      </div>
      <div className="p-6 font-mono text-[11.5px] md:text-[12.5px] leading-[1.9] min-h-[270px]" aria-hidden="true">
        {LOG.slice(0, line).map((l, i) => (
          <div key={i} className={colors[l.c]}>{l.t}</div>
        ))}
        {line < LOG.length && (
          <div className={colors[LOG[line].c]}>
            {LOG[line].t.slice(0, char)}
            <span className="inline-block w-[7px] h-[14px] -mb-[2px] ml-0.5 bg-[#C9A84C] animate-pulse" />
          </div>
        )}
      </div>
      <p className="sr-only">Ejemplo ilustrativo de un despliegue nocturno en producción con validaciones previas.</p>
    </div>
  )
}

export default function Profile() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
      tl.from('[data-pf-line]', { yPercent: 110, duration: 1, stagger: 0.1, ease: 'power4.out' })
        .from('[data-pf-text]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.6')
        .from('[data-pf-reveal]', { clipPath: 'inset(0 0 100% 0 round 2rem)', duration: 1.1, ease: 'power4.inOut' }, 0.2)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="perfil" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-14 items-center">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/35 mb-5">Perfil</p>
            <h2
              className="mb-8 leading-[1.02]"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem,4.2vw,3.1rem)', fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.02em' }}
            >
              <span className="block overflow-hidden"><span data-pf-line className="block">Del primer commit</span></span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-pf-line className="block font-serif italic font-normal text-[#C9A84C]" style={{ letterSpacing: '-0.01em' }}>
                  hasta producción.
                </span>
              </span>
            </h2>
            <div className="space-y-4 text-[#FAF8F5]/55 leading-relaxed max-w-md text-[15px]">
              <p data-pf-text>
                Soy desarrollador backend en el sector de las telecomunicaciones. Trabajo en los sistemas
                que deciden qué servicios puede usar cada cliente de un operador móvil.
              </p>
              <p data-pf-text>
                Me hago cargo de los proyectos de principio a fin: desarrollo, pruebas y despliegue,
                a menudo en ventanas nocturnas y bajo mi propia responsabilidad.
              </p>
            </div>
          </div>

          <Terminal />
        </div>
      </div>
    </section>
  )
}
