import { PersistentValue } from "~lib/utils"

type QuestionaryState = {
    question: number;
    finished: boolean;
    haveSeen: boolean;         // Flag indicating if user has seen the extension
    haveAnswered: boolean;     // Flag indicating if user has answered the survey
    answers: Record<string, string | string[]>;
    interventionFirstSeen?: number;
    lastPrompted?: number;     // Timestamp when user was last prompted
}
  
// The control flow follows this pattern:
// 1. Check if user has seen the extension (haveSeen)
//    - If yes, check if they have answered the questionnaire (haveAnswered)
//      - If yes, do nothing
//      - If no, prompt with survey
//    - If no or maybe, ask user "Have you seen?"
//      - If yes, prompt with survey
//      - If no, wait until user has seen intervention + 24 hours, then prompt
  
export const questionnarieState = new PersistentValue<QuestionaryState>("questionnarie-state4",{
    question: -1, // Starts at welcome page
    finished: false,
    haveSeen: false, // Default to not seen
    haveAnswered: false, // Default to not answered
    answers: {},
    lastPrompted: undefined,
});
  