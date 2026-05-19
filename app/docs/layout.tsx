import React from 'react'
import Header from '@/components/docs/Header'
import Sidebar from '@/components/docs/Sidebar'
import TableOfContents from '@/components/docs/TableOfContents'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-[#F3F4F6]">
      {/* Premium Top Navigation Bar */}
      <Header />

      {/* Main Grid: Sidebar + Content Area + Right TOC */}
      <div className="flex-1 max-w-8xl w-full mx-auto flex items-stretch">
        {/* Sticky left sidebar */}
        <Sidebar />

        {/* Page Content area */}
        <main className="flex-1 min-w-0 py-8 px-4 md:px-8 lg:px-12 flex flex-col justify-between">
          <article className="max-w-3xl w-full mx-auto pb-16">
            {children}
          </article>

          {/* Simple footer inside content */}
          <footer className="border-t border-[#1F2937]/50 pt-6 mt-16 max-w-3xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© 2026 Pathy Technology Limited. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://settlesettle.uno" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Platform</a>
              <a href="https://github.com/Ek0m" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
              <a href="/docs/security/data" className="hover:text-zinc-300 transition-colors">Privacy &amp; NDPR</a>
            </div>
          </footer>
        </main>

        {/* Sticky right Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  )
}
