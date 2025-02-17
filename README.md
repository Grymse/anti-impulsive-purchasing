# Less Extension

<img src="./assets/icon.png" alt="Less Icon" width="200"/>

## Description



## Technologies
- Plasmo: Framework for building browser extensions.
- Shadcn: Modern UI components for a polished look.
- TypeScript: Strongly typed JavaScript for better reliability.
- Tailwind CSS: Utility-first styling for a highly customizable design.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```


You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our eation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```