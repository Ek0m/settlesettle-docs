'use client'

import React, { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  depth: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Read headings from the main article container
    const headingElements = Array.from(document.querySelectorAll('article h2, article h3'))
    
    const parsed: TocItem[] = headingElements.map(el => ({
      id: el.id,
      text: el.textContent?.replace('#', '').trim() || '',
      depth: el.tagName === 'H2' ? 2 : 3
    })).filter(item => item.id && item.text)

    setHeadings(parsed)

    // Set up IntersectionObserver to track which heading is currently in view
    const observerOptions = {
      rootMargin: '0px 0px -60% 0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    headingElements.forEach((el) => {
      if (el.id) observer.observe(el)
    })

    return () => {
      headingElements.forEach((el) => {
        if (el.id) observer.unobserve(el)
      })
    }
  }, [headings.length]) // re-run if number of headings changes

  if (headings.length === 0) return null

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      })
      setActiveId(id)
      // Update hash in URL silently without scrolling
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <div className="w-56 shrink-0 hidden lg:block h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto p-4 select-none">
      <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
        On this page
      </h5>
      <ul className="space-y-2.5 text-xs">
        {headings.map((h, idx) => (
          <li
            key={idx}
            style={{ paddingLeft: h.depth === 3 ? '12px' : '0px' }}
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => handleScrollTo(e, h.id)}
              className={`block transition-all duration-200 ${
                activeId === h.id
                  ? 'text-emerald-400 font-semibold border-l-2 border-emerald-400 pl-2.5 -ml-2.5'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
