import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const steps = [
  { period: '2022 — 2024', field: 'Desarrollo de Aplicaciones Web', institution: 'IES Ciudad Escolar, Madrid', detail: 'CFGS' },
  { period: '2018 — 2020', field: 'Bachillerato Científico', institution: 'GSD International School Buitrago' },
]

export default function Education() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-edu-row]', {
        clipPath: 'inset(0 0 100% 0)',
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-edu-list]', start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="educacion" ref={ref} className="py-24 md:py-32 px-6 bg-[#0A0A0E]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 md:mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/35 mb-5">Educación</p>
          <h2
            className="leading-[0.95]"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.25rem,5vw,3.75rem)', fontWeight: 800, color: '#FAF8F5', letterSpacing: '-0.03em' }}
          >
            Formación{' '}
            <span className="font-serif italic font-normal text-[#C9A84C]" style={{ letterSpacing: '-0.01em' }}>académica</span>
          </h2>
        </div>

        <ol data-edu-list>
          {steps.map(step => (
            <li
              key={step.field}
              data-edu-row
              className={`group grid grid-cols-12 gap-x-4 gap-y-1 items-baseline py-6 border-t transition-[padding] duration-500 md:hover:pl-3 ${
                step.arrival ? 'border-[#C9A84C]/50' : 'border-[#2A2A35]'
              }`}
            >
              <span className={`col-span-12 md:col-span-2 font-mono text-[11px] ${step.arrival ? 'text-[#C9A84C]' : 'text-[#FAF8F5]/35'}`}>
                {step.period}
              </span>
              <span
                className={`col-span-12 md:col-span-6 transition-colors duration-300 ${
                  step.arrival ? 'font-serif italic text-[#C9A84C]' : 'text-[#FAF8F5]/85 group-hover:text-[#FAF8F5]'
                }`}
                style={{
                  fontFamily: step.arrival ? undefined : 'Syne, sans-serif',
                  fontSize: 'clamp(1.15rem,1.9vw,1.5rem)',
                  fontWeight: step.arrival ? 400 : 700,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                {step.field}
              </span>
              <span className="col-span-12 md:col-span-4 md:text-right text-sm text-[#FAF8F5]/40">
                {step.institution}
                {step.detail && <span className="font-mono text-[11px] text-[#FAF8F5]/25 ml-2">· {step.detail}</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
