import Layout from "./components/Layout";
import { OnboardingPage } from "./pages/Onboarding";
import GoodbyePage from "./pages/Goodbye";
import IndexPage from "./pages/Index";
import { JSX } from "react";
import "./index.css";

const routes: Record<string, () => JSX.Element> = {
  "/": IndexPage,
  "/goodbye": GoodbyePage,
  "/onboarding": OnboardingPage,
}

export default function App() {
  const pathname = window.location.pathname;

  const Page = routes[pathname] ?? routes["/"];

  return (
    <Layout>
      <Page />
    </Layout>
  );
}
