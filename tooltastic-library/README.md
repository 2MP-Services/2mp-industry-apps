# Tooltastic Library

## Project Overview

Tooltastic Library is a modern, extensible, and user-friendly web application that serves as a comprehensive directory of AI tools. Its primary goal is to help individuals and teams discover, filter, and explore the best AI-powered solutions across a wide range of domains, from productivity and content creation to engineering and software development.

The project is built using React, TypeScript, Vite, Tailwind CSS, and shadcn-ui, ensuring a fast, maintainable, and visually appealing experience.

---

## Features

- **AI Tools Directory**: Browse a curated collection of AI tools, each with rich metadata (description, category, tags, website, pricing, etc.).
- **Advanced Filtering**: Filter tools by category, team, or search term.
- **Team-based Recommendations**: Quickly view tools relevant to specific teams (marketing, development, mechanics, etc.).
- **Responsive UI**: Fully responsive and accessible design using Tailwind CSS and shadcn-ui components.
- **Extensible Data Model**: Easily add new tools, categories, or teams by updating the data source.
- **Modern Stack**: Built with React, TypeScript, Vite, and advanced UI libraries for best-in-class developer experience.

---

## Architecture & Code Structure

- **src/data/aiTools.ts**: Contains the core data model for AI tools, including type definitions, tool entries, categories, and mappings for teams and images.
- **src/pages/Index.tsx**: Main landing page. Implements search, category, and team filtering logic, and renders the tool grid.
- **src/components/**: Modular UI components for header, filters, tool cards, team selector, and more.
- **src/hooks/**: Custom React hooks for mobile detection and toast notifications.
- **src/lib/**: Utility functions.
- **src/App.tsx**: Application root, sets up routing, providers, and global UI.
- **src/main.tsx**: Entry point for React rendering.

### Data Model
- **AITool**: Each tool is defined by an interface with fields like `id`, `name`, `description`, `category`, `tags`, `websiteUrl`, `thumbnailUrl`, and optional pricing info.
- **Category**: Tools are organized into rich, domain-specific categories (e.g., NLP, Computer Vision, Productivity, Software Development, etc.).
- **Team-to-Categories Mapping**: Teams (marketing, mechanics, electronics, development, etc.) are mapped to relevant categories for quick access.

---

## Usage

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Setup
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd tooltastic-library

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Extending the Directory

To add or modify AI tools, categories, or teams:
- Edit `src/data/aiTools.ts`:
  - Add new entries to the `aiTools` array.
  - Update `categories` for new categories.
  - Modify `teamToCategoriesMap` to adjust team/category relationships.
  - Add images to `categoryToImageMap` as needed.
- UI components automatically reflect changes in the data source.

---

## Project Structure

```
├── src/
│   ├── components/           # UI components (Header, ToolCard, etc.)
│   ├── data/                 # Main data source (aiTools.ts)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Main pages (Index, NotFound)
│   ├── App.tsx               # App root
│   └── main.tsx              # Entry point
├── public/                   # Static assets
├── package.json              # Project metadata and dependencies
├── tailwind.config.ts        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or fix.
2. Make your changes, ensuring code quality and consistency.
3. Update documentation and add tests if relevant.
4. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions, suggestions, or contributions, please open an issue or contact the maintainer at [your-email@example.com].

---

## Acknowledgements

- Built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn-ui](https://ui.shadcn.com/).
- Inspired by the need for a unified, extensible AI tools directory for modern teams.
