import DarkmodeButton from "./components/utils/DarkmodeButton";
import Providers from "./Providers";
import Survey from "./components/survey/Survey";
import ProgressBar from "./components/survey/ProgressBar";
import Terms from "./components/Terms";
import { useEffect, useState } from "react";

function App() {
  const [isTerms, setTerms] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerms(window.location.href.includes('/#/terms'));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Providers>
      <div className="absolute bottom-4 right-4">
        <DarkmodeButton />
      </div>
      <ProgressBar />
      <main className="w-[100dvw] h-[100dvh] overflow-y-scroll">
        {isTerms ? <Terms /> : <Survey />}
      </main>
    </Providers>
  );
}

export default App;
