# Yellow Gold

A simple and user-friendly online color mixing tool that supports various mixing algorithms and color selection options.

## Features

- Multiple color mixing algorithms (RGB Additive, Simple Average, Weighted Mix, Subtractive)
- Built-in palette with 49 predefined colors
- Mix history feature to reload previous mixing results
- Light/Dark theme toggle
- Bilingual color names (English/Chinese)
- Database integration for saving and syncing mix records

## Tech Stack

- React 18.x
- TypeScript
- Tailwind CSS 3.x
- Vite
- Vercel
- Neon PostgreSQL

## Development

```bash
# Install dependencies
npm install

# Pull environment variables from Vercel
npx vercel env pull .env.development.local

# Start development server with API routes
npx vercel dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The application is configured for seamless deployment on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

You can also set up automatic deployments by connecting your GitHub repository to Vercel for continuous deployment.
