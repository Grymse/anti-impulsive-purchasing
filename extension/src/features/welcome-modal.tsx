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
                sendAnalytics("welcome-modal-seen", undefined);
            }
        }
    },[]);
  return (
    <>
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-lessprimary flex items-center gap-2">
            <span className="text-2xl">👋</span> Welcome to Less!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            You are on your journey to buy less online
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              We are doing some experiments, to see what works best for you. You might not see me for a while, but trust in me, I'll help you out when you most need it!
            </Text>
          </div>
          <div className="flex items-center gap-2 text-lessmuted-foreground text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lessprimary">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>Less helps you make mindful purchasing decisions</span>
          </div>
        </CardContent>
        <CardFooter className="justify-between items-center pt-2">
          <div className="text-sm text-lessmuted-foreground">
            Start by browsing normally
          </div>
          <CountdownButton 
            countdown={5000} 
            onClick={close} 
            variant="default" 
            size="lg" 
            className="font-medium"
          >
            Let's Go!
          </CountdownButton>
        </CardFooter>
      </>
  )
}