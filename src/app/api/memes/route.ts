import { NextRequest, NextResponse } from 'next/server'

import { getMemes } from '@/entities/server'

export async function GET(
  req: NextRequest,
) {
  const cursor =
    req.nextUrl.searchParams.get('cursor') ??
    undefined

  const limitParam =
    req.nextUrl.searchParams.get('limit')

  const limit = limitParam
    ? Number(limitParam)
    : 20

  const data = await getMemes({
    cursor,
    limit,
  })

  return NextResponse.json(data)
}