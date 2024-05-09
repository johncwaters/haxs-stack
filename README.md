# HAXS Stack: Integrating HTMX, Astro, Supabase, and Expandable Technologies

> [!CAUTION]  
> This boilerplate is still in development. Expect possible breaking changes.

Welcome to the HAXS Stack, a dynamic and efficient mono-repo boilerplate integrating HTMX, Astro, Supabase, and a suite of expandable technologies tailored for full-stack development.

## Stack Overview

- **HTMX**: Enhances your HTML with AJAX and partial updates, providing a reactive experience without JavaScript frameworks.
- **Astro**: A modern static site generator using Typescript, allowing for performant websites with a component-based approach.
- **Supabase**: Provides a ready-to-go backend with Database, API, Storage, and Authentication solutions, all managed from a single platform.
- **Expandable**: Easily integrate additional technologies such as Tailwind CSS, Stripe, Vercel, etc., to extend your project's capabilities.

With the HAXS Stack, developers gain the ability to create responsive, data-driven applications with minimal overhead and maximum performance. This stack leverages the strengths of each technology to offer a unified and powerful development experience.

## 🚀 Project Structure

Your HAXS Stack project will have the following structure:

```plaintext
/
├── public/
├── src/
│   ├── components/
│   │   ├── app/
│   │   ├── ui/
│   │   └── InteractiveComponent.tsx
│   ├── layouts/
│   │   ├── MainPage.astro
│   │   └── SectionPage.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   └── index.astro
│   ├── services/
│   │   └── api/
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── global.d.ts
├── .env
└── package.json
```

- `src/pages/`: Contains Astro or Markdown files, each representing a route.
- `src/components/`: Ideal for Astro/React components.
- `public/`: Hosts static assets like images.

## 🧞 Commands

Execute these commands from the project's root in your terminal:

| Command                   | Action                                      |
| ------------------------- | ------------------------------------------- |
| `npm install`             | Install dependencies                        |
| `npm run dev`             | Start local dev server at `localhost:4321`  |
| `npm run build`           | Build site for production in `./dist/`      |
| `npm run preview`         | Preview the build locally before deployment |
| `npm run astro ...`       | Execute Astro CLI commands                  |
| `npm run astro -- --help` | Get help with the Astro CLI                 |

## Extending Your Stack

The HAXS Stack is designed for flexibility. Integrate with Tailwind CSS, Supabase, Stripe, Vercel, and more as needed. Update your `.env` and `package.json` to include and configure these additional technologies.

### Adding New Technologies

1. Install additional packages (e.g., `npm install tailwindcss`).
2. Update your project configuration to integrate new technologies.
3. Ensure all new dependencies are well documented and included in the project setup instructions.

## Get Started

Clone this repository and run `npm install` to set up your environment. Follow the structured commands to develop, build, and preview your project.
