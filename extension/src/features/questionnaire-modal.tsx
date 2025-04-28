import { useEffect, useState } from "react"

import { useModal } from "~components/Modal"
import { CountdownButton } from "~components/ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Label } from "~components/ui/label"
import { sendAnalytics } from "~lib/analytics"
import { settings } from "~lib/settings"
import Text from "~options/Text"

// Define the questions
type Question = {
  id: string
  question: string
  options: { value: string; label: string }[]
}

const questions: Question[] = [
  {
    id: "shopping_frequency",
    question: "How often do you shop online?",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "rarely", label: "Rarely" }
    ]
  },
  {
    id: "impulse_awareness",
    question: "How aware are you of your impulse shopping habits?",
    options: [
      { value: "very_aware", label: "Very aware" },
      { value: "somewhat_aware", label: "Somewhat aware" },
      { value: "not_very_aware", label: "Not very aware" },
      { value: "not_aware", label: "Not aware at all" }
    ]
  },
  {
    id: "struggle_control",
    question: "Do you struggle with controlling your online shopping?",
    options: [
      { value: "yes_often", label: "Yes, often" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ]
  }
]

export function QuestionnaireModal() {
  const { close, scale } = useModal()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    const openTime = new Date().getTime()
    return () => {
      if (2000 < new Date().getTime() - openTime) {
        settings.update((s) => {
          return { ...s, hasSeenQuestionnaireModal: true }
        })
      }
    }
  }, [])

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    
    // Send analytics for this answer
    sendAnalytics("answer", { question: questionId, answer })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowThankYou(true)
    }
  }

  const renderQuestion = (question: Question) => {
    return (
      <>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-lessprimary">
            Question {currentQuestion + 1}/{questions.length}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {question.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option) => (
              <div
                key={option.value}
                className="bg-white p-3 rounded-lg border border-lessaccent/20 hover:bg-lessaccent/5 cursor-pointer"
                onClick={() => handleAnswer(question.id, option.value)}>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                    {answers[question.id] === option.value && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-between items-center pt-2">
          <div className="text-sm text-lessmuted-foreground">
            Your answers help us understand your needs better
          </div>
          {currentQuestion > 0 && (
            <CountdownButton
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="outline"
              size="md"
              className="font-medium">
              Previous
            </CountdownButton>
          )}
        </CardFooter>
      </>
    )
  }

  const renderThankYou = () => {
    return (
      <>
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-lessprimary flex items-center gap-2">
            <span className="text-2xl">🎉</span> Thank You!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your responses have been recorded
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              Thank you for taking the time to complete this questionnaire. Your answers will help us improve your experience with Less.
            </Text>
          </div>
        </CardContent>
        <CardFooter className="justify-end items-center pt-2">
          <CountdownButton
            countdown={3000}
            onClick={close}
            variant="default"
            size="lg"
            className="font-medium">
            Continue
          </CountdownButton>
        </CardFooter>
      </>
    )
  }

  return showThankYou ? renderThankYou() : renderQuestion(questions[currentQuestion])
}