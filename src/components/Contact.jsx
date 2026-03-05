import styles from './Contact.module.css'

const INFO = [
  { icon: '📍', val: '愛知県名古屋市',          lbl: '所在地' },
  { icon: '💼', val: 'ホームページ作成・管理',   lbl: '専門' },
  { icon: '⏰', val: '24時間サポート対応',       lbl: 'サポート' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.inner} reveal`}>
        <p className="section-label">Contact</p>
        <div className="glow-line" style={{ margin: '0 auto 1.5rem' }} />
        <h2 className="section-title">お気軽に<br/>ご連絡ください</h2>
        <p>ホームページ制作・管理に関するご依頼・ご相談は<br/>いつでもお待ちしています。</p>
        <div className={styles.infoList}>
          {INFO.map(i => (
            <div key={i.lbl} className={styles.row}>
              <span className={styles.ico}>{i.icon}</span>
              <span className={styles.val}>{i.val}</span>
              <span className={styles.lbl}>{i.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
