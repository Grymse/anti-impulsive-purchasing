import React, { useEffect, useState } from "react"

import { useModal } from "~components/Modal"
import { Button } from "~components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Label } from "~components/ui/label"
import { Textarea } from "~components/ui/textarea"
import { sendAnalytics, sendQuestionaryResponse } from "~lib/analytics"
import { questionnarieState } from "~lib/questionnaire"
import Text from "~options/Text"

// Define the questions
type Question = {
  id: string
  question: string
  description?: string
  type: "rating" | "checkbox" | "textarea"
  options?: string[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: "effectiveness_rating",
    question:
      "How effective has the waiting period been in helping you make more mindful purchasing decisions?",
    description: "Rate on scale from 1 (Not effective) to 7 (Very effective).",
    type: "rating",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    required: true
  },
  {
    id: "alternative_methods",
    question:
      "How often did you use alternative methods to make purchases during the waiting period?",
    type: "rating",
    options: ["Never", "Once", "Twice", "Multiple times"],
    required: true
  },
  {
    id: "workarounds",
    question:
      "Have you used any of the following methods to work around the waiting period?",
    description: "Select all options that apply to your behavior",
    type: "checkbox",
    options: [
      "None",
      "Used a different device (phone, tablet)",
      "Used incognito/private browsing",
      "Used a different browser",
      "Used in-store shopping",
      "Other"
    ],
    required: true
  },
  {
    id: "behavioral_impact",
    question: "Impact on your shopping behaviour?",
    description:
      "Which of the following sentences describes your behaviour change on the extension",
    type: "checkbox",
    options: [
      "None",
      "I became more selective about what I purchased",
      "I became more reflective about my purchases",
      "I abandoned a purchase due to the intervention",
      "I added more items to my cart during the waiting period",
      "I reduced time spent on shopping sites",
      "I planned out my purchases ahead of time"
    ],
    required: true
  },
  {
    id: "general_opinions",
    question: "Opinion on the extension",
    description:
      "Which of the following sentences describes your opinion on the extension?",
    type: "checkbox",
    options: [
      "None",
      "The intervention is frustrating",
      "Three hours is either too long or too short",
      "I would benefit from a less intrusive intervention",
      "The wait-time should be enforced earlier in the shopping process",
      "The intervention was easy to understand",
      "I would recommend this extension to a friend",
      "It intervened in an urgent situation",
      "I would like to choose affected websites"
    ],
    required: true
  },
  {
    id: "open_feedback",
    question:
      "Please share your thoughts and feelings on the experience of using this extension?",
    description: "Optional",
    type: "textarea",
    required: false
  }
]

