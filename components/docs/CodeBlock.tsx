'use client'

import React, { useState } from 'react'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // A very lightweight, clean syntax highlighter using regex token replacements
  const highlight = (txt: string, lang: string) => {
    const escaped = txt
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const tokens: string[] = []

    const getAlphabeticalIndex = (num: number): string => {
      let str = ''
      while (num >= 0) {
        str = String.fromCharCode(65 + (num % 26)) + str
        num = Math.floor(num / 26) - 1
      }
      return str
    }

    const getIndexFromAlphabetical = (str: string): number => {
      let num = 0
      for (let i = 0; i < str.length; i++) {
        num = num * 26 + (str.charCodeAt(i) - 64)
      }
      return num - 1
    }

    const addToken = (html: string): string => {
      const idx = tokens.length
      tokens.push(html)
      return `__SS_HIGHLIGHT_TOKEN_${getAlphabeticalIndex(idx)}__`
    }

    let result = escaped

    if (lang === 'typescript' || lang === 'javascript' || lang === 'ts' || lang === 'js') {
      // Comments
      result = result.replace(/(\/\/.*)/g, (_, p1) =>
        addToken(`<span class="text-zinc-500 font-normal">${p1}</span>`)
      )
      // Strings
      result = result.replace(/('(.*?)'|"(.*?)"|`(.*?)`)/g, (_, p1) =>
        addToken(`<span class="text-emerald-400">${p1}</span>`)
      )
      // Keywords
      result = result.replace(/\b(import|export|default|const|let|var|function|return|async|await|try|catch|if|else|throw|new|instanceof|class|from|typeof|as)\b/g, (_, p1) =>
        addToken(`<span class="text-violet-400 font-medium">${p1}</span>`)
      )
      // Types & classes
      result = result.replace(/\b(SettleSettle|InsufficientCreditsError|AuthenticationError|ValidationError|RateLimitError|TimeoutError|ApiError|SettleSettleError|Promise|string|number|boolean|any|void|unknown|never|Error)\b/g, (_, p1) =>
        addToken(`<span class="text-teal-400">${p1}</span>`)
      )
      // Method calls
      result = result.replace(/\.([a-zA-Z0-9_]+)(?=\()/g, (_, p1) =>
        '.' + addToken(`<span class="text-blue-400">${p1}</span>`)
      )
      // Booleans & Numbers
      result = result.replace(/\b(true|false|null|undefined|\d+)\b/g, (_, p1) =>
        addToken(`<span class="text-amber-400">${p1}</span>`)
      )
    }

    if (lang === 'json') {
      // String properties (keys)
      result = result.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g, (_, p1, p2, p3) =>
        addToken(`<span class="text-violet-400">${p1}</span>`) + p3
      )
      // String values
      result = result.replace(/:(\s*"([^\\"]|\\")*")/g, (_, p1) =>
        ': ' + addToken(`<span class="text-emerald-400">${p1.trim()}</span>`)
      )
      // Booleans, Numbers, null
      result = result.replace(/\b(true|false|null|\d+)\b/g, (_, p1) =>
        addToken(`<span class="text-amber-400">${p1}</span>`)
      )
    }

    if (lang === 'http') {
      // Headers
      result = result.replace(/^([a-zA-Z0-9-]+):/gm, (_, p1) =>
        addToken(`<span class="text-violet-400">${p1}</span>`) + ':'
      )
      // HTTP Methods
      result = result.replace(/\b(GET|POST|PUT|DELETE|PATCH|OPTIONS|http|https)\b/g, (_, p1) =>
        addToken(`<span class="text-teal-400 font-semibold">${p1}</span>`)
      )
    }

    if (lang === 'bash' || lang === 'sh') {
      // Comments
      result = result.replace(/(#.*)/g, (_, p1) =>
        addToken(`<span class="text-zinc-500 font-normal">${p1}</span>`)
      )
      // Commands
      result = result.replace(/\b(npm|pnpm|yarn|install|add|git|clone|cd|node|run|dev|build|start)\b/g, (_, p1) =>
        addToken(`<span class="text-violet-400 font-medium">${p1}</span>`)
      )
    }

    if (lang === 'python' || lang === 'py') {
      // Comments
      result = result.replace(/(#.*)/g, (_, p1) =>
        addToken(`<span class="text-zinc-500 font-normal">${p1}</span>`)
      )
      // Strings
      result = result.replace(/('(.*?)'|"(.*?)"|`(.*?)`)/g, (_, p1) =>
        addToken(`<span class="text-emerald-400">${p1}</span>`)
      )
      // Keywords
      result = result.replace(/\b(import|from|def|class|return|async|await|try|except|raise|if|else|elif|pass|as|with|print|is|not|in)\b/g, (_, p1) =>
        addToken(`<span class="text-violet-400 font-medium">${p1}</span>`)
      )
      // Types & classes
      result = result.replace(/\b(SettleSettle|AsyncSettleSettle|InsufficientCreditsError|AuthenticationError|ValidationError|RateLimitError|TimeoutError|ApiError|SettleSettleError|dict|list|str|int|float|bool|None)\b/g, (_, p1) =>
        addToken(`<span class="text-teal-400">${p1}</span>`)
      )
      // Method calls
      result = result.replace(/\.([a-zA-Z0-9_]+)(?=\()/g, (_, p1) =>
        '.' + addToken(`<span class="text-blue-400">${p1}</span>`)
      )
      // Booleans & Numbers
      result = result.replace(/\b(True|False|None|\d+)\b/g, (_, p1) =>
        addToken(`<span class="text-amber-400">${p1}</span>`)
      )
    }

    // Restore all tokens in one pass
    let restored = result
    restored = restored.replace(/__SS_HIGHLIGHT_TOKEN_([A-Z]+)__/g, (_, p1) => {
      const idx = getIndexFromAlphabetical(p1)
      return tokens[idx]
    })

    return restored
  }

  return (
    <div className="relative my-6 group rounded-lg border border-[#1F2937] bg-[#0F131E] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1F2937] bg-[#0A0D16] text-xs text-zinc-400 font-mono select-none">
        <span>{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#161B29] border border-[#252E44] hover:bg-[#1E2538] hover:text-white transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono text-zinc-200 leading-relaxed bg-[#0F131E]">
        <pre className="m-0 whitespace-pre">
          <code dangerouslySetInnerHTML={{ __html: highlight(code, language) }} />
        </pre>
      </div>
    </div>
  )
}
