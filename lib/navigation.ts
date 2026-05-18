export interface NavModule {
  slug: string
  title: string
  wave: 'estrategia' | 'verbal' | 'visual'
  order: number
}

export interface Wave {
  id: 'estrategia' | 'verbal' | 'visual'
  label: string
  modules: NavModule[]
}

export interface NavStandalone {
  title: string
  href: string
  slug: string
}

export interface NavExternal {
  title: string
  href: string
}

// ── Itens standalone (topo, sem grupo) ───────────────────────────────────────
export const STANDALONE_ITEMS: NavStandalone[] = [
  { title: 'Brand System',        href: '/dashboard',                slug: 'home' },
  { title: 'Identidade da Marca', href: '/brand/identidade-visual',  slug: 'identidade-visual' },
  { title: 'Gestão de Ativos',    href: '/assets',                   slug: 'assets' },
]

// ── Ondas / grupos colapsáveis ────────────────────────────────────────────────
export const NAVIGATION: Wave[] = [
  {
    id: 'estrategia',
    label: 'Estratégia de Marca',
    modules: [
      { slug: 'auditoria-mercado',   title: 'Auditoria de Mercado',  wave: 'estrategia', order: 1 },
      { slug: 'auditoria-publico',   title: 'Auditoria de Público',  wave: 'estrategia', order: 2 },
      { slug: 'auditoria-negocio',   title: 'Auditoria de Negócio',  wave: 'estrategia', order: 3 },
      { slug: 'benchmarking',        title: 'Benchmarking',          wave: 'estrategia', order: 4 },
      { slug: 'posicionamento',      title: 'Posicionamento',        wave: 'estrategia', order: 5 },
      { slug: 'golden-circle',       title: 'Golden Circle',         wave: 'estrategia', order: 6 },
      { slug: 'plano-de-midia',      title: 'Plano de Mídia',        wave: 'estrategia', order: 7 },
      { slug: 'buyer-persona',       title: 'Buyer Persona',         wave: 'estrategia', order: 8 },
      { slug: 'nucleo-da-marca',     title: 'Núcleo da Marca',       wave: 'estrategia', order: 9 },
    ],
  },
  {
    id: 'verbal',
    label: 'Identidade Verbal',
    modules: [
      { slug: 'roteiro-da-marca',     title: 'Roteiro da Marca',     wave: 'verbal', order: 10 },
      { slug: 'virtudes-da-marca',    title: 'Virtudes da Marca',    wave: 'verbal', order: 11 },
      { slug: 'arquetipos-da-marca',  title: 'Arquétipos da Marca',  wave: 'verbal', order: 12 },
      { slug: 'brand-persona',        title: 'Brand Persona',        wave: 'verbal', order: 13 },
      { slug: 'tom-e-voz',            title: 'Tom e Voz',            wave: 'verbal', order: 14 },
      { slug: 'naming',               title: 'Naming',               wave: 'verbal', order: 15 },
      { slug: 'vocabulario-da-marca', title: 'Vocabulário da Marca', wave: 'verbal', order: 16 },
      { slug: 'manifesto',            title: 'Manifesto',            wave: 'verbal', order: 17 },
      { slug: 'manual-verbal',        title: 'Manual Verbal',        wave: 'verbal', order: 18 },
    ],
  },
  {
    id: 'visual',
    label: 'Identidade Visual',
    modules: [
      { slug: 'identidade-visual',    title: 'Sistema Visual',       wave: 'visual', order: 19 },
      { slug: 'moodboards',           title: 'Moodboards',           wave: 'visual', order: 20 },
      { slug: 'simbolos-e-logotipo',  title: 'Símbolos e Logotipo',  wave: 'visual', order: 21 },
      { slug: 'paleta-de-cores',      title: 'Paleta de Cores',      wave: 'visual', order: 22 },
      { slug: 'conjunto-tipografico', title: 'Conjunto Tipográfico', wave: 'visual', order: 23 },
      { slug: 'grafismos',            title: 'Grafismos',            wave: 'visual', order: 24 },
      { slug: 'direcao-de-imagem',    title: 'Direção de Imagem',    wave: 'visual', order: 25 },
      { slug: 'manual-visual',        title: 'Manual Visual',        wave: 'visual', order: 26 },
      { slug: 'aplicacoes',           title: 'Aplicações',           wave: 'visual', order: 27 },
      { slug: 'lancamento-da-marca',  title: 'Lançamento da Marca',  wave: 'visual', order: 28 },
    ],
  },
]

// ── Links externos (rodapé nav) ───────────────────────────────────────────────
export const EXTERNAL_ITEMS: NavExternal[] = [
  { title: 'Sociedade Teosófica',  href: 'https://sociedadeteosofica.org.br' },
]

// ── Utilitários ───────────────────────────────────────────────────────────────
export function getAllSlugs(): string[] {
  return NAVIGATION.flatMap(wave => wave.modules.map(m => m.slug))
}

export function getModuleBySlug(slug: string): NavModule | undefined {
  return NAVIGATION.flatMap(w => w.modules).find(m => m.slug === slug)
}

export function getPrevNext(slug: string): { prev: NavModule | null; next: NavModule | null } {
  const all = NAVIGATION.flatMap(w => w.modules).sort((a, b) => a.order - b.order)
  const idx = all.findIndex(m => m.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
