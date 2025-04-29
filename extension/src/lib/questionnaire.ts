import { PersistentValue } from "~lib/utils"

type QuestionaryState = {
    question: number;
    finished: boolean;
    answers: Record<string, string | string[]>;
}
  
// Only show if user has seen intervention. Wait 24 hours before 
  
export const questionnarieState = new PersistentValue<QuestionaryState>("questionnarie-state",{
    question: -1, // Starts at welcome page
    finished: false,
    answers: {},
});
  