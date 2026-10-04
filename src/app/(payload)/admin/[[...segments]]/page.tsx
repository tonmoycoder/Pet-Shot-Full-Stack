import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export async function generateMetadata({ params, searchParams }: Args) {
  return generatePageMetadata({ config, params, searchParams })
}

export default async function Page({ params, searchParams }: Args) {
  const p = await params
  console.log('[DEBUG page] params:', p)
  try {
    return (
      <RootPage
        config={config}
        importMap={importMap}
        params={params}
        searchParams={searchParams}
      />
    )
  } catch (e) {
    console.log('[DEBUG page] error:', e)
    throw e
  }
}
