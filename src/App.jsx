import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Contact from './components/Contact'
import styles from './App.module.css'

export default function App() {
  return (
    <>
      <div className="sphere sphere1" />
      <div className="sphere sphere2" />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Contact />
      <footer className={styles.footer}>
        <p>© 2025 福田貴士 (Fukuda Takashi) — Web Creator, Nagoya</p>
      </footer>
    </>
  )
}
