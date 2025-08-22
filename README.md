# INSA : Mise à Niveau Système & Réseau

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

A comprehensive bilingual documentation website for system and network fundamentals, built with Astro and Starlight. This educational resource covers essential topics in computer systems, networking, and Unix/Linux administration.

## 📚 Content Overview

This documentation covers three main courses:

### Course 1: System Fundamentals
- **System and Black Box** - Introduction to computer systems
- **PC Components** - Detailed coverage of:
  - Motherboard architecture
  - CPU (Processor) functionality
  - RAM (Memory) types and specifications
  - Storage systems (HDD/SSD)
  - BIOS configuration

### Course 2: System Operations
- **PC Boot Process** - Understanding system startup
- **Binary Systems** - Complete binary number systems course
- **Linux Filesystem** - File system structure and organization
- **Registry vs Linux Configuration** - Comparison between Windows and Linux
- **Environment Variables** - Configuration and usage

### Course 3: User and Access Management
- **Users & Groups** - Unix/Linux user management and chmod permissions
- **Library Exercise** - Hands-on ACL permissions with real-world scenarios

## 🌐 Internationalization

The site supports both French and English:
- **French** (default) - Complete course content
- **English** - Full translations of all materials
- Automatic language switching based on user preference

## 🎨 Features

- Built with **Astro** and **Starlight** for optimal performance
- **shadcn/ui** component library for consistent styling
- Dark/light theme support
- Responsive design for all devices
- Comprehensive search functionality

## 🚀 Project Structure

```
.
├── public/
├── src/
│   ├── content/docs/
│   │   ├── fr/           # French content
│   │   │   ├── index.mdx
│   │   │   └── mnsr/     # Main course content
│   │   │       ├── cours-1/
│   │   │       ├── cours-2/
│   │   │       └── cours-3/
│   │   └── en/           # English translations
│   │       ├── index.mdx
│   │       └── mnsr/     # Translated course content
│   ├── styles/
│   │   └── globals.css   # shadcn/ui styling
│   └── lib/
│       └── utils.ts      # Utility functions
├── astro.config.mjs      # Astro and Starlight configuration
└── tailwind.config.mjs   # Tailwind CSS configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd transcript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Technologies Used

- **[Astro](https://astro.build)** - Static site generator
- **[Starlight](https://starlight.astro.build)** - Documentation framework
- **[shadcn/ui](https://ui.shadcn.com)** - Component library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

## 📖 Documentation Structure

The content is organized in a hierarchical structure with explicit sidebar configuration for precise navigation control. Each course module contains comprehensive materials including:

- Theoretical explanations
- Practical examples
- Hands-on exercises
- Real-world scenarios
- Configuration examples

## 🤝 Contributing

This is an educational resource for INSA students. Content updates and improvements are welcome to enhance the learning experience.

## 📚 Learn More

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
- [shadcn/ui Components](https://ui.shadcn.com)
