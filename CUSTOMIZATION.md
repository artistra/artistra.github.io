# Customization Guide

This guide explains how to turn this template into your own academic website. It is written for the current project structure in this repository.

## Before You Start

Run the site locally:

```bash
npm run dev
```

Main files you will edit:

- `src/settings.ts`: global site settings, profile info, social links, SEO defaults
- `src/data/cv.ts`: CV entries, skills, publications
- `src/content/BlogPosts/*.md`: blog posts
- `src/pages/*.astro`: page-level content and layout
- `src/components/ui/*.astro`: reusable UI sections
- `src/assets/*`: images and icons
- `astro.config.mjs`: Astro config, especially the site URL

## 1. Set Your Site URL

Update the site URL in both places below.

File: `astro.config.mjs`

```js
export default defineConfig({
  integrations: [react(), tailwind(), sitemap()],
  site: "https://your-domain.com",
});
```

File: `src/settings.ts`

```ts
export const template = {
  website_url: "https://your-domain.com",
  base: "",
}
```

Use these rules:

- If you use a custom domain, set `site` and `website_url` to that full URL.
- If you deploy to GitHub Pages under a repo subpath, keep `site` as your domain and set `base` to `"/repo-name"`.
- If you deploy at the domain root, keep `base` as `""`.

Example for GitHub Pages:

```ts
base: "/artistra.github.io"
```

## 2. Update Your Name, Title, and Homepage Sections

Edit `src/settings.ts`.

The `profile` object controls the homepage hero and other profile text:

```ts
export const profile = {
  fullName: "Your Name",
  title: "Assistant Professor of Computer Science",
  institute: "Example University",
  author_name: "Your Name",
  research_areas: [
    {
      title: "Machine Learning",
      description: "Research on reliable and interpretable ML systems.",
      field: "computer-science",
    },
  ],
}
```

Notes:

- `fullName`, `title`, and `institute` appear on the homepage hero.
- `author_name` is used in the publications page to highlight your name in author lists.
- `research_areas` is shown on the homepage and research page.
- Each `research_areas` entry should include `title`, `description`, and `field`.

## 3. Replace the Profile Image

The homepage currently imports this image:

- `src/assets/profile_pictures.jpg`

It is wired in `src/pages/index.astro`:

```astro
import ProfilePictures from '@/assets/profile_pictures.jpg'
```

To change it:

1. Replace `src/assets/profile_pictures.jpg` with your own file.
2. Keep the same filename for the easiest swap.
3. If you use a different filename, update the import in `src/pages/index.astro`.

Recommended:

- Use a reasonably compressed JPG or WebP.
- Keep the image portrait-oriented for the current layout.

## 4. Add Social Links

Edit the `social` object in `src/settings.ts`.

```ts
export const social = {
  email: "your.email@example.edu",
  linkedin: "https://linkedin.com/in/your-name",
  x: "",
  bluesky: "",
  github: "https://github.com/your-name",
  gitlab: "",
  scholar: "https://scholar.google.com/...",
  inspire: "",
  arxiv: "https://arxiv.org/a/...",
  orcid: "https://orcid.org/....",
}
```

How it works:

- Leave a value as `""` to hide that icon.
- Social icon SVGs live in `src/assets/social-icons/`.
- The icons are rendered by `src/components/ui/SocialIcons.astro`.

## 5. Set SEO Defaults

Edit the `seo` object in `src/settings.ts`.

```ts
export const seo = {
  default_title: "Your Site Title",
  default_description: "Short description of your academic profile and research.",
  default_image: "/images/your-social-image.png",
}
```

This affects:

- default page title
- default meta description
- Open Graph and Twitter image tags

Important:

- Make sure `default_image` points to a real public path.
- If you add a social preview image, place it in `public/images/` and reference it like `"/images/your-social-image.png"`.

## 6. Customize Themes and General Appearance

Edit the `template` object in `src/settings.ts`.

```ts
export const template = {
  menu_left: false,
  transitions: true,
  lightTheme: "light",
  darkTheme: "dark",
  excerptLength: 200,
  postPerPage: 5,
  base: "",
}
```

Key options:

- `menu_left`: switches the layout direction for the drawer/sidebar pattern
- `transitions`: enables Astro view transitions
- `lightTheme` and `darkTheme`: choose DaisyUI theme names
- `excerptLength`: controls blog excerpt trimming
- `postPerPage`: controls blog pagination

Theme-related UI files:

- `src/components/ui/DarkLightController.astro`
- `src/components/ui/ThemeSelector.astro`
- `tailwind.config.mjs`

If you want broader visual changes, also inspect:

- `src/layouts/Layout.astro`
- `src/components/ui/Hero.astro`
- `src/components/ui/Navbar.astro`
- `src/components/ui/Footer.astro`

## 7. Edit the Homepage

The homepage lives in `src/pages/index.astro`.

It currently has three major sections:

- hero
- research areas
- recent publications

Those sections are powered by:

- `src/components/ui/Hero.astro`
- `src/components/ui/Grid.astro`
- `src/components/ui/ArticleList.astro`

If you want to:

- change the homepage structure: edit `src/pages/index.astro`
- change the look of a section: edit the corresponding component
- remove a section: delete that section block from `src/pages/index.astro`

## 8. Edit the CV Page

The CV page is powered by `src/data/cv.ts` and rendered in `src/pages/cv.astro`.

Sections available in `src/data/cv.ts`:

- `experiences`
- `education`
- `skills`
- `publications`

