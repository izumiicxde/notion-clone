# Ishiki – Notion Clone

**Ishiki** is a Notion-style note-taking application. It offers a block-based rich text editor, document management, media support, and a smooth authentication flow, all built with a modern React/Next.js stack and real-time backend integration using Convex.

GitHub Repository: [https://github.com/izumiicxde/notion-clone](https://github.com/izumiicxde/notion-clone)

---

## Features

- **Clerk Authentication** – Seamless user login and session handling.
- **Block-Based Editor** – Built using BlockNote for structured content editing.
- **Convex Backend** – Real-time database and backend operations.
- **Edge Store Integration** – For file and media uploads.
- **Emoji Picker** – Document emojis for quick personalization.
- **Theming Support** – Dark and light mode toggling via `next-themes`.
- **Responsive Design** – Optimized UI built using Tailwind CSS and ShadcnUI.

---

## Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React 18, Tailwind CSS, Radix UI
- **Editor**: BlockNote
- **Backend**: Convex
- **Auth**: Clerk
- **Icons**: lucide-react
- **State**: Zustand
- **Validation**: Zod

---

## Environment Variables

Create a `.env.local` file in the root directory with the following keys:

```
NEXT_PUBLIC_CONVEX_URL=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
```

---

## Getting Started

### Clone the repository

```
git clone https://github.com/izumiicxde/notion-clone
cd notion-clone
```

### Install dependencies

Using **npm**:

```
npm install
```

Or using **yarn**:

```
yarn install
```

### Start the development server

Using **npm**:

```
npm run dev
```

Or using **yarn**:

```
yarn dev
```

---

## Scripts

- `dev` – Start development server
- `build` – Create production build
- `start` – Run built production server
- `lint` – Run ESLint

---

## License

MIT License
