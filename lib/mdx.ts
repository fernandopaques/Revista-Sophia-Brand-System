import { getModuleBySlug } from './navigation'

export async function getModuleContent(slug: string) {
  const module = getModuleBySlug(slug)
  if (!module) return null

  try {
    const content = await import(`@/content/${module.wave}/${slug}.mdx`)
    return { Content: content.default, metadata: content.metadata ?? {} }
  } catch {
    return null
  }
}
