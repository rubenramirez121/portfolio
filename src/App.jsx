import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Hero from './components/Hero'
import Profile from './components/Profile'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Footer from './components/Footer'
import NoiseOverlay from './components/NoiseOverlay'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <>
      <NoiseOverlay />
      <Header />
      <main>
        <Hero />
        <Profile />
        <Experience />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  )
}
