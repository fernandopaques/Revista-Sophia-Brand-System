import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // GitHub Flavored Markdown: tabelas, strikethrough, task lists
      remarkGfm,
    ],
    rehypePlugins: [
      // Adiciona id automático aos headings (para links âncora)
      rehypeSlug,
      // Adiciona link de âncora nos headings (requer rehype-slug antes)
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor-heading"],
            ariaHidden: true,
            tabIndex: -1,
          },
        },
      ],
      // Syntax highlighting para blocos de código
      [rehypeHighlight, { detect: true }],
    ],
  },
});

const nextConfig: NextConfig = {
  // Habilita .mdx como extensão de página — inclui md para compatibilidade
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Remove o indicador "N" do Next.js em desenvolvimento
  devIndicators: false,

  experimental: {
    // Usar o compilador JS por enquanto — mais estável com a cadeia de plugins remark/rehype
    mdxRs: false,
  },
};

export default withMDX(nextConfig);
