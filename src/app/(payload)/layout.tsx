import config from '@/payload.config'
import '@payloadcms/next/css'
import './custom.scss'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'
import { serverFunction } from './serverFunction'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout 
      config={config} 
      importMap={importMap} 
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}


