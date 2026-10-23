# Henry Hesbon: Engineering Portfolio

SvelteKit + Tailwind portfolio. All content lives in `content/*.toml`.

- `npm i` then `npm run dev` to preview locally
- Put images in `static/` (slides in `static/slides/`, CV as `static/cv.pdf`)
- Add skills in `content/skills.toml`; the Skills page builds its filters from the section names.
- Add projects in `content/projects.toml`. Optional `category` and `cover` fields power the Projects filters and image cards; put cover images under `static/` and use paths relative to that folder.
- Add design pieces in `content/design.toml`; give each item a `category` and add one or more `[[item.images]]` entries with `src`, `alt`, and `caption`. Optimized gallery previews live in `static/Graphics/`.
- Keep each uploaded file below GitHub's 100 MB file limit. Large GLBs should be optimized with glTF Transform's `optimize --compress meshopt --simplify false` command. Meshopt encoding preserves the detailed geometry; the model viewer includes the matching decoder.
- Put downloadable project documents in `static/documents/` and embed them from the relevant page. The archive currently features the flange-coupling calculation PDF.
- Push to `main` to deploy to GitHub Pages (see `.github/workflows/deploy.yml`)
