import { useEffect } from 'react'
import { useModal } from '~components/Modal'
import { CountdownButton } from '~components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~components/ui/card'
import { sendAnalytics } from '~lib/analytics'
import { settings } from '~lib/settings'
import Text from '~options/Text'

export function WelcomeModal() {
    const {close, scale} = useModal();
    useEffect(() => {
        const openTime = new Date().getTime();
        return () => {
            if (2000 < new Date().getTime() - openTime) {
                settings.update( s => {return {...s, hasSeenWelcomeModal: true}});
                console.log("settings", settings.value);
                sendAnalytics("welcome-modal-seen", undefined);
            }
        }
    },[]);
  return (
    <>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Less!</CardTitle>
          <CardDescription>
            You are on your journey to buy less online
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-wrap">
            We are doing some experiments, to see what works best for you. You might not see me for a while, but trust in me, I'll help you out when you most need it!
          </Text>
        </CardContent>
        <CardFooter className="justify-end">
            <CountdownButton countdown={5000} onClick={close}>Thanks!</CountdownButton>
        </CardFooter>
      </>
  )
}