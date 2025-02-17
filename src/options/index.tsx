import { ScrollArea } from "@/components/ui/scroll-area"
import IconOffSrc from "data-base64:~assets/icon-off.png"
import IconSrc from "data-base64:~assets/icon.png"

import "../style.css"

import { useConsent } from "~hooks/useConsent"
import { Button } from "~ui/button"

function OptionsPage() {
  let { isActive, toggleActive } = useConsent()

  // Detect the user's system preference for dark mode
  const preferDarkmode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches

  return (
    <main
      className={`
        ${preferDarkmode ? "dark" : ""}
        min-h-screen
        flex flex-col items-center justify-center
        bg-background
        px-8 py-6
      `}>
      <div
        className="
        text-center mb-4
        w-full max-w-md p-4 rounded-md
        bg-white text-black
        dark:bg-gray-800 dark:text-white
      ">
        <h1 className="text-xl font-semibold mb-2 italic">
          “One who is patient glows with an inner radiance.” - Allan Lokos
        </h1>
      </div>
      {/* Logo Section */}
      <div className="mb-8 text-center">
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
      <Button className="w-1/2 mb-4" onClick={() => toggleActive()}>
        Turn {isActive ? "off" : "on"}
      </Button>

      {/* First Text Block */}
      <div
        className="
        text-center mb-4
        w-full max-w-md p-4 rounded-md
        bg-white text-black
        dark:bg-gray-800 dark:text-white
      ">
        <h2 className="text-xl font-semibold mb-2">Research Description</h2>
        <p>
          Welcome to Less, a browser extension designed to help reduce impulsive
          online purchases. Our global consumption levels have grown to an
          unsustainable scale, posing a serious threat to the planet’s
          environment. By encouraging mindful purchasing decisions, Less aims to
          promote a more eco-friendly lifestyle, help you save money, and offer
          the mental benefits of decluttering. Developed as part of a thesis on
          reducing online impulsive buying behaviors, this tool is meant to
          support both your financial well-being and the environment.
        </p>
      </div>
      {/* Second Text Block */}
      <div
        className="
        text-center
        w-full max-w-md p-4 rounded-md
        bg-white text-black
        dark:bg-gray-800 dark:text-white
      ">
        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
        <p>
          The extension is only active on a fixed list of known shopping
          domains, leaving all your other browsing out of analytics. For
          research purposes, we collect completely anonymous data to protect
          your privacy. Specifically: * No identifying information is ever tied
          to the data. * All data is aggregated before any use. * Data is not
          sold or shared with third parties. For full transparency, the
          extension’s open-source code is available here on our{" "}
          <a
            href="https://github.com/Grymse/anti-impulsive-purchasing"
            style={{ color: "blue" }}>
            GitHub
          </a>
          . In addition, be sure to read our Terms of Service before use.
        </p>
      </div>
      {/* Third Text Block */}
      <br />
      <ScrollArea className="max-h-[400px] border rounded p-4 bg-white dark:bg-gray-900">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Terms of Service</h1>
          <p>A description of the terms of service</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Introduction</h2>
          <p className="mt-2">
            Welcome to Less, a browser extension developed as part of a thesis
            on reducing impulse purchasing habits. This extension aims to gather
            insights into user behavior and help develop strategies to minimize
            impulse purchases. By installing or using this extension, you agree
            to the following terms and conditions.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Eligibility</h2>
          <p className="mt-2">
            Use of this extension is intended for individuals aged 18 and older
            who are interested in contributing to research on mitigating impulse
            purchasing behaviors.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Voluntary Participation</h2>
          <p className="mt-2">
            Your use of this extension is entirely voluntary. You may
            discontinue use at any time without any consequences or obligations.
            There is no requirement to continue using the extension once
            installed, and you may disable or remove it at will.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Data Collection and Usage</h2>
          <p className="mt-2">
            The data collected may include, but is not limited to, information
            about your browsing activity and information on purchases. All
            collected data will be anonymized and used solely for academic
            research purposes related to reducing impulse purchasing behavior.
            This information may also appear in publications or presentations
            based on the research.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Confidentiality and Privacy</h2>
          <p className="mt-2">
            Your privacy is paramount. Any personal data is processed and stored
            securely, in accordance with applicable privacy regulations (e.g.,
            GDPR, CCPA). Identifiable data, if collected, will not be shared
            with third parties or used for purposes unrelated to this research.
            All published research findings will be reported in a manner that
            safeguards anonymity.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Data Security</h2>
          <p className="mt-2">
            All collected data is stored securely using Google’s Firestore
            database service. Reasonable measures are in place to prevent
            unauthorized access, loss, or disclosure.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Liability Disclaimer</h2>
          <p className="mt-2">
            Although efforts are made to secure your data, Nicolai Grymer and
            IT-University of Copenhagen are not liable for any unauthorized
            access or unforeseen data breaches that may occur despite best
            practices.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Right to Withdraw and Data Removal</h2>
          <p className="mt-2">
            If, after providing data through the extension, you wish to withdraw
            your anonymized data from the study, you must make a request within
            30 days of your usage. After this period, data may be aggregated and
            fully anonymized, making specific entries unidentifiable and thus
            impossible to remove. To request data removal, please contact us
            promptly at the emails listed below.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Contact Information</h2>
          <p className="mt-2">
            For any questions or concerns regarding this extension, your
            participation, or the data collected, please contact:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Nicolai Grymer:{" "}
              <a href="mailto:pronicoxd@gmail.com">pronicoxd@gmail.com</a> or{" "}
              <a href="mailto:ngry@itu.dk">ngry@itu.dk</a>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Consent</h2>
          <p className="mt-2">
            By installing and using this extension, you confirm that you have
            read, understood, and agree to these Terms of Service. Your
            continued usage constitutes your consent to be part of the research
            under the outlined terms.
          </p>
        </div>

        <div className="mb-4">
          <p>Thank you for participating in our research.</p>
          <p className="mt-2">The Less team</p>
          <p>Nicolai Grymer &amp; Frederik Rothe</p>
          <p>IT-University of Copenhagen</p>
        </div>
      </ScrollArea>
    </main>
  )
}

export default OptionsPage
