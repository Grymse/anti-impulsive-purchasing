type AnalyticsPayloads = {
  'uninstall': undefined;
};
type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: string;
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

  const URL = import.meta.env.VITE_SUPABASE_URL + "analytics?apikey=" + import.meta.env.VITE_ANALYTICS_SECRET

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  });
}