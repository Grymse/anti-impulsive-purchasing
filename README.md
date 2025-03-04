# Less Extension

<img src="./extension//assets/icon.png" alt="Less Icon" width="200"/>

## Description

Welcome to *Less*, a browser extension designed to help reduce impulsive online purchases. Our global consumption levels have grown to an unsustainable scale, posing a serious threat to the planet’s environment. By encouraging mindful purchasing decisions, *Less* aims to promote a more eco-friendly lifestyle, help you save money, and offer the mental benefits of decluttering.

Developed as part of a thesis on reducing online impulsive buying behaviors, this tool is meant to support both your financial well-being and the environment.

### Supported webshops
Refer to the updated list found on [our webpage.](https://www.lessextension.com/)

### Analytics

The extension collects data on which pages users visit, how long users are on each site, 'add-to-cart' clicks, 'checkout' clicks and 'pay' clicks. When a user pay, the current cart is sent along as well (Specifically each items price & quantity but no information on the product itself). All of these analytics will inform our research, such that we can measure the effectiveness of different consumption reduction features/strategies, which we intend to implement over time.

With regards to data-handling, we guarantee:
- No identifying information is ever tied to the data.
- All data is aggregated before any use.
- Data is not sold or shared with third parties.

Analytics are opt-in. Only if the user activates the plugins features, does the analytics start.

## Development

### Technologies
**Extension**
- **Plasmo**: Framework for building browser extensions.
- **Shadcn/ui**: Modern UI components for a polished look.
- **TypeScript**: Strongly typed JavaScript for better reliability.
- **Tailwind CSS**: Utility-first styling for a highly customizable design.
- **Supabase**: Open-source Firebase alternative. (For analytics)

**Web Application**
- **React**: Framework for reactive web applications
- **Shadcn/ui**: Modern UI components for a polished look.
- **TypeScript**: Strongly typed JavaScript for better reliability.
- **Tailwind CSS**: Utility-first styling for a highly customizable design.

### Setup Environment variables

Copy `.env.example` into two files:
- `.env.production`
- `.env.development`

These define the variables for each environment. Remember to setup the correct variables for the correct environment.

### How to get started

First, run the development server:

```bash
cd extension
npm i
npm run dev
```

The build uses `.env.development` as variables.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes.

For further guidance, [visit plasmo docs](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

The build uses `.env.production` as variables

### Folder structure

```go
// PLASMO EXTENSION
extension/
├── assets
│   └── icon.png // Extension Icon
├── build
│   ├── chrome-mv-dev
│   └── chrome-mv-prod
├── data
│   ├── event-catcher.py  // Script to catch events from the analytics endpoint (for development)
│   ├── readme.md
│   └── statistical_analysis.ipynb // Script to calculate powertest of potential experiments
├── src
│   ├── assets
│   │   ├── icon-off.png
│   │   └── icon.png
│   ├── components
│   │   └── ui
│   │       └── button.tsx // Shadcn button
│   ├── contents
│   │   ├── enforce-wait.ts // Enforce wait-time (24hrs) before allowing users to buy
│   │   ├── need-this.tsx // Pop-up questionary to seed doubt about the users purchase
│   │   └── tracker.ts // Track analytics
│   ├── hooks
│   │   └── useConsent.ts // A hook to interact with user-consent
│   ├── lib
│   │   ├── analytics.ts // Logic for sending analytical events
│   │   ├── getters.ts // For each domain, a set of getters for the correct elements are provided
│   │   ├── observer.ts // To mutate, we observe changes using a helper
│   │   ├── permit.ts // We use a permit system to allow purchases after 24 hours
│   │   └── utils.ts
│   ├── options
│   │   └── index.tsx
│   ├── popup
│   │   └── index.tsx
│   └── style.css // CSS file that adds tailwind
├── .env.example // Requires supabase credentials to build
├── .prettierrc.mjs
├── components.json // Shadcn/ui requires this file
├── LICENSE.txt
├── package.json
├── postcss.config.js // Tailwind-related config
├── README.md
├── tailwind.config.js // Tailwind config
└── tsconfig.json

// Supabase edge functions and db
edge/
├── package.json
└── supabase
    ├── config.toml
    ├── functions
    │   └── analytics
    │       └── index.ts // Endpoint to receive analytics
    └── seed.sql // Empty SQL file. We setup the analytics table in the browser


// FLASK ENDPOINT
data/
└── event-catcher.py // Script for debugging analytical endpoint

// REACT APP
policy-web/
├── public
│   ├── icon.png
│   └── icon128.png
├── src
│   ├── App.tsx // Full app in here
│   ├── Header.tsx // Header component
│   ├── Lists.tsx // List component
│   ├── Text.tsx // Text component
│   ├── components
│   │   └── ui // Shadcn/ui components are imported here
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── style.css
│   └── vite-env.d.ts
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```