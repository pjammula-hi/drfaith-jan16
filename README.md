# Discover Your Best Self

This project is a Vite + React + TypeScript application styled with Tailwind CSS and shadcn-ui components. It powers the "Discover Your Best Self" experience, highlighting compassionate mental health care services.

## Local Development

1. Copy the sample environment and provide the required keys:
   ```sh
   cp .env.example .env
   ```
2. Update `.env` with your Google reCAPTCHA keys and Gmail SMTP app password (an app-specific password is required for Gmail).
3. Install dependencies and start both the web client and the contact API:
   ```sh
   npm install
   npm run server   # in a separate terminal
   npm run dev
   ```

The Vite dev server listens on port 8080 by default (see `vite.config.ts`). Update `.env` or the Vite config if you need a different port.

## Available Scripts

- `npm run dev` – start the development server with hot module replacement
- `npm run build` – generate a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint across the codebase
- `npm run server` – start the Express API that verifies reCAPTCHA responses and sends contact form emails

## Tech Stack

- Vite
- React 18 with TypeScript
- Tailwind CSS & shadcn-ui component library
- Radix UI primitives

## Project Structure

- `src/` – application source code (components, pages, hooks, lib utilities)
- `public/` – static assets served as-is, including images and favicons
- `tailwind.config.ts` – Tailwind CSS configuration
- `vite.config.ts` – Vite bundler configuration

## Contributing

1. Create a feature branch.
2. Make your changes and ensure `npm run lint` passes.
3. Build the app with `npm run build` to verify there are no type errors.
4. Open a pull request for review.

## License

This project is private and all rights are reserved unless otherwise stated in accompanying documentation.
