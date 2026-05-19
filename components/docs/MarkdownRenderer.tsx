'use client'

import React from 'react'
import Link from 'next/link'
import CodeBlock from './CodeBlock'

interface MarkdownRendererProps {
  content: string
}

// Custom inline parser to convert md text to React nodes
export function parseInline(text: string): React.ReactNode[] {
  if (!text) return []

  const tokens: React.ReactNode[] = []
  let index = 0

  while (index < text.length) {
    const boldIndex = text.indexOf('**', index)
    const codeIndex = text.indexOf('`', index)
    const linkIndex = text.indexOf('[', index)

    // Find the closest token
    const indices = [
      { type: 'bold', pos: boldIndex },
      { type: 'code', pos: codeIndex },
      { type: 'link', pos: linkIndex },
    ].filter(item => item.pos !== -1)

    if (indices.length === 0) {
      // No more tokens, add remaining text
      tokens.push(text.slice(index))
      break
    }

    // Sort by position
    indices.sort((a, b) => a.pos - b.pos)
    const nextToken = indices[0]

    // Add text before token
    if (nextToken.pos > index) {
      tokens.push(text.slice(index, nextToken.pos))
      index = nextToken.pos
    }

    if (nextToken.type === 'bold') {
      const closingPos = text.indexOf('**', index + 2)
      if (closingPos !== -1) {
        const innerText = text.slice(index + 2, closingPos)
        tokens.push(
          <strong key={`bold-${index}`} className="font-semibold text-white">
            {parseInline(innerText)}
          </strong>
        )
        index = closingPos + 2
      } else {
        // Unclosed tag
        tokens.push('**')
        index += 2
      }
    } else if (nextToken.type === 'code') {
      const closingPos = text.indexOf('`', index + 1)
      if (closingPos !== -1) {
        const innerText = text.slice(index + 1, closingPos)
        tokens.push(
          <code
            key={`code-${index}`}
            className="px-1.5 py-0.5 rounded bg-[#0F131E] border border-[#1F2937] text-emerald-400 font-mono text-xs select-all"
          >
            {innerText}
          </code>
        )
        index = closingPos + 1
      } else {
        // Unclosed tag
        tokens.push('`')
        index += 1
      }
    } else if (nextToken.type === 'link') {
      const labelEnd = text.indexOf(']', index + 1)
      if (labelEnd !== -1) {
        const urlStart = text.indexOf('(', labelEnd + 1)
        if (urlStart === labelEnd + 1) {
          const urlEnd = text.indexOf(')', urlStart + 1)
          if (urlEnd !== -1) {
            const label = text.slice(index + 1, labelEnd)
            const url = text.slice(urlStart + 1, urlEnd)
            
            // Check if it is an external link
            const isExternal = url.startsWith('http://') || url.startsWith('https://')
            const isDocLink = url.startsWith('/docs/') || url.startsWith('/')

            if (isDocLink) {
              // Convert to SPA Link
              // Ensure doc link matches Next.js docs structure
              let finalUrl = url
              if (url.startsWith('/docs')) {
                // Keep /docs route
                finalUrl = url
              } else if (url.startsWith('/')) {
                // Non-docs links can go to page directly
                finalUrl = url
              }
              tokens.push(
                <Link
                  key={`link-${index}`}
                  href={finalUrl}
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium transition-colors duration-200"
                >
                  {parseInline(label)}
                </Link>
              )
            } else {
              tokens.push(
                <a
                  key={`link-${index}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium transition-colors duration-200"
                >
                  {parseInline(label)}
                </a>
              )
            }
            index = urlEnd + 1
            continue
          }
        }
      }
      tokens.push('[')
      index += 1
    }
  }

  return tokens
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null

  // Normalize line endings
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 1. Skip empty lines
    if (line === '' || trimmed === '') {
      i++
      continue
    }

    // 2. Code Block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // Skip closing ```
      blocks.push(
        <CodeBlock
          key={`code-block-${i}`}
          code={codeLines.join('\n')}
          language={lang || 'text'}
        />
      )
      continue
    }

    // 3. Blockquote or Alert Boxes
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = []
      let isNote = false
      let isAlert = false

      // Check the type of blockquote on first line
      const firstLineContent = trimmed.slice(1).trim()
      if (firstLineContent.startsWith('[!NOTE]')) {
        isNote = true
        quoteLines.push(firstLineContent.slice(7).trim())
      } else if (firstLineContent.startsWith('[!WARNING]') || firstLineContent.startsWith('[!CAUTION]')) {
        isAlert = true
        quoteLines.push(firstLineContent.slice(10).trim())
      } else {
        quoteLines.push(firstLineContent)
      }

      i++
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        const nextQuoteContent = lines[i].trim().slice(1).trim()
        quoteLines.push(nextQuoteContent)
        i++
      }

      const parsedText = quoteLines.filter(Boolean).join(' ')

      if (isNote) {
        blocks.push(
          <div
            key={`note-${i}`}
            className="my-6 p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-950/20 text-zinc-300 text-sm flex items-start gap-3"
          >
            <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="leading-relaxed">{parseInline(parsedText)}</div>
          </div>
        )
      } else if (isAlert) {
        blocks.push(
          <div
            key={`alert-${i}`}
            className="my-6 p-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-950/20 text-zinc-300 text-sm flex items-start gap-3"
          >
            <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="leading-relaxed">{parseInline(parsedText)}</div>
          </div>
        )
      } else {
        blocks.push(
          <blockquote
            key={`blockquote-${i}`}
            className="my-6 pl-4 border-l-2 border-zinc-700 text-zinc-400 italic text-sm leading-relaxed"
          >
            {parseInline(parsedText)}
          </blockquote>
        )
      }
      continue
    }

    // 4. Horizontal Rule
    if (trimmed === '---') {
      blocks.push(<hr key={`hr-${i}`} className="my-8 border-[#1F2937]" />)
      i++
      continue
    }

    // 5. Table
    if (trimmed.startsWith('|')) {
      const tableLines: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        // Split cell contents by |
        const cells = lines[i]
          .split('|')
          .slice(1, -1) // remove leading and trailing empty splits
          .map(c => c.trim())
        tableLines.push(cells)
        i++
      }

      // Separate headers, alignments and rows
      const headers = tableLines[0] || []
      const alignLine = tableLines[1] || []
      const rows = tableLines.slice(2)

      const aligns = alignLine.map(col => {
        if (col.startsWith(':') && col.endsWith(':')) return 'center'
        if (col.endsWith(':')) return 'right'
        return 'left'
      })

      blocks.push(
        <div key={`table-container-${i}`} className="my-6 w-full overflow-x-auto rounded-lg border border-[#1F2937] bg-[#080B12]">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#1F2937] bg-[#0F131E]">
                {headers.map((h, idx) => (
                  <th
                    key={`th-${idx}`}
                    className="px-4 py-3 font-semibold text-white text-xs uppercase tracking-wider"
                    style={{ textAlign: aligns[idx] || 'left' }}
                  >
                    {parseInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={`tr-${rowIdx}`}
                  className="border-b border-[#1F2937]/50 hover:bg-[#0F131E]/40 transition-colors"
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={`td-${rowIdx}-${cellIdx}`}
                      className="px-4 py-3 text-zinc-300 font-mono text-xs whitespace-pre-line"
                      style={{ textAlign: aligns[cellIdx] || 'left' }}
                    >
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // 6. Headers
    if (trimmed.startsWith('#')) {
      const hashMatch = trimmed.match(/^(#{1,6})\s+(.*)$/)
      if (hashMatch) {
        const depth = hashMatch[1].length
        const headingText = hashMatch[2].trim()
        const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-')

        const headingProps = {
          key: `heading-${i}`,
          id,
          className: 'group relative font-display text-white mt-8 mb-4'
        }

        const headingContent = (
          <>
            {parseInline(headingText)}
            <a
              href={`#${id}`}
              className="absolute -left-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity font-normal text-base pr-2 select-none"
            >
              #
            </a>
          </>
        )

        if (depth === 1) {
          blocks.push(<h1 {...headingProps} className={`${headingProps.className} text-3xl font-extrabold pb-2 border-b border-[#1F2937]`}>{headingContent}</h1>)
        } else if (depth === 2) {
          blocks.push(<h2 {...headingProps} className={`${headingProps.className} text-xl font-bold pb-1 border-b border-[#1F2937]/50`}>{headingContent}</h2>)
        } else if (depth === 3) {
          blocks.push(<h3 {...headingProps} className={`${headingProps.className} text-lg font-semibold`}>{headingContent}</h3>)
        } else {
          blocks.push(<h4 {...headingProps} className={`${headingProps.className} text-base font-semibold`}>{headingContent}</h4>)
        }
        i++
        continue
      }
    }

    // 7. Unordered / Ordered Lists
    const isUnordered = trimmed.startsWith('- ') || trimmed.startsWith('* ')
    const isOrdered = /^\d+\.\s+/.test(trimmed)

    if (isUnordered || isOrdered) {
      const listItems: { text: string; indent: number }[] = []
      
      while (i < lines.length) {
        const nextLine = lines[i]
        const nextTrimmed = nextLine.trim()
        const indent = nextLine.length - nextLine.trimStart().length

        if (nextTrimmed === '') {
          i++
          continue
        }

        const matchUnordered = nextTrimmed.startsWith('- ') || nextTrimmed.startsWith('* ')
        const matchOrdered = /^\d+\.\s+/.test(nextTrimmed)

        if (matchUnordered) {
          listItems.push({ text: nextTrimmed.slice(2), indent })
          i++
        } else if (matchOrdered) {
          const numMatch = nextTrimmed.match(/^(\d+\.)\s+(.*)$/)
          listItems.push({ text: numMatch ? numMatch[2] : nextTrimmed, indent })
          i++
        } else {
          // Check if this is part of the previous list item
          if (indent > 2 && listItems.length > 0) {
            listItems[listItems.length - 1].text += '\n' + nextTrimmed
            i++
          } else {
            break
          }
        }
      }

      const key = `list-${i}`

      // A simple rendering that maps flat items (can expand to nested if needed, but settlesettle docs lists are mostly flat)
      if (isUnordered) {
        blocks.push(
          <ul key={key} className="my-4 list-disc pl-6 text-zinc-300 text-sm space-y-2 leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginLeft: `${item.indent * 4}px` }}>
                {parseInline(item.text)}
              </li>
            ))}
          </ul>
        )
      } else {
        blocks.push(
          <ol key={key} className="my-4 list-decimal pl-6 text-zinc-300 text-sm space-y-2 leading-relaxed">
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginLeft: `${item.indent * 4}px` }}>
                {parseInline(item.text)}
              </li>
            ))}
          </ol>
        )
      }
      continue
    }

    // 8. Normal Paragraph (Collect contiguous lines of text)
    const paragraphLines: string[] = []
    while (i < lines.length) {
      const nextLine = lines[i]
      const nextTrimmed = nextLine.trim()
      
      // Stop if empty line, code block, header, table, blockquote, or list starts
      if (
        nextTrimmed === '' ||
        nextTrimmed.startsWith('```') ||
        nextTrimmed.startsWith('#') ||
        nextTrimmed.startsWith('|') ||
        nextTrimmed.startsWith('>') ||
        nextTrimmed.startsWith('- ') ||
        nextTrimmed.startsWith('* ') ||
        /^\d+\.\s+/.test(nextTrimmed) ||
        nextTrimmed === '---'
      ) {
        break
      }
      
      paragraphLines.push(nextLine)
      i++
    }

    if (paragraphLines.length > 0) {
      blocks.push(
        <p key={`p-${i}`} className="my-4 text-zinc-300 text-sm leading-relaxed">
          {parseInline(paragraphLines.join(' '))}
        </p>
      )
    }
  }

  return <div className="space-y-4">{blocks}</div>
}
