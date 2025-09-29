# CHANGELOG (A11y/Perf/PWA hardening)

## P0
- Acessibilidade: foco visível 3px e skip-link; landmarks semânticos (`header`, `nav`, `main`, `aside`), hierarquia H1→H2→H3.  
- Sidebar e dialog acessíveis: `Esc` fecha; hambúrguer é `<button>` com `aria-controls`/`aria-expanded`; foco devolvido ao fechar modal.  
- Modal refeito com `<dialog>` + `showModal()`; congelamento do restante com `inert` e fallback (`aria-hidden`/pointer-events).  
- Busca acessível: `<search>` + `<form role="search">`, `<label>` visível via `.sr-only`, status de resultados em `aria-live`.  
- `aria-live` para XP/nível; anúncios de XP/nível.  
- Alvos mínimos de toque (≥24px) para botões principais.  
- Favoritos com `localStorage` (+ `safeGet`/`safeSet`) e botão por card (idempotente).  
- Segurança: `meta` CSP mínima, `rel="noopener noreferrer"` nos links externos.

## P1
- Performance/INP: delegação de eventos, microtask na busca, `will-change` na barra, `content-visibility:auto` com `contain-intrinsic-size`.  
- Dark mode consistente; `color-scheme: light dark`; tokens OKLCH via `@supports` (fallback HSL).  
- `accent-color` opcional com `@supports`.  
- `prefers-reduced-motion` respeitado.

## P2
- PWA: `manifest.json` e `sw.js` com precache do shell e stale-while-revalidate.  
- SEO/OG/Twitter metas; `theme-color` por esquema.  
- Idempotência: criação de fav buttons e estados guardam checks para não duplicar; chaves de storage preservadas/versão própria para favoritos.
