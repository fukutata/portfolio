import styles from './Services.module.css'

const SERVICES = [
  { icon: '🖥️', title: 'ホームページ制作', desc: 'ビジネスの目標に合わせたオリジナルデザインのWebサイトを一から制作。レスポンシブ対応で、あらゆるデバイスで美しく表示されます。', tag: 'HTML / CSS / JS' },
  { icon: '⚙️', title: 'サイト管理・運用',  desc: '公開後の更新作業、障害対応、定期バックアップ。サイトを常に最良の状態に保つための継続的なサポートを提供します。', tag: '保守 / 運用' },
  { icon: '📈', title: 'SEO / 集客改善',   desc: '検索エンジンに評価されやすい構造と、ユーザーを引き込むコンテンツ設計で、継続的な集客を支援します。', tag: 'SEO / Analytics' },
  { icon: '🎨', title: 'デザインリニューアル', desc: '古くなったサイトを現代的なデザインに刷新。ブランドイメージを強化し、コンバージョン率の向上を目指します。', tag: 'リニューアル' },
  { icon: '🛒', title: 'ECサイト構築',    desc: '商品販売からカート・決済まで、売れるオンラインショップをフルカスタマイズで構築します。', tag: 'EC / 決済' },
  { icon: '💬', title: 'お気軽ご相談',    desc: '「何から始めればいいかわからない」方も大歓迎。要件整理から一緒に考えます。', tag: '無料相談' },
]

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.inner}>
        <div className="reveal">
          <p className="section-label">Services</p>
          <div className="glow-line" />
          <h2 className="section-title">提供サービス</h2>
        </div>
        <div className={styles.grid}>
          {SERVICES.map(s => (
            <div key={s.title} className={`${styles.card} reveal`}>
              <div className={styles.icon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className={styles.tag}>{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
