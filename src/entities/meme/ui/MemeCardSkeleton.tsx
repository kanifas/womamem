export const MemeCardSkeleton = () => {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
      "
    >
      <div
        className="
          aspect-[4/5]
          bg-[var(--color-card)]
        "
      />

      <div className="p-3">
        <div
          className="
            h-4
            w-3/4
            rounded
            bg-[var(--color-card)]
          "
        />
      </div>
    </div>
  )
}