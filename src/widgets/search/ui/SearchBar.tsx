'use client'

export const SearchBar = () => {
  return (
    <div className="w-full">
      <input
        placeholder="Поиск мемов и тегов"
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          px-4
          outline-none
          transition
          focus:border-yellow-400
        "
      />
    </div>
  )
}