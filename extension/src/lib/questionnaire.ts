import { PersistentValue } from "~lib/utils"

type QuestionaryState = {
    question: number;
    finished: boolean;
    notSeenExtension?: boolean;
    answers: Record<string, string | string[]>;
    interventionFirstSeen?: number;
}
  
// Only show if user has seen intervention. Wait 24 hours before 
  
export const questionnarieState = new PersistentValue<QuestionaryState>("questionnarie-state3",{
    question: -1, // Starts at welcome page
    finished: false,
    answers: {},
    notSeenExtension: undefined,
});
  