/**
 * RAG (Retrieval-Augmented Generation) search over brand documents.
 * Scores and retrieves relevant brand docs for a given user query.
 */

import { BRAND_DOCS, type BrandDoc } from '@/lib/ai/brand-docs'

/**
 * Given a free-text query, returns the top matching brand document excerpts
 * formatted as a context block to inject into the system prompt.
 */
export function getRelevantContext(query: string): string {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length >= 3)

  if (terms.length === 0) return ''

  type ScoredDoc = { doc: BrandDoc; score: number }

  const scored: ScoredDoc[] = BRAND_DOCS.map((doc) => {
    const lowerContent = doc.content.toLowerCase()
    const score = terms.reduce((acc, term) => {
      // Count occurrences of this term in the document content
      let count = 0
      let pos = lowerContent.indexOf(term)
      while (pos !== -1) {
        count++
        pos = lowerContent.indexOf(term, pos + 1)
      }
      return acc + count
    }, 0)
    return { doc, score }
  })

  const topMatches = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (topMatches.length === 0) return ''

  const sections = topMatches.map(({ doc }) => {
    return `[MÓDULO: ${doc.title} | ${doc.wave}]\n${doc.content.slice(0, 2000)}`
  })

  return (
    '=== DOCUMENTOS RELEVANTES DA BASE DE MARCA ===\n\n' +
    sections.join('\n\n---\n\n')
  )
}

/**
 * Returns a summary index of all brand documents (title + wave + first 200 chars).
 * Used to build the system prompt index so the AI knows what modules exist.
 */
export function getAllDocsContext(): string {
  const entries = BRAND_DOCS.map((doc) => {
    const preview = doc.content.slice(0, 200).replace(/\n+/g, ' ').trim()
    return `- [${doc.wave}] ${doc.title}: ${preview}`
  })

  return entries.join('\n')
}
