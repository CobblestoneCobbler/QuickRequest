# ProjectRecord

A personal project portfolio and progress journal built with React and Vite.

## Overview

ProjectRecord displays a timeline of development entries across multiple projects. Each project has its own accent color, and entries are shown in a alternating left/right layout with screenshots.

## Features

- Project selector bar with per-project accent theming
- Chronological timeline with alternating layout
- Dark and light theme support
- Static JSON-based data store (no backend)

## Tech Stack

- React 19
- Vite 7
- CSS Custom Properties for theming

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Data Structure

Project data is stored as static JSON files in the `projects/` directory:

- `masterRecord.JSON` — index of all projects with names, paths, thumbnails, and accent colors
- `projects/<Name>/<name>.json` — individual project entry logs

See `example.json` for the schema format.
