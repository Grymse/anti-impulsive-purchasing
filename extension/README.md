# Less Extension

The main browser extension built with the Plasmo framework to help reduce impulsive online purchases.

## Description

*Less* is a browser extension that implements various intervention strategies to help users make more mindful purchasing decisions online. The extension includes features like enforced wait times, questionnaire modals, and purchase tracking across supported e-commerce websites.

## Technologies

- **Plasmo**: Framework for building browser extensions
- **React**: UI components and interactions
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling and design system
- **Shadcn/ui**: Modern UI component library
- **Supabase**: Backend analytics and data collection

## Key Features

- **Wait Time Enforcement**: 24-hour cooling-off period before purchases
- **Questionnaire Modal**: Prompts users to reflect on their purchase decisions
- **Analytics Tracking**: Collects anonymized data on user behavior and purchasing patterns
- **Multi-site Support**: Works across various e-commerce platforms

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables by copying `.env.example` to:
   - `.env.development` (for development)
   - `.env.production` (for production builds)

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Development

The extension uses content scripts to inject functionality into e-commerce websites, with domain-specific selectors and behaviors defined in the `lib/getters.ts` file.

**Note**: AI assistance was used to help develop parts of this extension's codebase.