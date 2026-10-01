import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const jobs = [
  {
    company: 'HCLTech',
    role: 'Software Developer',
    period: 'Ene 2025 — Presente',
    location: 'Madrid',
    summary: 'Desarrollo e integración de servicios backend para operadores móviles, en entornos de producción críticos.',
    highlights: [
      'Lideré de principio a fin la incorporación de dos nuevos operadores (SUMA y AVATEL): desarrollo, pruebas y puesta en producción.',
      'Responsable de despliegues nocturnos en producción, garantizando que el servicio no se interrumpa.',
      'Pruebas y validación de cada funcionalidad antes de llegar a los clientes.',
    ],
    stack: ['Bash', 'MySQL', 'Java', 'Linux'],
    current: true,
  },
  {
    company: 'Hewlett Packard Enterprise',
    role: 'Software Developer',
    period: 'Sep 2024 — Ene 2025',
    location: 'Las Rozas de Madrid',
    summary: 'Desarrollo de nuevas funcionalidades para Orange España sobre su red móvil.',
    highlights: [
      'Primeros despliegues en producción, validaciones y soporte directo a operadores.',
      'Pruebas y validación de funcionalidades antes de su despliegue.',
    ],
    stack: ['Bash', 'MySQL', 'Java'],
    current: false,
  },
  {
    company: 'Hewlett Packard Enterprise',
    role: 'Desarrollador en prácticas',
    period: 'Abr 2024 — Jun 2024',
    location: 'Las Rozas de Madrid',
    summary: 'Formación en las plataformas de telecomunicaciones de HPE participando en un proyecto real con operadores.',
    highlights: [],
    stack: [],
    current: false,
  },
]

export default function Experience() {
  const ref = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // La línea dorada avanza al ritmo del scroll
      gsap.fromTo('[data-exp-progress]', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: listRef.current, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
      })

      gsap.utils.toArray('[data-exp-item]').forEach(item => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: item,
            start: 'top 65%',
            toggleClass: { targets: item, className: 'is-active' },
          },
        })
        tl.from(item.querySelector('[data-exp-company]'), { yPercent: 105, duration: 0.9, ease: 'power4.out' })
          .from(item.querySelectorAll('[data-exp-fade]'), { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.6')
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experiencia" ref={ref} className="py-24 md:py-32 px-6 bg-[#0A0A0E]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-14 md:mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/35 mb-5">Experiencia</p>
          <h2
            className="leading-[0.95]"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.25rem,5vw,3.75rem)', fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.03em' }}
          >
            Trayectoria
          </h2>
        </div>

        <div ref={listRef} className="relative">
          {/* Raíl: base gris + progreso dorado */}
          <div className="absolute left-0 md:left-[calc(33.333%-1px)] top-0 bottom-0 w-px bg-[#2A2A35]" />
          <div data-exp-progress className="absolute left-0 md:left-[calc(33.333%-1px)] top-0 bottom-0 w-px bg-[#C9A84C] origin-top" />

          {jobs.map((job, i) => (
            <article
              key={i}
              data-exp-item
              className="exp-item relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 pl-8 md:pl-0 py-10 md:py-12"
            >
              {/* Nodo sobre el raíl */}
              <span className="exp-node absolute left-0 md:left-[33.333%] top-[3rem] md:top-[3.5rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0A0A0E] border border-[#FAF8F5]/25 transition-all duration-500" />

              <div className="md:pr-10">
                <p data-exp-fade className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#FAF8F5]/40 mb-2.5">
                  {job.period}
                </p>
                <div className="overflow-hidden">
                  <h3
                    data-exp-company
                    className="exp-company leading-[1.1] text-[#FAF8F5]/45 transition-colors duration-500"
                    style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.2rem,1.9vw,1.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}
                  >
                    {job.company}
                  </h3>
                </div>
                <p data-exp-fade className="font-mono text-[11px] text-[#FAF8F5]/25 mt-2">{job.location}</p>
              </div>

              <div className="md:col-span-2 md:pl-12 max-w-2xl">
                <p data-exp-fade className="font-serif italic text-[#C9A84C] text-lg md:text-xl mb-3">
                  {job.role}
                  {job.current && <span className="not-italic font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/40 ml-3 align-middle">— ahora</span>}
                </p>
                <p data-exp-fade className="text-[#FAF8F5]/65 leading-relaxed text-[15px] mb-4">
                  {job.summary}
                </p>

                {job.highlights.length > 0 && (
                  <ul data-exp-fade className="space-y-2 mb-5">
                    {job.highlights.map(h => (
                      <li key={h} className="relative pl-5 text-[#FAF8F5]/45 leading-relaxed text-sm">
                        <span className="absolute left-0 top-[0.6em] w-2 h-px bg-[#C9A84C]/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack.length > 0 && (
                  <p data-exp-fade className="font-mono text-[11px] text-[#FAF8F5]/30">
                    {job.stack.map((tag, j) => (
                      <span key={tag}>
                        {j > 0 && <span className="text-[#C9A84C]/50 mx-2">/</span>}
                        {tag}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
