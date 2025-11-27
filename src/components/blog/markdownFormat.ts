// src/components/blog/markdownFormat.ts
// Helper para dar formato (clases) consistentes a HTML proveniente de Markdown
// Uso típico en Astro:
//   import { formatMarkdownHtml, defaultBlogMarkdownClasses } from "../../components/blog/markdownFormat";
//   const html = formatMarkdownHtml(blogPost.content);
//   <Fragment set:html={html} />

export type MarkdownTag =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p" | "a" | "strong" | "em" | "blockquote" | "hr"
  | "ul" | "ol" | "li"
  | "img" | "figure" | "figcaption"
  | "pre" | "code"
  | "table" | "thead" | "tbody" | "tr" | "th" | "td";

export type MarkdownClassMap = Partial<Record<MarkdownTag, string>> & {
  // Clases aplicadas al contenedor raíz (útil si quieres envolver el HTML con un div)
  root?: string;
};

// Mapa de clases por defecto para páginas de Blog (Tailwind-friendly)
export const defaultBlogMarkdownClasses: MarkdownClassMap = {
  root: "prose prose-invert max-w-none", // si el fondo es oscuro
  h1: "font-title italic text-4xl md:text-5xl font-bold mb-6",
  h2: "font-title italic text-3xl md:text-4xl font-bold mt-10 mb-4",
  h3: "font-title italic text-2xl md:text-3xl font-semibold mt-8 mb-3",
  h4: "text-xl md:text-2xl font-semibold mt-6 mb-2",
  h5: "text-lg md:text-xl font-semibold mt-4 mb-2",
  h6: "text-base md:text-lg font-semibold mt-4 mb-2",
  p: "text-base md:text-lg leading-relaxed mb-4",
  a: "text-orange underline underline-offset-4 hover:text-orange-300 transition-colors",
  strong: "font-bold",
  em: "italic",
  blockquote: "border-l-4 border-white/40 pl-4 italic my-6 text-white/90",
  hr: "my-8 border-white/30",
  ul: "list-disc pl-6 my-4 space-y-2",
  ol: "list-decimal pl-6 my-4 space-y-2",
  li: "leading-relaxed",
  img: "rounded-xl shadow-md my-6 mx-auto",
  figure: "my-6 text-center",
  figcaption: "text-sm opacity-80 mt-2",
  pre: "bg-black/40 text-white p-4 rounded-lg overflow-x-auto my-6",
  code: "font-mono text-sm",
  table: "w-full border-collapse my-6",
  thead: "bg-white/10",
  tbody: "",
  tr: "border-b border-white/10",
  th: "text-left font-semibold px-3 py-2",
  td: "align-top px-3 py-2",
};

/**
 * Inyecta clases CSS a etiquetas HTML comunes generadas por Markdown.
 * Nota: Este método usa reemplazos por regex seguros para HTML simple de Markdown.
 */
export function formatMarkdownHtml(html: string, classes: MarkdownClassMap = defaultBlogMarkdownClasses): string {
  if (!html) return html;
  let out = html;

  // Helper para insertar/mergear class en una etiqueta
  const addClasses = (tag: MarkdownTag, className: string) => {
    if (!className) return;
    const openTag = new RegExp(`<${tag}(\\s[^>]*)?>`, "gi");
    out = out.replace(openTag, (match) => {
      // Ya tiene class="..."
      const hasClass = /\sclass\s*=\s*"[^"]*"/i.test(match) || /\sclass\s*=\s*'[^']*'/i.test(match);
      if (hasClass) {
        return match.replace(/class\s*=\s*(["'])([^"']*)(["'])/i, (_m, q1, existing, q2) => {
          // Evitar duplicar clases existentes
          const merged = mergeClassNames(existing, className);
          return `class=${q1}${merged}${q2}`;
        });
      }
      // Insertar class antes del cierre del tag
      return match.replace(/>$/, ` class="${className}">`);
    });
  };

  // Orden recomendado para cabeceras primero
  const tags: MarkdownTag[] = [
    "h1","h2","h3","h4","h5","h6",
    "p","a","strong","em","blockquote","hr",
    "ul","ol","li",
    "img","figure","figcaption",
    "pre","code",
    "table","thead","tbody","tr","th","td"
  ];

  for (const t of tags) {
    const cls = classes[t];
    if (cls) addClasses(t, cls);
  }

  // Tratamiento especial: code dentro de pre
  // Si hay <pre><code>...</code></pre> sin clases en <code>, garantiza monospace + sin envolver
  out = out.replace(/<pre(\s[^>]*)?>\s*<code(\s[^>]*)?>/gi, (m) => {
    const codeClass = classes.code ? classes.code : "font-mono text-sm";
    if (/class\s*=/.test(m)) return m; // ya tiene class en <code>
    return m.replace(/<code(\s[^>]*)?>/i, `<code class="${codeClass}">`);
  });

  return out;
}

/**
 * Envuelve el HTML con un contenedor que recibe clases de root, si se desea.
 */
export function wrapMarkdownHtml(html: string, classes: MarkdownClassMap = defaultBlogMarkdownClasses): string {
  const inner = formatMarkdownHtml(html, classes);
  const root = classes.root?.trim();
  if (!root) return inner;
  return `<div class="${root}">${inner}</div>`;
}

function mergeClassNames(existing: string, extra: string): string {
  const set = new Set(existing.split(/\s+/).filter(Boolean));
  for (const cls of extra.split(/\s+/)) {
    if (cls) set.add(cls);
  }
  return Array.from(set).join(" ");
}
