import React, { useEffect, useState } from "react"

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
//import { Progress } from "~components/ui/progress"
import { Textarea } from "~components/ui/textarea"
import { sendAnalytics } from "~lib/analytics"
import { settings } from "~lib/settings"
import Text from "~options/Text"

// Define the questions
type Question = {
  id: string
  question: string
  description?: string
  type: "rating" | "checkbox" | "textarea"
  options?: { value: string; label: string }[]
}

const questions: Question[] = [
  {
    id: "effectiveness_rating",
    question: "How effective has the waiting period been in helping you make more mindful purchasing decisions?",
    description: "On a scale from 1 to 7, with 1 being the least effective and 7 being the most effective",
    type: "rating"
  },
  {
    id: "workarounds",
    question: "Have you used any of the following methods to work around the waiting period?",
    description: "Select all options that apply to your behavior",
    type: "checkbox",
    options: [
      { value: "never", label: "I never tried to work around the waiting period" },
      { value: "other_device", label: "Used another device without the extension" },
      { value: "other_browser", label: "Switched to a different browser" },
      { value: "disabled", label: "Temporarily disabled the extension" },
      { value: "private_mode", label: "Used private/incognito browsing" },
      { value: "different_site", label: "Purchased from a website not covered by the extension" },
      { value: "other", label: "Used other methods not listed here" }
    ]
  },
  {
    id: "behavioral_impact",
    question: "How has the waiting period changed your shopping behavior?",
    description: "Select all that apply to you",
    type: "checkbox",
    options: [
      { value: "more_mindful", label: "I'm more mindful about what I purchase" },
      { value: "fewer_purchases", label: "I make fewer impulse purchases" },
      { value: "no_change", label: "My shopping behavior hasn't changed" },
      { value: "added_friction", label: "It adds friction but doesn't change my decisions" },
      { value: "frustration", label: "It causes frustration without benefit" },
      { value: "more_planned", label: "I plan my purchases more in advance" }
    ]
  },
  {
    id: "general_opinions",
    question: "What do you think about the following aspects of the extension?",
    description: "Select all that apply to your experience",
    type: "checkbox",
    options: [
      { value: "timer_too_short", label: "The 24-hour waiting period is too short" },
      { value: "timer_too_long", label: "The 24-hour waiting period is too long" },
      { value: "timer_good", label: "The 24-hour waiting period is just right" },
      { value: "intervention_timing", label: "The timing of the intervention (at checkout) works well" },
      { value: "want_more_features", label: "I would like more intervention features" },
      { value: "ui_good", label: "The user interface is clear and easy to use" }
    ]
  },
  {
    id: "open_feedback",
    question: "Do you have any other feedback or suggestions for improving the extension?",
    type: "textarea"
  }
]

