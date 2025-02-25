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
  apikey: string;
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
    apikey: import.meta.env.VITE_ANALYTICS_SECRET || "",
  };
  const URL = import.meta.env.VITE_ANALYTICS_URL || "";
  navigator.sendBeacon(URL,JSON.stringify(data));
}