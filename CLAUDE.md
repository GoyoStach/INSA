# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro documentation website built with the Starlight template. It features :
- Internationalization (i18n) support for French and English
- Responsive design optimized for documentation

## Commands

- `npm run dev` - Start development server on http://localhost:4321
- `npm run build` - Build the site for production
- `npm run preview` - Preview the production build locally
- `npm start` - Alias for `npm run dev`

## Architecture

- **src/content/docs/fr/** - French documentation files
- **src/content/docs/en/** - English documentation files
- **src/content/config.ts** - Content collection configuration
- **src/components/ui/** - shadcn/ui components (Button, Card, etc.)
- **src/lib/utils.ts** - Utility functions for className merging
- **src/styles/globals.css** - Global CSS with shadcn/ui color variables
- **astro.config.mjs** - Main Astro configuration with Starlight, Tailwind, and i18n
- **tailwind.config.mjs** - Tailwind configuration with shadcn/ui theme
- **public/** - Static assets (favicon, images, etc.)

## Content Structure

Documentation is organized by language in the `src/content/docs/` directory:
- **fr/** - French content (default locale)
  - **guides/** - Tutorial and guide content in French
  - **reference/** - API reference and technical documentation in French
  - **index.mdx** - French homepage content
- **en/** - English content
  - **guides/** - Tutorial and guide content in English
  - **reference/** - API reference and technical documentation in English
  - **index.mdx** - English homepage content

## Internationalization

- **Default locale**: French (fr)
- **Supported locales**: French (fr) and English (en)
- **URL structure**: `/fr/path` for French, `/en/path` for English
- **Sidebar**: Language-specific navigation configured in `astro.config.mjs`

## Styling System

- **Colors**: Uses shadcn/ui default color palette with CSS custom properties
- **Components**: Located in `src/components/ui/` following shadcn/ui patterns
- **Themes**: Automatic dark/light mode switching supported
- **Utilities**: `cn()` function in `src/lib/utils.ts` for className merging