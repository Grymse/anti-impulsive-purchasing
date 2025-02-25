import IconOffSrc from "data-base64:~assets/icon-off.png"
import IconSrc from "data-base64:~assets/icon.png"

import "../style.css"

import { useConsent } from "~hooks/useConsent"
import { Button } from "~components/ui/button"
import Header from "./Header"
import Text from './Text';
import { Li, Ul } from "./Lists"
import { Link } from './Text';
import SettingsPage from "./Settings"

function OptionsPage() {
  let { isActive, toggleActive } = useConsent()

  // Detect the user's system preference for dark mode
  const preferDarkmode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches

  const secretSettings = window.location.search.includes("secret");

  if (secretSettings) return <SettingsPage />

  return (
    <main
      className={`
        ${preferDarkmode ? "dark" : ""}
        min-h-screen
        flex flex-col items-center justify-center
        bg-background
        px-8 py-6
      `}>
      <div className="max-w-2xl space-y-2">
        <div className="flex flex-col items-center justify-center mb-8">
          <blockquote className={`${isActive ? 'text-primary' : 'text-muted-foreground'} text-xl italic my-16`}>
            “One who is patient glows with an inner radiance.” - Allan Lokos
          </blockquote>
        {/* Logo Section */}
        <div className="mb-12 text-center">
          {isActive ? (
            <img
              src={IconSrc}
              alt="Extension Logo (On)"
              width={128}
              height={128}
              className="w-full h-full max-w-[200px] animation-breathe"
            />
          ) : (
            <img
              src={IconOffSrc}
              alt="Extension Logo (Off)"
              width={128}
              height={128}
              className="w-full h-full max-w-[200px] scale-75 transform opacity-80"
            />
          )}
        </div>
        {/* Toggle Button */}
        <Button className={'w-1/2 mb-4'} onClick={() => toggleActive()}>
          Turn {isActive ? "off" : "on"}
        </Button>
        <Text className="text-muted-foreground">By turning on the extension, you agree to the terms & conditions below.</Text>
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
          <span className="font-semibold">American</span>
          <Ul>
            <Li>
              <Link href="https://www.amazon.com/">Amazon.com</Link>
            </Li>
            <Li>
              <Link href="https://ebay.com/">Ebay.com</Link>
            </Li>
          </Ul>
          <span className="font-semibold">Danish</span>
          <Ul>
            <Li>
              <Link href="https://www.zalando.dk/">Zalando.dk</Link>
            </Li>
            <Li>
              <Link href="https://www.matas.dk/">Matas.dk</Link>
            </Li>
            <Li>
              <Link href="https://www.proshop.dk/">Proshop.dk</Link>
            </Li>
            <Li>
              <Link href="https://www.boozt.com/">Boost.dk</Link>
            </Li>
          </Ul>
        </Text>
      
      {/* Second Text Block */}
      
        <Header variant="h1">Analytics</Header>
        <Text>
          The extension is only active on a fixed list of known shopping
          domains, leaving all your other browsing out of analytics. For
          research purposes, we collect completely anonymous data to protect
          your privacy. Specifically:
          <Ul>
            <Li>No identifying information is ever tied to the data.</Li>
            <Li>All data is aggregated before any use. </Li>
            <Li>Data is not sold or shared with third parties. </Li>
          </Ul>
          
          For full transparency, the extension’s open-source code is available here on our{" "}
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
          Welcome to Less, a browser extension developed as part of a thesis
          on reducing impulse purchasing habits. This extension aims to gather
          insights into user behavior and help develop strategies to minimize
          impulse purchases. By installing or using this extension, you agree
          to the following terms and conditions.
        </Text>
      
        <Header variant="h2">Eligibility</Header>
        <Text>
          Use of this extension is intended for individuals aged 18 and older
          who are interested in contributing to research on mitigating impulse
          purchasing behaviors.
        </Text>

        <Header variant="h2">Voluntary Participation</Header>
        <Text>
          Your use of this extension is entirely voluntary. You may
          discontinue use at any time without any consequences or obligations.
          There is no requirement to continue using the extension once
          installed, and you may disable or remove it at will.
        </Text>
        
        <Header variant="h2">Data Collection and Usage</Header>
        <Text>
          The data collected include information about your browsing activity
          on the listed websites above, along with details about the amount of
          purchases, and products individual pricing. All
          collected data will be anonymized and used solely for academic
          research purposes related to reducing impulse purchasing behavior.
          This information may also appear in publications or presentations
          based on the research.
        </Text>
      
        <Header variant="h2">Confidentiality and Privacy</Header>
        <Text>
          Your privacy is paramount. Any personal data is processed and stored
          securely, in accordance with applicable privacy regulations (e.g.,
          GDPR, CCPA). Identifiable data, if collected, will not be shared
          with third parties or used for purposes unrelated to this research.
          All published research findings will be reported in a manner that
          safeguards anonymity.
        </Text>
      

        {/* Data Security */}
        
          <Header variant="h2">Data Security</Header>
          <Text>
            All collected data is stored securely using Supabase
            database service. Reasonable measures are in place to prevent
            unauthorized access, loss, or disclosure.
          </Text>
        

        {/* Liability Disclaimer */}
        
          <Header variant="h2">Liability Disclaimer</Header>
          <Text>
            Although efforts are made to secure your data, Nicolai Grymer and
            IT-University of Copenhagen are not liable for any unauthorized
            access or unforeseen data breaches that may occur despite best
            practices.
          </Text>
        

        {/* Right to Withdraw and Data Removal */}
        
          <Header variant="h2">Right to Withdraw and Data Removal</Header>
          <Text>
            If, after providing data through the extension, you wish to withdraw
            your anonymized data from the study, you must make a request within
            30 days of your usage. After this period, data may be aggregated and
            fully anonymized, making specific entries unidentifiable and thus
            impossible to remove. To request data removal, please contact us
            promptly at the emails listed below.
          </Text>
        

        {/* Contact Information */}
        
          <Header variant="h2">Contact Information</Header>
          <Text>
            For any questions or concerns regarding this extension, your
            participation, or the data collected, please contact:
          
            <Ul className="list-disc list-inside mt-2 text-sm">
              <Li>
                Nicolai Grymer:{" "}
                <Link
                  href="mailto:ngry@itu.dk"
                >
                  ngry@itu.dk
                </Link>
              </Li>
              <Li>
                Frederik Rothe:{" "}
                <Link
                  href="mailto:frot@itu.dk"
                >
                  frot@itu.dk
                </Link>
              </Li>
            </Ul>
          </Text>
        

        {/* Consent */}
        
          <Header variant="h2">Consent</Header>
          <Text>
            By installing and using this extension, you confirm that you have
            read, understood, and agree to these Terms of Service. Your
            continued usage constitutes your consent to be part of the research
            under the outlined terms.
          </Text>
        

        {/* Thank You */}
        <Text>
          Thank you for participating in our research.
        </Text>

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
    </main>
  )
}

export default OptionsPage
