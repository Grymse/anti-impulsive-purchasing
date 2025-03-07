import Header from "./Header";
import Text from "./Text";
import { Li, Ul } from "./Lists";
import { Link } from "./Text";
import { Button } from "./components/ui/button";
import { sendAnalytics, sendQuestionaryResponse } from "./Analytics";
import { ReactNode, useEffect } from "react";
import BackgroundWave from "./BackgroundWave";
import { WebsiteList } from "./data/websiteList";
import MainLogo from "./MainLogo";

export default function App() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/goodbye":
      return (
        <Layout>
          <GoodbyePage />
        </Layout>
      );
    case "/onboarding":
      return (
        <Layout>
          <OnboardingPage />
        </Layout>
      );
    default:
      return (
        <Layout>
          <IndexPage />
        </Layout>
      );
  }
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0a0a14", // Dark background
          zIndex: -2,
        }}
      />
      <BackgroundWave />
      <main className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 text-white">
        <div className="w-full max-w-2xl bg-black/30 p-8 rounded-xl backdrop-blur-sm shadow-xl">
          {children}
        </div>
      </main>
    </div>
  );
}

function GoodbyePage() {
  useEffect(() => {
    const userID = new URLSearchParams(window.location.search).get("userid");
    if (userID) {
      sendAnalytics("uninstall", undefined, userID);
    }
  }, []);

  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="mb-12 mt-16 relative">
          <MainLogo />
        </div>
        
        <div className="text-center mb-8">
          <Header 
            variant="h1" 
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            We're sad to see you leave
          </Header>
          <Text className="text-xl mt-2 text-white/80">
            Your feedback helps us improve
          </Text>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full mb-8">
          <Header variant="h3" className="text-center mb-4">
            What is the reason for uninstalling?
          </Header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
              onClick={(e) => {
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                sendQuestionaryResponse(
                  userID || "",
                  "Reason for Leaving",
                  "Not Useful",
                  "uninstall"
                );
                disableButtons(e);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Not Useful
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
              onClick={(e) => {
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                sendQuestionaryResponse(
                  userID || "",
                  "Reason for Leaving",
                  "Found a Better Extension",
                  "uninstall"
                );
                disableButtons(e);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Found alternative
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
              onClick={(e) => {
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                sendQuestionaryResponse(
                  userID || "",
                  "Reason for Leaving",
                  "Privacy Concerns",
                  "uninstall"
                );
                disableButtons(e);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Privacy Concerns
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
              onClick={(e) => {
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                sendQuestionaryResponse(
                  userID || "",
                  "Reason for Leaving",
                  "Too Many Bugs",
                  "uninstall"
                );
                disableButtons(e);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Buggy
            </Button>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:border-white/40 transition-all col-span-1 sm:col-span-2"
              onClick={(e) => {
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                sendQuestionaryResponse(
                  userID || "",
                  "Reason for Leaving",
                  "Other",
                  "uninstall"
                );
                disableButtons(e);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Other
            </Button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full">
          <Header variant="h3" className="text-center mb-4">
            Please share your feedback
          </Header>
          
          <textarea
            className="w-full p-4 bg-black/30 border border-white/20 rounded-lg mt-2 focus:border-purple-500 focus:ring focus:ring-purple-500/20 transition-all"
            placeholder="Your feedback helps us improve the extension..."
            rows={5}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                const feedback =
                  document.querySelector<HTMLTextAreaElement>("textarea")?.value;
                const userID = new URLSearchParams(window.location.search).get(
                  "userid"
                );
                if (feedback) {
                  sendQuestionaryResponse(
                    userID || "",
                    "Typed Feedback",
                    feedback,
                    "uninstall"
                  );
                  const button = e.target as HTMLButtonElement;
                  if (button) {
                    button.disabled = true;
                    button.textContent = "Feedback Submitted";
                  }
                  alert("Thank you for your feedback!");
                  window.location.href = "https://www.google.com";
                } else {
                  alert("Please provide your feedback before continuing.");
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Continue
            </Button>
            <Button
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10 hover:border-white/40 transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <a href="https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml" className="flex items-center">
                Reinstall Extension
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Text className="text-sm text-white/60">
            Thank you for trying Less. We hope to see you again soon!
          </Text>
        </div>
      </div>
    </div>
  );
}

function OnboardingPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
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
          <Text className="text-xl mt-2 mb-8 text-white/80">
            Your journey to mindful shopping begins
          </Text>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full mb-8">
          <Text className="text-center font-medium text-white mb-4">
            You are now on your way to:
          </Text>
          <div className="space-y-4">
            <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/5">
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
              <Text className="font-medium">Sustainable Consumption</Text>
            </div>

            <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/5">
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
              <Text className="font-medium">Financial Freedom</Text>
            </div>

            <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/5">
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
              <Text className="font-medium">Reducing Impulsive Purchasing</Text>
            </div>
          </div>
        </div>

        <Button className="px-8 py-2 mb-10 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
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

        <div className="mt-2">
          <a
            href="/"
            className="flex items-center text-white/60 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <Text className="text-sm">Privacy Policy</Text>
          </a>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex flex-col items-center justify-center mb-8">
        <blockquote className="text-primary text-xl font-light italic my-16">
          “One who is patient glows with an inner radiance.” - Allan Lokos
        </blockquote>

        <div className="mb-12 mt-4 relative">
          <MainLogo />
        </div>
        
        <div className="text-center mb-8">
          <Header 
            variant="h1" 
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            Welcome to Less
          </Header>
          <Text className="text-xl mt-2 text-white/80">
            Take a breath and think before you buy
          </Text>
        </div>
        
        {/* Toggle Button */}
        <Button
          className="w-full mt-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
          onClick={() => {
            window.location.href =
              "https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml";
          }}
        >
          Try it here!
        </Button>
      </div>
      {/* First Text Block */}

      <Header variant="h1">Research Description</Header>
      <Text>
        Welcome to Less, a browser extension designed to help reduce impulsive
        online purchases. Our global consumption levels have grown to an
        unsustainable scale, posing a serious threat to the planet’s
        environment. By encouraging mindful purchasing decisions, Less aims to
        promote a more eco-friendly lifestyle, help you save money, and offer
        the mental benefits of decluttering. Developed as part of a thesis on
        reducing online impulsive buying behaviors, this tool is meant to
        support both your financial well-being and the environment.
      </Text>

      <Header variant="h2">Supported Shopping Sites</Header>
      <Text>
        <WebsiteList />
      </Text>

      {/* Second Text Block */}

      <Header variant="h1">Analytics</Header>
      <Text>
        The extension is only active on a fixed list of known shopping domains,
        leaving all your other browsing out of analytics. For research purposes,
        we collect completely anonymous data to protect your privacy.
        Specifically:
        <Ul>
          <Li>No identifying information is ever tied to the data.</Li>
          <Li>All data is aggregated before any use. </Li>
          <Li>Data is not sold or shared with third parties. </Li>
        </Ul>
        For full transparency, the extension’s open-source code is available
        here on our{" "}
        <Link href="https://github.com/Grymse/anti-impulsive-purchasing">
          GitHub
        </Link>
        . In addition, be sure to read our Terms of Service before use.
      </Text>

      {/* Third Text Block */}
      <br />
      <Header variant="h1">Terms of Service</Header>
      <Text>A description of the terms of service</Text>

      <Header variant="h2">Introduction</Header>
      <Text>
        Welcome to Less, a browser extension developed as part of a thesis on
        reducing impulse purchasing habits. This extension aims to gather
        insights into user behavior and help develop strategies to minimize
        impulse purchases. By installing or using this extension, you agree to
        the following terms and conditions.
      </Text>

      <Header variant="h2">Eligibility</Header>
      <Text>
        Use of this extension is intended for individuals aged 18 and older who
        are interested in contributing to research on mitigating impulse
        purchasing behaviors.
      </Text>

      <Header variant="h2">Voluntary Participation</Header>
      <Text>
        Your use of this extension is entirely voluntary. You may discontinue
        use at any time without any consequences or obligations. There is no
        requirement to continue using the extension once installed, and you may
        disable or remove it at will.
      </Text>

      <Header variant="h2">Data Collection and Usage</Header>
      <Text>
        The data collected include information about your browsing activity on
        the listed websites above, along with details about the amount of
        purchases, and products individual pricing. All collected data will be
        anonymized and used solely for academic research purposes related to
        reducing impulse purchasing behavior. This information may also appear
        in publications or presentations based on the research.
      </Text>

      <Header variant="h2">Confidentiality and Privacy</Header>
      <Text>
        Your privacy is paramount. Any personal data is processed and stored
        securely, in accordance with applicable privacy regulations (e.g., GDPR,
        CCPA). Identifiable data, if collected, will not be shared with third
        parties or used for purposes unrelated to this research. All published
        research findings will be reported in a manner that safeguards
        anonymity.
      </Text>

      {/* Data Security */}

      <Header variant="h2">Data Security</Header>
      <Text>
        All collected data is stored securely using Supabase database service.
        Reasonable measures are in place to prevent unauthorized access, loss,
        or disclosure.
      </Text>

      {/* Liability Disclaimer */}

      <Header variant="h2">Liability Disclaimer</Header>
      <Text>
        Although efforts are made to secure your data, Nicolai Grymer and
        IT-University of Copenhagen are not liable for any unauthorized access
        or unforeseen data breaches that may occur despite best practices.
      </Text>

      {/* Right to Withdraw and Data Removal */}

      <Header variant="h2">Right to Withdraw and Data Removal</Header>
      <Text>
        If, after providing data through the extension, you wish to withdraw
        your anonymized data from the study, you must make a request within 30
        days of your usage. After this period, data may be aggregated and fully
        anonymized, making specific entries unidentifiable and thus impossible
        to remove. To request data removal, please contact us promptly at the
        emails listed below.
      </Text>

      {/* Contact Information */}

      <Header variant="h2">Contact Information</Header>
      <Text>
        For any questions or concerns regarding this extension, your
        participation, or the data collected, please contact:
        <Ul>
          <Li>
            Nicolai Grymer: <Link href="mailto:ngry@itu.dk">ngry@itu.dk</Link>
          </Li>
          <Li>
            Frederik Rothe: <Link href="mailto:frot@itu.dk">frot@itu.dk</Link>
          </Li>
        </Ul>
      </Text>

      {/* Consent */}

      <Header variant="h2">Consent</Header>
      <Text>
        By installing and using this extension, you confirm that you have read,
        understood, and agree to these Terms of Service. Your continued usage
        constitutes your consent to be part of the research under the outlined
        terms.
      </Text>

      {/* Thank You */}
      <Text>Thank you for participating in our research.</Text>

      <br />
      <br />

      <Text>
        The Less team
        <br />
        <span className="text-muted-foreground">
          Nicolai Grymer & Frederik Rothe
          <br />
          IT-University of Copenhagen
        </span>
      </Text>
    </div>
  );
}

function disableButtons(event: any) {
  const buttons = event.target.parentElement.querySelectorAll("button");
  buttons.forEach((button: any) => {
    button.disabled = true;
  });
}