Each section is rendered only if it contains at least one item. That means empty arrays or placeholder objects can affect what appears.

Recommended workflow:

1. Replace the starter placeholder objects with your own entries.
2. Remove unused placeholder entries instead of leaving empty strings.
3. Keep the `time` format consistent.

Example experience entry:

```ts
{
  company: "Example Lab",
  time: "2022 - Present",
  title: "Postdoctoral Researcher",
  location: "Boston, MA",
  description: "Research on multimodal learning and scientific discovery tools.",
}
```

Example education entry:

```ts
{
  school: "Example University",
  time: "2017 - 2022",
  degree: "PhD in Computer Science",
  location: "Cambridge, MA",
  description: "Advised by ...",
}
```

Example publication entry:

```ts
{
  title: "Paper Title",
  authors: "First Author, Your Name, Third Author",
  journal: "NeurIPS",
  time: "2024",
  link: "https://arxiv.org/abs/1234.5678",
  abstract: "Short summary of the paper.",
}
```

Sorting note:

- `src/pages/cv.astro` sorts entries by the second half of the `time` string.
- Use formats like `"2021 - 2024"` or `"2024 - Present"` to keep ordering sensible.

## 9. Edit the Publications Page

The publications page is `src/pages/papers.astro`.

It reads from:

- `src/data/cv.ts` → `publications`

Important behavior:

- author highlighting depends on `profile.author_name` in `src/settings.ts`
- publication links come from each `publication.link`

If you want to:

- change publication content: edit `src/data/cv.ts`
- change card design: edit `src/pages/papers.astro`
- change author-highlighting logic: edit `src/lib/utils.ts`

## 10. Edit the Research Page

The research page is `src/pages/research.astro`.

It currently mixes two sources:

- dynamic research areas from `profile.research_areas` in `src/settings.ts`
- hardcoded prose and project entries directly inside `src/pages/research.astro`

To customize it:

1. Update `profile.research_areas` in `src/settings.ts`.
2. Replace the research statement paragraphs in `src/pages/research.astro`.
3. Replace the hardcoded `Current Projects` list in `src/pages/research.astro`.

Icons for research fields come from:

- `src/data/researchIcons.ts`

Each research area has a `field` value, and that value maps to an icon key in `RESEARCH_ICONS`.

If you add a new field:

1. Add the new field key in your `research_areas` entry.
2. Add the matching icon definition in `src/data/researchIcons.ts`.

## 11. Add and Edit Blog Posts

Blog posts live in:

- `src/content/BlogPosts/`

The collection schema is defined in:

- `src/content.config.ts`

Each post must include frontmatter like this:

```md
---
title: "Post Title"
date: "2026-05-16"
tags: ["research", "ml"]
excerpt: "A short summary for list pages and RSS."
---
```

Then write the body in Markdown below the frontmatter.

Current blog pages:

- `src/pages/blog/[slug].astro`: single post page
- `src/pages/blog/[page].astro`: paginated blog index
- `src/pages/rss.xml.js`: RSS feed generation

Common mistakes:

- missing `title`
- missing `date`
- missing `excerpt`
- invalid YAML frontmatter formatting

If one of those fields is missing, Astro will throw a content schema error.

## 12. Change Navigation and Layout

Main layout file:

- `src/layouts/Layout.astro`

Navigation component:

- `src/components/ui/Navbar.astro`

Footer component:

- `src/components/ui/Footer.astro`

The layout controls:

- overall page shell
- drawer/sidebar behavior
- dark/light toggle placement
- the shared header and footer

Edit these files if you want to change the global site structure rather than a single page.

## 13. Update Metadata and Head Tags

Metadata rendering is handled by:

- `src/components/Head.astro`

This component manages:

- canonical URL
- meta title and description
- Open Graph tags
- Twitter tags
- sitemap link

If you change domain setup, social image paths, or SEO defaults, test this file carefully because invalid URLs can break page rendering.

## 14. Add Static Files

Use these locations:

- `src/assets/` for imported build-time assets
- `public/` for static files served directly

Use `public/` for:

- `favicon`s
- social preview images
- PDFs
- files you want available at fixed URLs

Use `src/assets/` for:

- images imported into Astro components
- optimized images bundled by Astro/Vite

## 15. Files Most Likely to Need Editing

If you are customizing the site for yourself, you will probably touch these first:

1. `src/settings.ts`
2. `src/data/cv.ts`
3. `src/pages/index.astro`
4. `src/pages/research.astro`
5. `src/pages/papers.astro`
6. `src/content/BlogPosts/post1.md`
7. `src/assets/profile_pictures.jpg`
8. `astro.config.mjs`

## 16. Recommended Customization Order

Use this order to avoid breaking multiple things at once:

1. Set `site`, `website_url`, and `base`.
2. Fill in `profile`, `social`, and `seo` in `src/settings.ts`.
3. Replace the profile image.
4. Populate `src/data/cv.ts`.
5. Rewrite homepage, research, and papers content.
6. Add blog posts.
7. Adjust theme and layout.
8. Preview locally and click through every page.

## 17. Final Check Before Deploying

Before deployment, verify:

- homepage loads correctly
- social links work
- CV sections are ordered correctly
- publication links open correctly
- research icons match your fields
- blog posts render without schema errors
- sitemap and RSS still build
- your site URL and base path are correct

Run:

```bash
npm run dev
npm run build
```

If `npm run build` fails, the most common causes are:

- broken content frontmatter
- invalid URLs in settings or metadata
- bad asset paths
- incorrect `base` for GitHub Pages
