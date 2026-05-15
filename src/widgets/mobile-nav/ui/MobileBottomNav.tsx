'use client'

export const MobileBottomNav = () => {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-[var(--color-border)]
        bg-[color:rgb(from_var(--color-bg)_r_g_b_/_0.85)]
        backdrop-blur-xl

        md:hidden
      "
    >
      <div
        className="
          flex
          items-center
          justify-around
          py-3
        "
      >
        <button>🏠</button>
        <button>🔥</button>
        <button>➕</button>
        <button>❤️</button>
        <button>👤</button>
      </div>
    </nav>
  )
}