import React from 'react'
import { notFound } from 'next/navigation'
import { docsPages } from '@/lib/docs-data'
import MarkdownRenderer from '@/components/docs/MarkdownRenderer'
import Link from 'next/link'

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true,
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

// Clean helper to strip quotes from slugs
const normalizeSlug = (slug: string) => {
  return slug.replace(/^["']|["']$/g, '').trim()
}

export async function generateStaticParams() {
  return docsPages.map((page) => {
    const cleanSlug = normalizeSlug(page.slug)
    return {
      slug: cleanSlug === '' ? [] : cleanSlug.split('/'),
    }
  })
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const slugArr = resolvedParams.slug || []
  const currentSlug = slugArr.join('/')

  // Find matching page
  const pageIndex = docsPages.findIndex((page) => {
    const pageSlugClean = normalizeSlug(page.slug)
    const currentSlugClean = normalizeSlug(currentSlug)
    return pageSlugClean === currentSlugClean
  })

  if (pageIndex === -1) {
    return notFound()
  }

  const page = docsPages[pageIndex]

  // Pagination pages
  const prevPage = pageIndex > 0 ? docsPages[pageIndex - 1] : null
  const nextPage = pageIndex < docsPages.length - 1 ? docsPages[pageIndex + 1] : null

  const getPageHref = (slug: string) => {
    const clean = normalizeSlug(slug)
    return clean === '' ? '/docs' : `/docs/${clean}`
  }

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex items-center">
        <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
          {page.category}
        </span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight pb-4 border-b border-[#1F2937]/50">
        {page.title}
      </h1>

      {/* Markdown Content */}
      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={page.content} />
      </div>

      {/* Linear Reading Bottom Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 mt-12 border-t border-[#1F2937] select-none">
        {prevPage ? (
          <Link
            href={getPageHref(prevPage.slug)}
            className="group flex flex-col items-start gap-1 p-4 rounded-lg border border-[#1F2937] bg-[#0F131E]/20 hover:bg-[#0F131E]/60 hover:border-emerald-500/30 transition-all duration-300"
          >
            <span className="text-xs text-zinc-500 group-hover:text-emerald-400/80 transition-colors flex items-center gap-1 font-mono">
              ← PREVIOUS
            </span>
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
              {prevPage.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPage ? (
          <Link
            href={getPageHref(nextPage.slug)}
            className="group flex flex-col items-end text-right gap-1 p-4 rounded-lg border border-[#1F2937] bg-[#0F131E]/20 hover:bg-[#0F131E]/60 hover:border-emerald-500/30 transition-all duration-300"
          >
            <span className="text-xs text-zinc-500 group-hover:text-emerald-400/80 transition-colors flex items-center gap-1 font-mono">
              NEXT →
            </span>
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
              {nextPage.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  )
}
