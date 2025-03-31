import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";

const EXAMPLE_DOMAIN = "amazon.com";
const PERMIT_WAIT_TIME = "24 hours";
const PERMIT_LENGTH = "48 hours";

export function WaitTimeShowcase() {
  const [mode, setMode] = React.useState<"initial" | "waiting" | "completed">("waiting");
  const [waitTime, setWaitTime] = React.useState({ hours: 2, minutes: 45, seconds: 30 });
  
  return (
    <Card className="w-full border dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wait Before Purchasing</span>
          <Badge variant="outline" className="ml-2">
            {EXAMPLE_DOMAIN}
          </Badge>
        </CardTitle>
        <CardDescription>
          Taking time before making a purchase helps reduce impulsive buying
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {mode === "initial" && (
          <div className="text-center">
            <p className="mb-4">
              Starting a wait timer for <strong>{EXAMPLE_DOMAIN}</strong> helps you make
              more conscious purchasing decisions.
            </p>
            <Button onClick={() => setMode("waiting")}>Start Wait Timer</Button>
          </div>
        )}
        
        {mode === "waiting" && (
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="text-3xl font-bold">{waitTime.hours}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Hours</div>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="text-3xl font-bold">{waitTime.minutes}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Minutes</div>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="text-3xl font-bold">{waitTime.seconds}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Seconds</div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
              Please wait before completing your purchase on{" "}
              <strong>{EXAMPLE_DOMAIN}</strong>. This waiting period helps you make a
              more thoughtful decision. You can safely close this window; the
              timer will continue to run.
            </p>
            <div className="flex justify-between gap-4 mt-2 w-full">
              <Button variant="outline" className="w-full" onClick={() => setMode("initial")}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={true}>
                Continue with Purchase
              </Button>
            </div>
          </div>
        )}
        
        {mode === "completed" && (
          <div className="text-center">
            <p className="mb-4">
              Your wait time for <strong>{EXAMPLE_DOMAIN}</strong> has elapsed. You may
              proceed with your purchase.
            </p>
            <Button onClick={() => setMode("initial")}>Continue with Purchase</Button>
          </div>
        )}

        <Accordion
          type="single"
          collapsible
          className="w-full">
          <AccordionItem value="info" className="border-slate-200 dark:border-slate-700">
            <AccordionTrigger className="text-sm">
              How does the wait timer work?
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Purchase Permits</strong> are domain-specific waiting
                  periods that help you avoid impulsive purchases. Each website
                  you shop at has its own permit.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md space-y-2">
                  <p className="font-medium">When you start a wait timer:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      You'll need to wait{" "}
                      <strong>{PERMIT_WAIT_TIME}</strong> before
                      being able to purchase
                    </li>
                    <li>
                      After the waiting period, you'll have a{" "}
                      <strong>{PERMIT_LENGTH}</strong> window to
                      complete your purchase
                    </li>
                    <li>
                      This permit only applies to <strong>{EXAMPLE_DOMAIN}</strong>
                    </li>
                    <li>
                      You can come back anytime - your timer continues to run
                      even if you close the site
                    </li>
                  </ul>
                </div>

                <p>
                  Research shows that introducing a waiting period between
                  wanting to buy something and actually purchasing it
                  significantly reduces impulsive buying behavior.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}