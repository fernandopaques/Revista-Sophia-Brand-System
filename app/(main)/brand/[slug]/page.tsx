import { notFound } from 'next/navigation'
import { getAllSlugs, getModuleBySlug, getPrevNext } from '@/lib/navigation'
import { getModuleContent } from '@/lib/mdx'
import { PageNav } from '@/components/brand/PageNav'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const module = getModuleBySlug(slug)
  return {
    title: module ? `${module.title} — Brand System ET` : 'Brand System ET',
  }
}

export default async function BrandModulePage({ params }: Props) {
  const { slug } = await params
  const result = await getModuleContent(slug)
  if (!result) notFound()

  const { Content } = result
  const { prev, next } = getPrevNext(slug)

  return (
    <article className="scroll-container h-full" style={{ padding: '48px 64px 0', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <Content />
      <PageNav prev={prev} next={next} />
    </article>
  )
}