export function QuestionnaireModal() {
  const { close, scale } = useModal()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showThankYou, setShowThankYou] = useState(false)
  const [textareaValue, setTextareaValue] = useState("")
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([])
  
  // Add event listener to capture and block click events bubbling up
  useEffect(() => {
    if (!showThankYou) {
      // Create a keydown handler for escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          e.preventDefault();
          // Prevent Escape key from closing the modal
          return false;
        }
      };
      
      // Intercept the backdrop click by capturing all clicks on the body
      const handleClick = (e: MouseEvent) => {
        // Check if click was on the modal background (which has id popover-questionary)
        if ((e.target as HTMLElement).id === "popover-questionary") {
          e.stopPropagation();
          e.preventDefault();
          
          // Visual feedback that the modal can't be closed
          const modalCard = document.querySelector(".bg-white.max-w-xl") as HTMLElement;
          if (modalCard) {
            // Flash red border
            modalCard.style.transition = "box-shadow 0.2s ease-in-out";
            modalCard.style.boxShadow = "0 0 0 4px rgba(220, 38, 38, 0.5)";
            setTimeout(() => {
              modalCard.style.boxShadow = "";
            }, 300);
          }
          
          return false;
        }
      };
      
      // Use capturing phase to intercept events before they reach their targets
      document.addEventListener("click", handleClick, true);
      document.addEventListener("keydown", handleKeyDown, true);
      
      return () => {
        document.removeEventListener("click", handleClick, true);
        document.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, [showThankYou]);

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

  // Reset selections when changing questions
  useEffect(() => {
    const question = questions[currentQuestion]
    if (question) {
      setSelectedRating(answers[question.id] as string || null)
      setSelectedCheckboxes(
        Array.isArray(answers[question.id]) 
          ? answers[question.id] as string[] 
          : []
      )
    }
  }, [currentQuestion, answers])

  const handleContinue = () => {
    const question = questions[currentQuestion]
    const minimumWordCount = 5;
    
    if (question.type === "rating" && selectedRating) {
      // Save rating answer
      setAnswers((prev) => ({ ...prev, [question.id]: selectedRating }))
      sendAnalytics("answer", { question: question.id, answer: selectedRating })
      moveToNextQuestion()
    } 
    else if (question.type === "checkbox" && selectedCheckboxes.length > 0) {
      // Save checkbox answers
      setAnswers((prev) => ({ ...prev, [question.id]: selectedCheckboxes }))
      // For analytics, join the array into a comma-separated string
      sendAnalytics("answer", { 
        question: question.id, 
        answer: selectedCheckboxes.join(",") 
      })
      moveToNextQuestion()
    }
    else if (question.type === "textarea") {
      const wordCount = countWords(textareaValue);
      if (wordCount >= minimumWordCount) {
        setAnswers((prev) => ({ ...prev, [question.id]: textareaValue }))
        sendAnalytics("answer", { question: question.id, answer: textareaValue })
        moveToNextQuestion()
      }
    }
  }

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
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
        return prev.filter(v => v !== value)
      } else {
        // Special handling for "never" option
        if (value === "never") {
          // If selecting "never", clear all other selections
          return ["never"]
        } else {
          // If selecting any other option, remove "never" if it's selected
          const filteredSelections = prev.filter(v => v !== "never")
          return [...filteredSelections, value]
        }
      }
    })
  }

  const renderRatingQuestion = (question: Question) => {
    return (
      <div className="space-y-4">
        <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
          <Text className="text-wrap text-base leading-relaxed">
            {question.description}
          </Text>
        </div>
        <div className="flex justify-between items-center gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
            <div
              key={rating}
              onClick={() => handleRatingSelect(rating.toString())}
              className={`flex flex-col items-center cursor-pointer p-3 rounded-lessmd transition-colors ${
                selectedRating === rating.toString()
                  ? "bg-lessprimary text-white"
                  : "bg-white hover:bg-lessaccent/5 border border-lessaccent/20"
              }`}>
              <span className="text-xl font-semibold">{rating}</span>
              <span className="text-xs mt-1">
                {rating === 1 ? "Least" : rating === 7 ? "Most" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCheckboxQuestion = (question: Question) => {
    return (
      <div className="space-y-3">
        {question.description && (
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20 mb-4">
            <Text className="text-wrap text-base leading-relaxed">
              {question.description}
            </Text>
          </div>
        )}
        {question.options.map((option) => (
          <div
            key={option.value}
            className={`p-3 rounded-lg border cursor-pointer ${
              selectedCheckboxes.includes(option.value)
                ? "border-lessprimary bg-lessaccent/10"
                : "border-lessaccent/20 bg-white hover:bg-lessaccent/5"
            }`}
            onClick={() => handleCheckboxToggle(option.value)}>
            <Label className="flex items-center gap-2 cursor-pointer">
              <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                selectedCheckboxes.includes(option.value)
                  ? "border-lessprimary bg-lessprimary text-white"
                  : "border-primary"
              }`}>
                {selectedCheckboxes.includes(option.value) && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span>{option.label}</span>
            </Label>
          </div>
        ))}
      </div>
    )
  }

  const renderTextareaQuestion = (question: Question) => {
    const wordCount = countWords(textareaValue);
    const minimumWordCount = 5;
    const isValid = wordCount >= minimumWordCount;

    return (
      <div className="space-y-4">
        <Textarea 
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          placeholder="Type your feedback here (minimum 5 words)..."
          className={`min-h-[120px] ${!isValid && textareaValue.trim() !== "" ? "border-orange-400" : ""}`}
        />
        <div className="flex justify-between items-center text-sm">
          <div className="text-lessmuted-foreground">
            {textareaValue.trim() !== "" && (
              <span>Please write at least {minimumWordCount} words for your feedback.</span>
            )}
          </div>
          <div className={`font-medium ${isValid ? "text-green-600" : "text-lessmuted-foreground"}`}>
            {wordCount} / {minimumWordCount} words
          </div>
        </div>
      </div>
    )
  }

  const renderProgressBar = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="mb-5">
        <div className="flex justify-between text-sm text-lessmuted-foreground mb-1">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-lessprimary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const renderQuestion = (question: Question) => {
    const wordCount = countWords(textareaValue);
    const minimumWordCount = 5;
    
    const isButtonDisabled = 
      (question.type === "rating" && !selectedRating) ||
      (question.type === "checkbox" && selectedCheckboxes.length === 0) ||
      (question.type === "textarea" && wordCount < minimumWordCount);

    return (
      <>
        <CardHeader className="pb-2">
          {renderProgressBar()}
          <CardTitle className="text-2xl font-bold text-lessprimary">
            Question {currentQuestion + 1}/{questions.length}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {question.question}
          </CardDescription>
          <div className="text-xs text-lessmuted-foreground mt-1">
            Please complete the questionnaire to proceed.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === "rating" && renderRatingQuestion(question)}
          {question.type === "checkbox" && renderCheckboxQuestion(question)}
          {question.type === "textarea" && renderTextareaQuestion(question)}
        </CardContent>
        <CardFooter className="justify-between items-center pt-2">
          <div className="flex gap-2">
            {currentQuestion > 0 && (
              <CountdownButton
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                variant="outline"
                size="md"
                className="font-medium">
                Previous
              </CountdownButton>
            )}
          </div>
          
          <CountdownButton
            onClick={handleContinue}
            variant="default"
            size="md"
            className="font-medium"
            disabled={isButtonDisabled}>
            Continue
          </CountdownButton>
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
            Your feedback has been recorded
          </CardDescription>
          <div className="text-xs text-green-600 mt-1">
            You can now close this modal by clicking the button below or anywhere outside.
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-lessaccent/10 p-4 rounded-lg border border-lessaccent/20">
            <Text className="text-wrap text-base leading-relaxed">
              Thank you for taking the time to complete this questionnaire. Your feedback will help us improve the Less extension and make it more effective for you and other users.
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

  return showThankYou ? renderThankYou() : renderQuestion(questions[currentQuestion]);
}