import {
  Header,
  SearchBar,
  CategoriesBar,
  MobileBottomNav,
  FeedGrid,
} from '@/widgets'

import { getMemes } from '@/entities/server'

export default async function Page() {
  const memes = await getMemes()
  // console.log(
  //   JSON.stringify(memes, null, 2)
  // )
  return (
    <>
      <Header />

      <main
        className="
          mx-auto
          min-w-0
          max-w-7xl
          overflow-x-hidden
          px-4
          pb-24
        "
      >
        <div className="py-4">
          <SearchBar />
          <CategoriesBar />
        </div>

        <FeedGrid memes={memes} />
      </main>

      <MobileBottomNav />
    </>
  )
}