import type { ReactNode } from "react";
import BackgroundWave from "./BackgroundWave";

export default function Layout({ children, isActive }: { children: ReactNode, isActive: boolean }) {
  const preferDarkmode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches

  return (
    <div className={preferDarkmode ? "dark bg-lessbackground" : "bg-lessbackground"} style={{
      colorScheme: preferDarkmode ? 'dark' : '',
    }}>
      <BackgroundWave isActive={isActive} />
      <main className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 text-white">
        <div className="w-full max-w-2xl bg-white/70 dark:bg-black/70 p-8 rounded-xl backdrop-blur-sm shadow-xl">
          {children}
        </div>
      </main>
    </div>
  );
}