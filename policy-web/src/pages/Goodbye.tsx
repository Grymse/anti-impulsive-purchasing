import { sendAnalytics, sendQuestionaryResponse } from "../lib/analytics";
import Header from "@/components/Header";
import MainLogo from "@/components/MainLogo";
import Text from "@/components/Text";
import { useEffect, useRef } from "react";
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

const reasons = [
    "Not Useful",
    "Not Working",
    "Too Annoying",
    "Privacy Concerns",
    "Too Many Bugs",
    "Other",
];

export default function GoodbyePage() {
    const [feedback, setFeedback] = useState("");
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const userID = useRef(new URLSearchParams(window.location.search).get(
        "userid"
      ));

    useEffect(() => {
      if (userID) {
        sendAnalytics("uninstall", undefined, userID.current ?? "none");
      }
    }, [userID]);


    const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedback(e.target.value);
  };

  const handleButtonClick = (reason: string) => {
      if (userID.current) {
          sendQuestionaryResponse(userID.current, "Reason for Leaving", reason, "uninstall");
          setButtonsDisabled(true);
      }
  };

  const handleSubmitFeedback = () => {
      if (feedback && userID.current) {
          sendQuestionaryResponse(userID.current, "Feedback", feedback, "uninstall");
          alert("Thank you for your feedback!");
          window.location.href = "https://www.google.com";
      } else {
          alert("Please provide your feedback before continuing.");
      }
  };

    function deleteData() {
        if (userID.current) {
          const confirmed = window.confirm("Are you sure you want to delete the data - Everything is anonymous and it is intended to improve our research on minimizing impulsive purchasing online?");
          if (confirmed) {
            sendAnalytics("delete-data", undefined, userID.current);
            alert("Data has been deleted successfully.");
          }
        }
      }
  
    return (
      <div className="max-w-2xl space-y-2">
        <div className="flex flex-col items-center justify-center mb-8 space-y-8">
          {/* <div className="mt-16 relative">
            <MainLogo />
          </div> */}
          
          <div className="text-center">
            <Header
              variant="h1" 
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
            >
              We're sad to see you leave
            </Header>
            <Text className="text-xl mt-2 text-muted-foreground">
              Your feedback helps us improve
            </Text>
          </div>
  
          <Card className="w-full">
            <CardHeader>
              <Header variant="h3" className="text-center">
                What is the reason for uninstalling?
              </Header>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reasons.map((reason) => (
                      <Button
                      variant="secondary"
                      onClick={() => handleButtonClick(reason)}
                      disabled={buttonsDisabled}
                      >
                      {reason}
                      </Button>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <Header variant="h3" className="text-center">
                Please share your feedback
              </Header>
            </CardHeader>
            <CardContent>
              <Textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Please specify the reason for uninstalling..."
                rows={5}
              />
            </CardContent>
            <CardFooter className="gap-4">
              <Button
                variant="outline"
                className="w-full"
              >
                <Plus/>
                <a href="https://chromewebstore.google.com/detail/less/kcgblchgejkpnemehaojecgbamdiacml" className="flex items-center">
                  Reinstall Extension
                </a>
              </Button>
            <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
                onClick={handleSubmitFeedback}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Continue
              </Button>
            </CardFooter>
          </Card>
  
          <div className="mt-6 text-center">
            <Text className="text-sm text-muted-foreground">
              Thank you for trying Less. Hope to see you soon!
            </Text>
            <Text className="text-sm text-muted-foreground">
              If you wish to delete your data please <span onClick={deleteData} className="underline text-destructive hover:text-primary cursor-pointer">click here</span>.
            </Text>
          </div>
        </div>
      </div>
    );
  }