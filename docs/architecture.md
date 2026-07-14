# Architecture

## Overview

ProjectRecord is a single-page React app that fetches static JSON data at runtime and renders a filterable project timeline.

## File Structure

```
src/
  main.jsx                    — React entry point
  App.jsx                     — Root component, state management, data fetching
  App.css                     — All application styles including responsive design
  index.css                   — Global reset styles
  components/
    NavBar.jsx                — Sticky navigation bar
    Display.jsx               — Flattens, sorts, and renders entries
    Entry.jsx                 — Single timeline entry with per-project theming

projects/
  masterRecord.JSON           — Project index with metadata and accent colors
  <Project>/
    <project>.json            — Entry log for each project
  imgFiles/                   — Screenshot images referenced by entries
```

## Components

### App
Root component. Manages state for active project filter (by project ID), sort order, theme, and fetched data. Orchestrates two-phase loading: master record first, then individual project records in parallel via `Promise.all`.

### NavBar
Sticky navigation bar with Home link, theme toggle, and mailto contact link. Receives `theme` and `onToggleTheme` props.

### Display
Receives filtered record data, flattens all entries with project metadata, sorts by date, and renders Entry components.

### Entry
Renders a single timeline entry with image, title, and description. Sets CSS custom properties (`--accent-rgb`, `--accent-color`) per entry for project-specific theming via inline style for dynamic values.

## Data Flow

1. `App` fetches `masterRecord.JSON` on mount
2. Master record triggers parallel fetch of each project's JSON
3. Project metadata (id, name, accent_rgb) is attached to each record
4. Entries are filtered by active project ID, sorted by date, and rendered

## Theming

CSS custom properties on `:root` define the default dark theme. A `[data-theme="light"]` selector provides light theme values. The theme is toggled via a button in the NavBar, which sets `data-theme` on the document root. Per-project accent colors are injected as CSS variables on each entry element.
