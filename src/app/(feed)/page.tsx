import {
  Header,
  SearchBar,
  CategoriesBar,
  MobileBottomNav,
  FeedGrid,
} from '@/widgets'

import { getMemes } from '@/entities/server'

export default async function Page() {
  const initialMemesData = await getMemes({
    limit: 20,
  })
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
          min-h-screen
          overflow-x-hidden
          px-4
          pb-24
        "
      >
        <div className="py-4">
          <SearchBar />
          <CategoriesBar />
        </div>

        <FeedGrid
          initialItems={initialMemesData.items}
          initialCursor={initialMemesData.nextCursor}
        />
      </main>

      {/* <MobileBottomNav /> */}
    </>
  )
}