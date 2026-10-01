import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const groups = [
  { code: '01', name: 'Lenguajes', note: 'Lo que escribo a diario', items: ['Java', 'Python', 'Bash', 'JavaScript'] },
  { code: '02', name: 'Datos', note: 'Consultas y modelado', items: ['MySQL'] },
  { code: '03', name: 'Entorno', note: 'Donde trabajo y despliego', items: ['Linux', 'SSH', 'Git'] },
  { code: '04', name: 'Práctica', note: 'Cómo llevo el código a producción', items: ['Despliegues', 'Testing', 'Documentación técnica'] },
]

const aptitudes = [
  'Autonomía y autogestión',
  'Comunicación con cliente',
  'Resolución de problemas',
  'Aprendizaje rápido en entornos nuevos',
]

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        scrollTrigger: { trigger: '[data-sk-stack]', start: 'top 70%' },
      })
      tl.from('[data-sk-rail]', { scaleY: 0, duration: 1.2, transformOrigin: 'top' })
        .from('[data-sk-layer]', { clipPath: 'inset(0 100% 0 0)', duration: 0.9, stagger: 0.12 }, 0.1)
        .from('[data-sk-item]', { y: 12, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out' }, 0.5)

      gsap.from('[data-sk-aside]', {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-sk-aside]', start: 'top 88%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="habilidades" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end mb-12 md:mb-14">
          <p className="md:col-span-5 order-2 md:order-1 text-[#FAF8F5]/45 leading-relaxed max-w-sm text-[15px]">
            Las herramientas con las que trabajo y, sobre todo, cómo las uso: con pruebas antes de
            desplegar y documentación para quien venga después.
          </p>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 md:text-right">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/35 mb-5">Habilidades</p>
            <h2
              className="leading-[0.95]"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.25rem,5vw,3.75rem)', fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.03em' }}
            >
              Con qué{' '}
              <span className="font-serif italic font-normal text-[#C9A84C]" style={{ letterSpacing: '-0.01em' }}>trabajo.</span>
            </h2>
          </div>
        </div>

        <div
          data-sk-stack
          className="relative rounded-[2rem] border border-[#2A2A35] bg-[#08080B] overflow-hidden"
        >
          {/* Raíl con un punto de luz que recorre las filas */}
          <div data-sk-rail className="absolute left-7 md:left-10 top-0 bottom-0 w-px bg-[#2A2A35]" aria-hidden="true">
            <span className="packet absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#C9A84C] shadow-[0_0_12px_3px_rgba(201,168,76,0.5)]" />
          </div>

          <ul>
            {groups.map((group, i) => (
              <li
                key={group.code}
                data-sk-layer
                className={`group relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center pl-14 md:pl-20 pr-6 md:pr-10 py-7 md:py-8 transition-colors duration-500 hover:bg-[#C9A84C]/[0.035] ${
                  i > 0 ? 'border-t border-[#2A2A35]' : ''
                }`}
              >
                <span className="absolute left-7 md:left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#08080B] border border-[#FAF8F5]/25 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-colors duration-300" />

                <div className="md:col-span-4">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[#C9A84C]/70 mb-1">{group.code}</p>
                  <h3
                    className="text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors duration-300 text-lg"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                  >
                    {group.name}
                  </h3>
                  <p className="text-[13px] text-[#FAF8F5]/35 mt-0.5">{group.note}</p>
                </div>

                <ul className="md:col-span-8 flex flex-wrap items-baseline gap-x-6 md:gap-x-8 gap-y-1">
                  {group.items.map(item => (
                    <li
                      key={item}
                      data-sk-item
                      className="text-[#FAF8F5]/70 group-hover:text-[#FAF8F5] transition-colors duration-300"
                      style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.1rem,1.9vw,1.5rem)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 mt-14">
          <div data-sk-aside className="md:col-span-4 border-t border-[#2A2A35] pt-5">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/35 mb-4">Cómo trabajo</p>
            <ul className="space-y-1.5 text-[#FAF8F5]/65 text-[15px]">
              {aptitudes.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div data-sk-aside className="md:col-span-3 border-t border-[#2A2A35] pt-5">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/35 mb-4">Idiomas</p>
            <p className="text-[#FAF8F5]/75 text-[15px]">Español <span className="font-serif italic text-[#FAF8F5]/40">nativo</span></p>
            <p className="text-[#FAF8F5]/75 text-[15px]">Inglés <span className="font-serif italic text-[#FAF8F5]/40">B2</span></p>
          </div>
          <div data-sk-aside className="md:col-span-5 border-t border-[#2A2A35] pt-5">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/35 mb-4">Certificaciones</p>
            <p className="text-[#FAF8F5]/75 text-[15px]">Google Cybersecurity at Work <span className="font-serif italic text-[#FAF8F5]/40">Google</span></p>
            <p className="text-[#FAF8F5]/75 text-[15px]">Iniciación a la Programación en Python <span className="font-serif italic text-[#FAF8F5]/40">35h · Grup CIEF</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
