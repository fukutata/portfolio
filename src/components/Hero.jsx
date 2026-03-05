import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const PHRASES = [
  'Webサイト制作のプロ',
  'ホームページ管理もお任せ',
  '名古屋発 — 全国対応',
  'あなたのビジネスを加速させます',
]

function useTyping() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timeout

    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => setCharIdx(i => i + 1), 80)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(i => i - 1), 40)
      } else {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % PHRASES.length)
      }
    }
    setText(phrase.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return text
}

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, animId
    const particles = []
    let mx = -999, my = -999

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMouse)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * W
        this.y  = Math.random() * H
        this.r  = Math.random() * 1.5 + .3
        this.vx = (Math.random() - .5) * .4
        this.vy = (Math.random() - .5) * .4
        this.alpha = Math.random() * .5 + .1
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${this.alpha})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle())

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 120) * .12})`
            ctx.lineWidth = .5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 100) { p.x += dx / d * 1.2; p.y += dy / d * 1.2 }
        p.update(); p.draw()
      })
      connect()
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [canvasRef])
}

export default function Hero() {
  const canvasRef = useRef(null)
  const typedText = useTyping()
  useParticles(canvasRef)

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <p className={styles.badge}>Web Creator / Nagoya</p>

      <h1 className={styles.name}>
        <span className={styles.glitch} data-text="福田貴士">福田貴士</span>
        <span className={styles.nameEn}>FUKUDA TAKASHI</span>
      </h1>

      <div className={styles.typewriter}>
        {typedText}<span className={styles.cursor} />
      </div>

      <div className={styles.location}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        愛知県名古屋市
      </div>

      <a href="#contact" className={styles.cta}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        お問い合わせ
      </a>

      <div className={styles.scrollHint}>
        <div className={styles.mouse} />
        <span>SCROLL</span>
      </div>
    </section>
  )
}
