import { Button } from "../components/ui/button"
import Header from "../components/Header"
import Text from '../components/Text';
import { Li, Ul } from "../components/Lists"
import { Link } from '../components/Text';
import MainLogo from "../components/MainLogo"
import { WebsiteList } from "../components/WebsiteList"
import { useEffect } from "react";
import { sendAnalytics } from "@/lib/analytics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const concepts = [
  "Consume Sustainably",
  "Give Financial Freedom",
  "Fight Back Invasive Marketing",
];

export default function IndexPage() {

  function onCTA() {
    const fromQueryParam = new URLSearchParams(window.location.search).get("from");
    
    if (fromQueryParam) {
      sendAnalytics("from-directs-cta", fromQueryParam, "less-website");
    }
  }

  useEffect(() => {
    const fromQueryParam = new URLSearchParams(window.location.search).get("from");
    if (fromQueryParam) {
      localStorage.setItem("from", fromQueryParam);
      sendAnalytics("from-directs", fromQueryParam, "less-website");
    }
  },[]);
  
  return (
    <div className="max-w-2xl space-y-2 mt-20">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="mb-12 mt-4 relative">
          <MainLogo />
        </div>
        
        <div className="text-center mb-8">
          <Header 
            variant="h1" 
            className="bg-clip-text tracking-normal text-5xl font-medium text-transparent bg-gradient-to-r  from-sky-400 to-blue-400"
          >
            Welcome to Less
          </Header>
          <Text className="text-xl gantari mt-4 font-medium tracking-normal bg-gradient-to-r bg-clip-text text-transparent from-sky-400 to-cyan-400 dark:opacity-80">
            Take a breath and think before you buy
          </Text>
        </div>
        
        {/* Toggle Button */}
        <Button
          className="py-6 px-12 gantari text-lg mt-8 bg-gradient-to-r rounded-full text-white from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 transition-all"
          onClick={() => {
            onCTA();
            window.location.href =
              "https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml";
          }}
        >
            Click to install
        </Button>
      </div>

      <Card className="w-full bg-green-500/10 border-green-500/20">
          <CardHeader>
            <Header variant="h3" className="text-center font-normal">
              We're here to help you:
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
      {/* First Text Block */}
      <Header variant="h1">Description</Header>
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
      <WebsiteList />

      {/* Second Text Block */}

      <Header variant="h1">Analytics</Header>
      <Text>
        The extension is only active on a fixed list of known shopping domains,
        leaving all your other browsing out of analytics. For research purposes,
        we collect completely anonymous data to protect your privacy.
        Specifically:
        </Text>
        <Ul>
          <Li>No identifying information is ever tied to the data.</Li>
          <Li>All data is aggregated before any use. </Li>
          <Li>Data is not sold or shared with third parties. </Li>
        </Ul>
        <Text>
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
      </Text>
      <Ul>
        <Li>
          Nicolai Grymer: <Link href="mailto:ngry@itu.dk">ngry@itu.dk</Link>
        </Li>
        <Li>
          Frederik Rothe: <Link href="mailto:frot@itu.dk">frot@itu.dk</Link>
        </Li>
      </Ul>

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
