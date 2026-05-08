import React from 'react'

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Загрузка мема
      </h1>

      <form className="space-y-4">
        <input
          placeholder="Title"
          className="
            w-full
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
          "
        />

        <input
          placeholder="Slug"
          className="
            w-full
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
          "
        />

        <textarea
          placeholder="Description"
          className="
            min-h-[120px]
            w-full
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
          "
        />

        <input type="file" />

        <button
          className="
            rounded-xl
            bg-white
            px-6
            py-3
            text-black
          "
        >
          Publish
        </button>
      </form>
    </main>
  )
}
