'use server';
import configPromise from '@/payload.config'
import { importMap } from './admin/importMap'

export const serverFunction = async (args: any) => {
  const { handleServerFunctions } = await import('@payloadcms/next/layouts')
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
