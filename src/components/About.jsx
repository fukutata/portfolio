import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const STATS = [
  { num: 50,  label: '制作実績' },
  { num: 100, label: '満足度 %' },
  { num: 5,   label: '経験年数' },
  { num: 24,  label: 'サポート時間' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ob.unobserve(e.target) } })
    }, { threshold: .15 })
    els.forEach(el => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

export default function About() {
  useReveal()

  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        <div className={`${styles.text} reveal`}>
          <p className="section-label">About</p>
          <div className="glow-line" />
          <h2 className="section-title">Webで<br/>想いを形に。</h2>
          <p>愛知県名古屋市を拠点に活動するWebクリエイター。<br/>お客様のビジネスを最大化するホームページの制作・運用・管理をワンストップで提供します。</p>
          <p>デザインの美しさと使いやすさを両立し、訪れたユーザーが「また来たい」と感じるサイトを作ります。</p>
        </div>

        <div className={`${styles.statsGrid} reveal`}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}

function StatCard({ num, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      let cur = 0
      const step = num / 60
      const tick = () => {
        cur = Math.min(cur + step, num)
        el.textContent = Math.round(cur)
        if (cur < num) requestAnimationFrame(tick)
      }
      tick()
      ob.unobserve(el)
    }, { threshold: .5 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [num])

  return (
    <div className={styles.statCard}>
      <div className={styles.statNum} ref={ref}>0</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}
