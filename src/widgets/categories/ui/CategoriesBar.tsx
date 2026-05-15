'use client'

const categories = [
  'Популярное',
  'Новое',
  'Стикеры',
  'Видео',
  'Рисунки',
  'Скетчи',
  'Пиксель арт',
]

export const CategoriesBar = () => {
  return (
    <div
      className="
        flex
        max-w-[90vw]
        min-w-full
        w-full
        gap-2
        py-3
        overflow-x-auto
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      "
    >
      {categories.map((item, index) => (
        <button
          key={item}
          className={`
            shrink-0
            whitespace-nowrap
            rounded-xl
            px-4
            py-2
            text-sm
          `}
        >
          {item}
        </button>
      ))}
    </div>
  )
}