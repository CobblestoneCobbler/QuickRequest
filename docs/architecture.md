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
    CategorySidebar.jsx       — Category filter, admin login/logout
    NavBar.jsx                — Sticky navigation bar
    Display.jsx               — Flattens, sorts, and renders entries
    Entry.jsx                 — Single timeline entry with per-project theming
    EntryForm.jsx             — Create/edit entry form (admin only)

projects/
  masterRecord.JSON           — Project index with metadata and accent colors
  <Project>/
    <project>.json            — Entry log for each project
  imgFiles/                   — Screenshot images referenced by entries
```

## Components

### App
Root component. Manages state for active project filter (by project ID), sort order, theme, admin auth, and fetched data. Orchestrates two-phase loading: master record first, then individual project records in parallel via `Promise.all`.

### CategorySidebar
Category filter sidebar. Also handles admin login via a hardcoded passcode. On successful login, generates a random UUID auth key and calls `onToggleAdmin(key)`. The key is persisted in `localStorage` for session persistence across page refreshes.

### NavBar
Sticky navigation bar with Home link, theme toggle, and mailto contact link. Receives `theme` and `onToggleTheme` props.

### Display
Receives filtered record data, flattens all entries with project metadata, sorts by date, and renders Entry components.

### Entry
Renders a single timeline entry with image, title, and description. Sets CSS custom properties (`--accent-rgb`, `--accent-color`) per entry for project-specific theming via inline style for dynamic values.

### EntryForm
Form for creating or editing timeline entries. Only rendered when `isAdmin` is true.

## Data Flow

1. `App` fetches `masterRecord.JSON` on mount
2. Master record triggers parallel fetch of each project's JSON
3. Project metadata (id, name, accent_rgb) is attached to each record
4. Entries are filtered by active project ID, sorted by date, and rendered

## Authentication

Admin authentication uses a hardcoded passcode (`'admin'` in `CategorySidebar.jsx`). On successful entry, a random UUID auth key (`crypto.randomUUID()`) is generated and:
- Passed to `App` via `onToggleAdmin(key)`
- Stored in `localStorage` under the key `authKey`
- On app mount, `App` checks `localStorage` for an existing `authKey` — if found, admin state is automatically restored
- On logout, the key is removed from `localStorage`
- The `authKey` is available to `handleSaveEntry` for use in an `Authorization: Bearer <key>` header when the save API is implemented

> **Note:** This is a client-side-only simulation of token-based auth. A real implementation would validate credentials against a backend and return a signed token.

## Theming

CSS custom properties on `:root` define the default dark theme. A `[data-theme="light"]` selector provides light theme values. The theme is toggled via a button in the NavBar, which sets `data-theme` on the document root. Per-project accent colors are injected as CSS variables on each entry element.