export function QuestionnaireModal() {
  const { close } = useModal()
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnarieState.value.question
  ) // Start at -1 for the intro page

  useEffect(() => {
    sendAnalytics("questionary-popup", { startQuestion: currentQuestion })

    return () => {
      sendAnalytics("questionary-closed", {
        question: questionnarieState.value.question
      })
    }
  }, [])

  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    questionnarieState.value.answers
  )
  const [showThankYou, setShowThankYou] = useState(false)
  const [textareaValue, setTextareaValue] = useState("")
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([])

  useEffect(() => {
    questionnarieState.update((state) => {
      return {
        ...state,
        answers
      }
    })
  }, [answers])
  
  // When the questionnaire is finished, mark it as answered
  useEffect(() => {
    if (showThankYou) {
      questionnarieState.update((state) => {
        return {
          ...state,
          haveAnswered: true
        }
      })
    }
  }, [showThankYou])

  // Add event listener to capture and block click events bubbling up
  useEffect(() => {
    if (!showThankYou) {
      // Create a keydown handler for escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation()
          e.preventDefault()
          // Prevent Escape key from closing the modal
          return false
        }
      }

      // Intercept the backdrop click by capturing all clicks on the body
      const handleClick = (e: MouseEvent) => {
        // Check if click was on the modal background (which has id popover-questionary)
        if ((e.target as HTMLElement).id === "popover-questionary") {
          e.stopPropagation()
          e.preventDefault()

          // Visual feedback that the modal can't be closed
          const modalCard = document.querySelector(
            ".bg-white.max-w-xl"
          ) as HTMLElement
          if (modalCard) {
            // Flash red border
            modalCard.style.transition = "box-shadow 0.2s ease-in-out"
            modalCard.style.boxShadow = "0 0 0 4px rgba(220, 38, 38, 0.5)"
            setTimeout(() => {
              modalCard.style.boxShadow = ""
            }, 300)
          }

          return false
        }
      }

      // Use capturing phase to intercept events before they reach their targets
      document.addEventListener("click", handleClick, true)
      document.addEventListener("keydown", handleKeyDown, true)

      return () => {
        document.removeEventListener("click", handleClick, true)
        document.removeEventListener("keydown", handleKeyDown, true)
      }
    }
  }, [showThankYou])

  // Reset selections when changing questions
  useEffect(() => {
    const question = questions[currentQuestion]
    if (question) {
      setSelectedRating((answers[question.id] as string) || null)
      setSelectedCheckboxes(
        Array.isArray(answers[question.id])
          ? (answers[question.id] as string[])
          : []
      )
    }
  }, [currentQuestion, answers])

  const handleContinue = () => {
    const question = questions[currentQuestion]

    if (question.type === "rating" && selectedRating) {
      // Save rating answer
      setAnswers((prev) => ({ ...prev, [question.id]: selectedRating }))

      sendQuestionaryResponse(
        question.question,
        selectedRating,
        "extension-feedback"
      )

      moveToNextQuestion()
    } else if (question.type === "checkbox" && selectedCheckboxes.length > 0) {
      // Save checkbox answers
      setAnswers((prev) => ({ ...prev, [question.id]: selectedCheckboxes }))
      // For analytics, join the array into a comma-separated string
      sendQuestionaryResponse(
        question.question,
        selectedCheckboxes.join(","),
        "extension-feedback"
      )
      moveToNextQuestion()
    } else if (question.type === "textarea") {
      setAnswers((prev) => ({ ...prev, [question.id]: textareaValue }))
      sendQuestionaryResponse(
        question.question,
        textareaValue,
        "extension-feedback"
      )

      moveToNextQuestion()
    }
  }

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const newQuestionIndex = currentQuestion + 1
      setCurrentQuestion(newQuestionIndex)

      questionnarieState.update((state) => {
        if (currentQuestion < state.question) return state

        const finished = currentQuestion >= questions.length - 2

        if (!state.finished && finished)
          sendAnalytics("questionary-finished", undefined)

        return {
          ...state,
          question: newQuestionIndex,
          finished
        }
      })
    } else {
      setShowThankYou(true)
    }
  }

  const handleRatingSelect = (rating: string) => {
    setSelectedRating(rating)
  }

  const handleCheckboxToggle = (value: string) => {
    setSelectedCheckboxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value)
      } else {
        // Special handling for "never" option
        if (value === "never") {
          // If selecting "never", clear all other selections
          return ["never"]
        } else {
          // If selecting any other option, remove "never" if it's selected
          const filteredSelections = prev.filter((v) => v !== "never")
          return [...filteredSelections, value]
        }
      }
    })
  }

  const renderRatingQuestion = (question: Question) => {
    return (
      <div className="flex justify-between items-center gap-2 mt-4">
        {question.options.map((option) => (
          <Button
            key={option}
            className="w-full"
            onClick={() => handleRatingSelect(option)}
            variant={option === selectedRating ? "default" : "secondary"}
            size="icon">
            {option}
          </Button>
        ))}
      </div>
    )
  }

  const renderCheckboxQuestion = (question: Question) => {
    return (
      <div className="space-y-1">
        {" "}
        {question.options.map((option) => (
          <div
            key={option}
            className={`p-2 rounded-lg border cursor-pointer ${
              selectedCheckboxes.includes(option)
                ? "border-lessprimary bg-lessaccent/10"
                : "border-lessaccent/20 bg-white hover:bg-lessaccent/5"
            }`}
            onClick={() => handleCheckboxToggle(option)}>
            <Label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  selectedCheckboxes.includes(option)
                    ? "border-lessprimary bg-lessprimary text-white"
                    : "border-primary"
                }`}>
                {selectedCheckboxes.includes(option) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span>{option}</span>
            </Label>
          </div>
        ))}
      </div>
    )
  }

  const renderTextareaQuestion = () => (
    <Textarea
      value={textareaValue}
      onChange={(e) => setTextareaValue(e.target.value)}
      placeholder="Type your feedback here (minimum 5 words)..."
      className="min-h-[120px]"
    />
  )

  const ProgressBar = () => {
    // Skip intro page in progress calculation
    const questionIndex = currentQuestion < 0 ? 0 : currentQuestion
    const progress = ((questionIndex + 1) / questions.length) * 100

    return (
      <div className="mb-5">
        <div className="flex justify-between text-sm text-lessmuted-foreground mb-1">
          <span>
            Question {questionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-lessprimary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }


  const ThankYou = () => {
    return (
      <>
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-lessprimary flex items-center gap-2">
            <span className="text-2xl">🎉</span> Thank You!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your feedback has been recorded
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              Thank you for taking the time to complete this questionnaire. Your
              feedback will help us improve the Less extension and make it more
              effective for you and other users.
            </Text>
          </div>
        </CardContent>
        <CardFooter className="justify-end items-center pt-2">
          <Button
            onClick={close}
            variant="default"
            size="lg"
            className="font-medium">
            Continue
          </Button>
        </CardFooter>
      </>
    )
  }

  const IntroPage = () => {
    return (
      <>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-lessprimary">
            📝Feedback Questionnaire
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Help us improve your Less experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              Thank you for using the Less extension! We'd like to ask you a few
              questions about your experience to help us improve the extension.
              Your feedback is extremely valuable to us.
            </Text>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="bg-lessprimary rounded-full p-1 text-white mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-base">
                  Just one minute and five questions.
                </h3>
                <p className="text-sm text-lessmuted-foreground">
                  The questionnaire should only take 1 minute to complete.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-lessprimary rounded-full p-1 text-white mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-base">
                  Your privacy is protected.
                </h3>
                <p className="text-sm text-lessmuted-foreground">
                  We only collect anonymous feedback to improve the extension.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-lessprimary rounded-full p-1 text-white mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-base">Help future users</h3>
                <p className="text-sm text-lessmuted-foreground">
                  Your feedback will help shape the future of Less and help
                  others with mindful shopping.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end items-center pt-2">
          <Button
            onClick={() => setCurrentQuestion(0)}
            variant="default"
            size="lg"
            className="font-medium">
            Begin Questionnaire
          </Button>
        </CardFooter>
      </>
    )
  }
  
  // New component for asking if the user has seen the extension
  const AskUserHaveSeen = () => {
    function handleHaveSeen(hasSeen: boolean) {
      questionnarieState.update((state) => {
        return {
          ...state,
          haveSeen: hasSeen,
          lastPrompted: Date.now()
        }
      })
      
      if (hasSeen) {
        // User has seen the extension, proceed to questionnaire
        setCurrentQuestion(0)
      } else {
        // User has not seen the extension, record the current time 
        // as interventionFirstSeen to track 24hr wait period
        questionnarieState.update((state) => {
          return {
            ...state,
            interventionFirstSeen: Date.now()
          }
        })
        
        // Close the modal
        close()
      }
    }
    
    return (
      <>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-lessprimary">
            Quick Question
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Have you seen the Less extension in action?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              We'd like to know if you've encountered the Less extension's waiting period 
              when trying to make a purchase. This helps us understand your experience better.
            </Text>
          </div>
        </CardContent>
        <CardFooter className="justify-between items-center pt-2">
          <Button
            onClick={() => handleHaveSeen(false)}
            variant="outline"
            size="lg"
            className="font-medium">
            No, I haven't seen it yet
          </Button>
          <Button
            onClick={() => handleHaveSeen(true)}
            variant="default"
            size="lg"
            className="font-medium">
            Yes, I've seen it
          </Button>
        </CardFooter>
      </>
    )
  }

  if (showThankYou) return <ThankYou />
  if (currentQuestion === -2) return <AskUserHaveSeen />
  if (currentQuestion < 0) return <IntroPage />

  const question = questions[currentQuestion]

  const isButtonDisabled =
    (question.type === "rating" && !selectedRating) ||
    (question.type === "checkbox" && selectedCheckboxes.length === 0)

  return (
    <>
      <CardHeader className="pb-2"></CardHeader>
      <CardContent className="space-y-8">
        <ProgressBar />
        <div className="space-y-2">
          <Text className="font-semibold leading-tight">
            {question.question}
          </Text>
          {question.description && (
            <p className="text-lessmuted-foreground text-sm">
              {question.description}
            </p>
          )}
          {question.type === "rating" && renderRatingQuestion(question)}
          {question.type === "checkbox" && renderCheckboxQuestion(question)}
          {question.type === "textarea" && renderTextareaQuestion()}
        </div>
      </CardContent>
      <CardFooter className="justify-between items-center pt-2">
        <div className="flex gap-2">
          {currentQuestion > 0 ? (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="outline"
              className="font-medium">
              Previous
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(-1)}
              variant="outline"
              className="font-medium">
              Back to Intro
            </Button>
          )}
        </div>

        <Button
          onClick={handleContinue}
          variant="default"
          className="font-medium"
          disabled={isButtonDisabled}>
          {currentQuestion === questions.length - 1 ? "Finish" : "Continue"}
        </Button>
      </CardFooter>
    </>
  )
}
