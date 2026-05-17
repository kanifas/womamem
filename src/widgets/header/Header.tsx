'use client'

import { Logo } from './ui/Logo'
import { ThemeToggleButton } from '@/features'

export const Header = () => {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        items-center
        justify-between
        border-b
        border-[var(--color-border)]
        bg-[color:rgb(from_var(--color-bg)_r_g_b_/_0.75)]
        backdrop-blur-xl
      "
    >
      <Logo />

      <div className="flex items-center gap-3">
        <ThemeToggleButton />
      </div>
    </header>
  )
}