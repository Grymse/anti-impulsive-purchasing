import { useMemo } from "react";
import { questions } from "./surveySetup";
import { useSurvey } from "./useSurvey";

const requiredQuestions = new Set(questions.filter(q => q?.required).map(q => q?.id ?? 0));

export default function ProgressBar() {
  const {answers} = useSurvey();

  const progress = useMemo(() => {
    const answerRequiredQuestions = [...answers.keys()].filter(a => requiredQuestions.has(a)).length;
    return answerRequiredQuestions / requiredQuestions.size * 100;
  }, [answers]);

  return <div className="pointer-events-none absolute w-[100dvw] h-[100dvh] overflow-hidden">
    <div className="bg-primary absolute w-[100dvw] h-1.5 bottom-0 opacity-0 sm:opacity-100" style={{transform: `translateX(${progress-100}%)`}}  />
    <div className="bg-primary absolute w-1 h-[100dvh] opacity-100 sm:opacity-0" style={{transform: `translateY(${progress-100}%)`}} />
  </div>
}