# Website Repository Documentation

This repository contains the source and build system for cherian.net, a static website built with Emacs Org Mode and deployed via GitHub Pages.

## Repository Structure

```
/Users/deepak/repos/website/
├── org/                          # Source Org-mode files (sources branch)
│   ├── index.org                # Main homepage source
│   ├── dc-website.el            # Org publishing configuration
│   ├── posts/                   # Blog posts (.org files)
│   ├── research/                # Research project descriptions
│   ├── static/                  # Static assets (images, PDFs, videos)
│   ├── website-head.html        # Custom HTML head (meta tags)
│   ├── website-footer.html      # Custom footer (analytics + CC license)
│   └── website-icons.html       # SVG icon definitions
├── css/                         # CSS stylesheets
├── publish/                     # Built HTML (master branch worktree)
├── apps/                        # Web applications
│   └── typ/                     # Vue.js typing game
└── deploy.bash                  # Deployment script
```

## Git Worktree Architecture

This repository uses **git worktrees** to maintain two separate branches:

1. **sources branch** (main working directory)
   - Path: `/Users/deepak/repos/website/`
   - Contains: All source files (.org files, CSS, configuration)
   - Use for: Editing content and source files

2. **master branch** (publish/ subdirectory)
   - Path: `/Users/deepak/repos/website/publish/`
   - Contains: Compiled HTML and generated content
   - Published to: GitHub Pages at cherian.net

## Build System: Emacs Org Mode

The website uses Emacs Org Mode for content generation via `org/dc-website.el`.

### Publishing Projects

1. **pages** - Main pages (index.org → publish/index.html)
2. **research** - Research project pages with auto-generated sitemap
3. **posts** - Blog posts with auto-generated sitemap
4. **blog-static** - Static assets (images, PDFs, videos, fonts)
5. **rss** - RSS feed generation

### Build Command

In Emacs:
```
M-x org-publish-project RET website
```

Or via command line:
```bash
emacs --batch -l org/dc-website.el -f org-publish-project-list -f org-publish -c website
```

## Deployment Workflow

### 1. Edit Content
- Make changes in `org/` directory (sources branch)
- Edit `.org` files with Emacs
- Add new assets to `org/static/`

### 2. Build
- Run `M-x org-publish-project` in Emacs
- Org-mode exports all files to `publish/` directory
- Verify output in browser

### 3. Deploy
```bash
./deploy.bash
```

This script:
- Changes to `publish/` directory (master branch)
- Stages all changes
- Commits with "auto-commit" message
- Force pushes to origin
- GitHub Pages automatically deploys to cherian.net

## The apps/ Directory

Contains standalone web applications.

### Creating a New App

When adding a new app to the `apps/` directory:

1. **Create the app** in `apps/<app-name>/`
2. **Configure base path** in the build config (e.g., Vite: `base: '/<app-name>/'`)
3. **Update deploy.bash** to build and copy the app:
   ```bash
   # Build app
   cd apps/<app-name>/
   npm run build
   cd ../..

   # Copy to publish
   mkdir -p publish/<app-name>
   cp -r apps/<app-name>/dist/* publish/<app-name>/
   ```
4. **Add to git in publish directory**:
   ```bash
   cd publish/
   git add <app-name>/
   git commit -m "Add <app-name> app"
   git push origin master
   ```
5. **App will be accessible** at `cherian.net/<app-name>/`

### apps/typ/ - Typing Game

A Vue.js typing game application for teaching typing to children.

**Technology Stack:**
- Framework: Vue 3
- Build Tool: Vite
- Base path: `/typ/`

**Build Commands:**
```bash
cd apps/typ/
npm run build          # Generates /dist/ with optimized output
npm run dev            # Development mode with hot reload
npm run preview        # Preview built output
```

**Integration:**
- Built output copied to `publish/typ/` during deployment
- Accessible at `cherian.net/typ/`
- Independent Vue.js SPA served as static files

## Key Configuration Files

- **org/dc-website.el** - Org Mode publishing configuration
- **apps/typ/vite.config.js** - Vue/Vite build configuration with base path
- **apps/typ/package.json** - Vue dependencies
- **deploy.bash** - Deployment automation script (builds apps and deploys)

## Hosting

- Platform: GitHub Pages
- Repository: dcherian/dcherian.github.io
- Domain: cherian.net (via CNAME)
- Served from: master branch

## Content Organization

- **Posts**: Blog-style articles with dates (org/posts/)
- **Research**: Academic project descriptions (org/research/)
- **Static**: Media and downloadable assets (org/static/)

## Analytics & Licensing

- Analytics: GoatCounter (privacy-focused, no cookies)
- License: Creative Commons Attribution 4.0 International

## Important Notes

- `deploy.bash` uses force push (`git push -f`)
- Research and posts auto-generate sitemap.html files
- All pages include custom head, footer, and icon templates
- RSS feed generated from org/posts/rss.org
