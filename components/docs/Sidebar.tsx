'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationData, NavGroup, NavPage, NavSubgroup } from '@/lib/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  // Helper to determine if a page is currently active
  const isActive = (slug: string) => {
    const targetPath = slug === '' ? '/docs' : `/docs/${slug}`
    return pathname === targetPath
  }

  // Filter navigation data based on query
  const filteredNavigation = useMemo(() => {
    if (!searchQuery) return navigationData

    const query = searchQuery.toLowerCase()
    return navigationData
      .map(group => {
        const filteredPages = group.pages.map(item => {
          if ('pages' in item) {
            // It's a subgroup
            const matchingPages = item.pages.filter(p =>
              p.title.toLowerCase().includes(query) ||
              item.group.toLowerCase().includes(query)
            )
            if (matchingPages.length > 0) {
              return { ...item, pages: matchingPages } as NavSubgroup
            }
            return null
          } else {
            // It's a flat page
            if (item.title.toLowerCase().includes(query)) {
              return item as NavPage
            }
            return null
          }
        }).filter(Boolean) as (NavPage | NavSubgroup)[]

        if (filteredPages.length > 0 || group.group.toLowerCase().includes(query)) {
          return {
            ...group,
            pages: filteredPages.length > 0 ? filteredPages : group.pages
          }
        }
        return null
      })
      .filter(Boolean) as NavGroup[]
  }, [searchQuery])

  const renderPageLink = (page: NavPage, isNested = false) => {
    const active = isActive(page.slug)
    return (
      <Link
        key={page.slug}
        href={page.slug === '' ? '/docs' : `/docs/${page.slug}`}
        className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-sm transition-all duration-200 cursor-pointer ${
          active
            ? 'bg-emerald-500/10 text-emerald-400 font-semibold border-l-2 border-emerald-500 pl-2.5'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
        } ${isNested ? 'ml-3' : ''}`}
      >
        <span>{page.title}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 shrink-0 border-r border-[#1F2937] bg-[#070B14] hidden md:flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto p-4 select-none">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search docs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-1.5 bg-[#0F131E] border border-[#1F2937] rounded-md text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 space-y-6 pb-8">
        {filteredNavigation.length === 0 ? (
          <div className="text-zinc-500 text-sm text-center py-4">No results found</div>
        ) : (
          filteredNavigation.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3 select-none">
                {group.group}
              </h4>
              <div className="space-y-1">
                {group.pages.map((item, itemIdx) => {
                  if ('pages' in item) {
                    // It's a subgroup (e.g. Wallet, Payments)
                    // Check if any subpage is active to open/highlight subgroup style
                    const hasActiveChild = item.pages.some(p => isActive(p.slug))
                    return (
                      <div key={itemIdx} className="space-y-1 pt-1">
                        <div className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-zinc-400 select-none">
                          <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                          <span>{item.group}</span>
                        </div>
                        <div className="border-l border-zinc-800 ml-4.5 space-y-1">
                          {item.pages.map(subPage => renderPageLink(subPage, true))}
                        </div>
                      </div>
                    )
                  } else {
                    // It's a flat page
                    return renderPageLink(item)
                  }
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
