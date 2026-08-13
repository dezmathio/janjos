# Josiah Lab

Personal site for [janjos.lol](https://janjos.lol). Astro, TypeScript, Tailwind, markdown. Static files. No CMS, no API, no database.

## Add a project

1. Copy an existing file in `src/content/projects/` to `src/content/projects/your-slug.md`.
2. Fill in the frontmatter. `status` is `idea`, `prototype`, `active`, `live`, `archived`, or `research`. `kind` is `experiment`, `tool`, `product`, or `research`. Set `featured: true` for the main grid. Set `scratch: true` for one-offs that belong under Scratch. Archived entries land in Footnotes.
3. Write whatever body sections you have. Skip the rest. Useful headings: The idea, Why I built it, How it works, Interesting engineering problems, What I learned, Current state.
4. Drop screenshots in `public/projects/your-slug/` and reference them from the markdown as `/projects/your-slug/shot.png`.
5. Push to `master`. GitHub Actions builds and deploys.

Activity is manual. Edit `src/content/activity/log.json` and add an object with a unique `id`.

## Add a decision

1. Create `src/content/decisions/your-slug.md`.
2. Frontmatter: `title`, `summary`, `date`, and optional `project` (the project file slug, like `chewsr`).
3. Write why the constraint forced the shape. Skip the changelog.
4. It shows up at `/decisions`, and on that project's page if `project` is set.

## Local

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`. In the repo, set Pages source to GitHub Actions.

`public/CNAME` points at `janjos.lol`. `astro.config.mjs` uses `site: 'https://janjos.lol'` and `base: '/'`. If you serve this as `https://<user>.github.io/janjos/` without the custom domain, set `base: '/janjos/'`.

## Layout

Astro 7 loads collections from `src/content.config.ts`. Project markdown lives in `src/content/projects/`. The homepage is the lab. There is no `/lab` route.
