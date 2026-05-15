import { FC } from 'react'
import styles from './Logo.module.css'

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      {/* DARK THEME */}
      <svg className={styles.darkThemeLogoSvg} width="400" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-dark" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <g className={styles.mainText}>
          <text x="4" y="4" fill="#000" opacity="0.5">W</text>
          <text x="68" y="4" fill="#000" opacity="0.5">OMEM</text>

          <text x="0" y="0" fill="#fff" className={styles.flicker} filter="url(#glow-dark)">W</text>
          <text x="64" y="0" fill="#00ff88" filter="url(#glow-dark)">OMEM</text>
        </g>
        <text className={styles.subText} x="14" y="105" fill="#666">
          STAY WAZZOCK / STAY MEME
        </text>
      </svg>

      {/* LIGHT THEME */}
      <svg className={styles.lightThemeLogoSvg} width="400" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-light">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.1"/>
          </filter>
        </defs>
        <g className={styles.mainText} filter="url(#shadow-light)">
          <text x="0" y="0" fill="#00cc66" className={styles.flicker}>W</text>
          <text x="64" y="0" fill="#1a1a1a">OMEM</text>
        </g>
        <text className={styles.subText} x="14" y="105" fill="#ccc">
          STAY WAZZOCK / STAY MEME
        </text>
    </svg>
    </div>
  )
}
