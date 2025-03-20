import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import MainLogo from "@/components/MainLogo";
import Text from "@/components/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { sendAnalytics } from "@/lib/analytics";

const concepts = [
  "Sustainable Consumption",
  "Financial Freedom",
  "Reducing Impulsive Purchasing",
];

export function OnboardingPage() {
  useEffect(() => {
    const from = localStorage.getItem("from");
    if (from) {
      sendAnalytics("on-onboarding", from, "none");
      localStorage.removeItem("from");
    } else {
      sendAnalytics("on-onboarding", "", "none");
    }
  }, []);

  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8 space-y-8">
        <div className="mb-8 mt-12 relative">
          <MainLogo />
        </div>

        <div className="text-center">
          <Header
            variant="h1"
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            Welcome to Less!
          </Header>
          <Text className="text-xl mt-2 mb-8 text-muted-foreground">
            Your journey to mindful shopping begins.
          </Text>
          <Text className="text-l mt-2 mb-8 text-muted-foreground">
            Please note that, as this tool is currently being used in a research
            study, users are divded into two groups. Namely the control group
            and the intervention group. If interested we can notify you about
            the results of the study when concluded.
          </Text>
        </div>

        <Card className="w-full bg-green-500/5 border-green-500/20">
          <CardHeader>
            <Header variant="h3" className="text-center font-normal">
              You are now on your way to:
            </Header>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {concepts.map((concept) => (
                <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-accent">
                  <div className="bg-green-500/20 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Text className="font-medium">{concept}</Text>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="px-8 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <a href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            About
          </a>
        </Button>

        <a href="/" className="flex items-center transition-colors">
          <Text className="text-sm underline text-muted-foreground flex justify-center gap-2 items-center">
            <Info />
            Privacy Policy
          </Text>
        </a>
      </div>
    </div>
  );
}
