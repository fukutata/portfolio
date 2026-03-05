import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const SKILLS = [
  { name: 'HTML / CSS',    pct: 95 },
  { name: 'JavaScript',   pct: 80 },
  { name: 'WordPress',    pct: 90 },
  { name: 'UI / UX Design', pct: 85 },
  { name: 'SEO 対策',     pct: 80 },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="reveal">
        <p className="section-label">Skills</p>
        <div className="glow-line" />
        <h2 className="section-title">スキルセット</h2>
      </div>
      <div className={styles.list}>
        {SKILLS.map(s => <SkillItem key={s.name} {...s} />)}
      </div>
    </section>
  )
}

function SkillItem({ name, pct }) {
  const fillRef = useRef(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const ob = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.style.transform = `scaleX(${pct / 100})`
      ob.unobserve(el)
    }, { threshold: .5 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [pct])

  return (
    <div className={`${styles.item} reveal`}>
      <div className={styles.header}>
        <span>{name}</span>
        <span className={styles.pct}>{pct}%</span>
      </div>
      <div className={styles.track}>
        <div ref={fillRef} className={styles.fill} />
      </div>
    </div>
  )
}
