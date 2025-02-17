# Less Extension

<img src="./assets/icon.png" alt="Less Icon" width="200"/>

## Description

Welcome to Less, a browser extension designed to help reduce impulsive online purchases. Our global consumption levels have grown to an unsustainable scale, posing a serious threat to the planet’s environment. By encouraging mindful purchasing decisions, Less aims to promote a more eco-friendly lifestyle, help you save money, and offer the mental benefits of decluttering.

Developed as part of a thesis on reducing online impulsive buying behaviors, this tool is meant to support both your financial well-being and the environment.

### Supported webshops
**American**
- [Amazon.com](https://www.amazon.com/)
- [Ebay.com](https://ebay.com/)

**Danish**
- [Zalando.dk](https://www.zalando.dk/)
- [Matas.dk](https://www.matas.dk/)
- [Proshop.dk](https://www.proshop.dk/)
- [Boost.dk](https://www.boozt.com/)

### Analytics

The extension collects data on which pages users visit, how long users are on each site, 'add-to-cart' clicks, 'checkout' clicks and 'pay' clicks. When a user pay, the current cart is sent along as well (Price & quantity but no product ID). All of these analytics will inform our research, such that we can measure the effectiveness of different consumption reduction features/strategies, which we intend to implement over time.

With regards to data-handling, we specifically:
- No identifying information is ever tied to the data.
- All data is aggregated before any use.
- Data is not sold or shared with third parties.


## Development

### Technologies
- Plasmo: Framework for building browser extensions.
- Shadcn: Modern UI components for a polished look.
- TypeScript: Strongly typed JavaScript for better reliability.
- Tailwind CSS: Utility-first styling for a highly customizable design.
- Supabase: Open-source Firebase alternative. (For analytics)

### How to get started

First, run the development server:

```bash
npm i
npm run dev
```

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes.

For further guidance, [visit plasmo docs](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

### Folder structure

```go
anti-consumption/
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
```