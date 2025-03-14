type AnalyticsPayloads = {
  'uninstall': undefined;
  'delete-data': undefined;
  'on-onboarding': undefined;
  'from-directs': string;
  'from-directs-cta': string;
};

type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: string;
};
type QuestionaryResponse = {
  user_id: string;
  question: string;
  answer: string;
  questionary: string;
};

export async function sendAnalytics<T extends keyof AnalyticsPayloads>(
  type: T,
  payload: AnalyticsPayloads[T],
  userID: string,
) {
  const data: AnalyticsEvent = {
    type,
    url: window ? window.location.hostname + window.location.pathname : "",
    payload: JSON.stringify(payload),
    user_id: userID,
    session_id: "none",
    created_at: new Date().toISOString(),
  };

  console.log("Send analytics");
  const URL = import.meta.env.VITE_SUPABASE_URL + "analytics?apikey=" + import.meta.env.VITE_ANALYTICS_SECRET

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function sendQuestionaryResponse (
  userid : string,
  question : string,
  answer : string,
  questionary : string 
) {
  const data: QuestionaryResponse = {
    user_id: userid,
    question: question,
    answer: answer,
    questionary: questionary
  };
  const URL = import.meta.env.VITE_SUPABASE_URL + "questionary?apikey=" + import.meta.env.VITE_ANALYTICS_SECRET
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  });
}