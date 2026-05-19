'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationData } from '@/lib/navigation'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (slug: string) => {
    const targetPath = slug === '' ? '/docs' : `/docs/${slug}`
    return pathname === targetPath
  }

  return (
    <header className="h-14 bg-[#070B14]/90 backdrop-blur-md border-b border-[#1F2937] sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 select-none">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <Link href="/docs" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <Image src="/logo-white.png" alt="SettleSettle" width={24} height={24} />
          <span className="font-display font-bold text-white text-base tracking-tight">
            SettleSettle <span className="text-zinc-500 font-normal text-xs ml-0.5 font-mono">Dev Hub</span>
          </span>
        </Link>
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
          v1.0.0-beta
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Status Dot */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0F131E] border border-[#1F2937]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400">api-gateway: active</span>
        </div>

        {/* Console Link */}
        <a
          href="https://settlesettle.uno"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0F131E] border border-[#1F2937] hover:bg-[#1E2538] hover:text-white transition-all text-zinc-300"
        >
          Console →
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded bg-[#0F131E] border border-[#1F2937] hover:bg-[#1E2538] text-zinc-400 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-[#070B14] z-50 overflow-y-auto p-4 md:hidden border-t border-[#1F2937]">
          <div className="space-y-6 pb-20">
            {navigationData.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3">
                  {group.group}
                </h4>
                <div className="space-y-1">
                  {group.pages.map((item, itemIdx) => {
                    if ('pages' in item) {
                      return (
                        <div key={itemIdx} className="space-y-1 pt-1">
                          <div className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-zinc-400">
                            <span>{item.group}</span>
                          </div>
                          <div className="border-l border-zinc-800 ml-4.5 space-y-1">
                            {item.pages.map(subPage => {
                              const active = isActive(subPage.slug)
                              return (
                                <Link
                                  key={subPage.slug}
                                  href={subPage.slug === '' ? '/docs' : `/docs/${subPage.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-sm transition-all duration-200 ${
                                    active
                                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                                      : 'text-zinc-400 hover:text-zinc-200'
                                  } ml-3`}
                                >
                                  <span>{subPage.title}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    } else {
                      const active = isActive(item.slug)
                      return (
                        <Link
                          key={item.slug}
                          href={item.slug === '' ? '/docs' : `/docs/${item.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-sm transition-all duration-200 ${
                            active
                              ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                              : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <span>{item.title}</span>
                        </Link>
                      )
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
