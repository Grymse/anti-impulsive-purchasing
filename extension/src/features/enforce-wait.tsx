import { useEffect, useState } from "react"

import { useModal } from "~components/Modal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~components/ui/accordion"
import { Badge } from "~components/ui/badge"
import { Button } from "~components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { sendAnalytics } from "~lib/analytics"
import { formatTime, PERMIT_LENGTH, PERMIT_WAIT_TIME } from "~lib/constants"
import permit, { type Permit } from "~lib/permit"

// Using formatTime from constants.ts

function permitToWaitTime(permit: Permit): {
  hours: number
  minutes: number
  seconds: number
} {
  // Calculate the remaining wait time in hours, minutes and seconds
  const now = Date.now()
  const diff = Math.max(0, permit.start - now)
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds }
}

interface WaitTimerProps {
  onCancel: () => void
  onComplete: () => void
  scale: string
}

function WaitTimer({ onCancel, onComplete, scale }: WaitTimerProps) {
  const [currentPermit, setCurrentPermit] = useState<Permit | null>(
    permit.get()
  )
  const [waitTime, setWaitTime] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(currentPermit ? permitToWaitTime(currentPermit) : null)
  const domain = document.location.hostname

  // Using permit constants from constants.ts

  // Create a permit if none exists
  useEffect(() => {
    if (!currentPermit) {
      permit.createIfNone()
      setCurrentPermit(permit.get())
    }
  }, [])

  // Set up timer to update the wait time display
  useEffect(() => {
    if (!currentPermit) return

    const id = window.setInterval(() => {
      const newWaitTime = permitToWaitTime(currentPermit)
      setWaitTime(newWaitTime)

      // If wait time has expired, allow the purchase
      if (permit.isValid()) {
        clearInterval(id)

        // Track when the waiting period completes
        sendAnalytics("enforce_wait_period_completed", {
          domain: domain,
          waitDuration: Date.now() - (currentPermit.start - PERMIT_WAIT_TIME)
        })

        onComplete()
      }
    }, 1000)

    return () => {
      if (id) clearInterval(id)
    }
  }, [currentPermit])

  const handleStartWaitTimer = () => {
    permit.createIfNone()
    setCurrentPermit(permit.get())
    sendAnalytics("enforce_wait_timer_started", {
      domain: domain,
      waitTime: PERMIT_WAIT_TIME,
      permitLength: PERMIT_LENGTH
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wait Before Purchasing</span>
          <Badge variant="outline" className="ml-2">
            {domain}
          </Badge>
        </CardTitle>
        <CardDescription>
          Taking time before making a purchase helps reduce impulsive buying
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {!currentPermit || currentPermit.end < Date.now() ? (
          <div className="text-center">
            <p className="mb-4">
              Starting a wait timer for <strong>{domain}</strong> helps you make
              more conscious purchasing decisions.
            </p>
            <Button onClick={handleStartWaitTimer}>Start Wait Timer</Button>
          </div>
        ) : Date.now() < currentPermit.start ? (
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-100 rounded-lessmd">
                <div className="text-3xl font-bold">{waitTime?.hours || 0}</div>
                <div className="text-sm text-slate-500">Hours</div>
              </div>
              <div className="p-3 bg-slate-100 rounded-lessmd">
                <div className="text-3xl font-bold">
                  {waitTime?.minutes || 0}
                </div>
                <div className="text-sm text-slate-500">Minutes</div>
              </div>
              <div className="p-3 bg-slate-100 rounded-lessmd">
                <div className="text-3xl font-bold">
                  {waitTime?.seconds || 0}
                </div>
                <div className="text-sm text-slate-500">Seconds</div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600">
              Please wait before completing your purchase on{" "}
              <strong>{domain}</strong>. This waiting period helps you make a
              more thoughtful decision. You can safely close this window; the
              timer will continue to run.
            </p>
            <div className="flex justify-between gap-4 mt-2 w-full">
              <Button variant="outline" className="w-full" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={!permit.isValid()}>
                Continue with Purchase
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">
              Your wait time for <strong>{domain}</strong> has elapsed. You may
              proceed with your purchase.
            </p>
            <Button onClick={onComplete}>Continue with Purchase</Button>
          </div>
        )}

        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={(value) => {
            if (value) {
              sendAnalytics("enforce_wait_info_expanded", {
                domain: domain
              })
            }
          }}>
          <AccordionItem value="info">
            <AccordionTrigger className="text-sm">
              How does the wait timer work?
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm text-slate-600">
                <p>
                  <strong>Purchase Permits</strong> are domain-specific waiting
                  periods that help you avoid impulsive purchases. Each website
                  you shop at has its own permit.
                </p>

                <div className="bg-slate-50 p-3 rounded-lessmd space-y-2">
                  <p className="font-medium">When you start a wait timer:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      You'll need to wait{" "}
                      <strong>{formatTime(PERMIT_WAIT_TIME)}</strong> before
                      being able to purchase
                    </li>
                    <li>
                      After the waiting period, you'll have a{" "}
                      <strong>{formatTime(PERMIT_LENGTH)}</strong> window to
                      complete your purchase
                    </li>
                    <li>
                      This permit only applies to <strong>{domain}</strong>
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
    </>
  )
}

type EnforceWaitProps = {
  onComplete: () => void
}

export function EnforceWait({ onComplete }: EnforceWaitProps) {
  const { close, scale } = useModal()

  useEffect(() => {
    sendAnalytics("enforce_wait_modal_shown", {
      domain: document.location.hostname,
      permitExists: !!permit.get(),
      permitIsValid: permit.isValid(),
      timeLeft: permit.get() ? permit.get().end - Date.now() : -1
    })
  })

  const handleComplete = () => {
    sendAnalytics("enforce_wait_completed", {
      domain: document.location.hostname,
      permitActive: permit.isValid()
    })
    close()
    onComplete()
  }

  const handleCancel = () => {
    sendAnalytics("enforce_wait_canceled", {
      domain: document.location.hostname,
      permitActive: permit.get() ? Date.now() >= permit.get()!.start : false,
      waitCompleted: permit.isValid()
    })
    close()
  }

  return (
    <WaitTimer
      onCancel={handleCancel}
      onComplete={handleComplete}
      scale={scale}
    />
  )
}
