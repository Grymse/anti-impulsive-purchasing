import type { ShoppingItem } from "./getters";
import { settings } from "./settings";

const SESSION_LENGTH = 1000 * 30; // 1000 * 60 * 15; // 30 minutes

export function removeData() {
  sendAnalytics("remove-data", undefined);
}

type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: string;
  apikey: string;
};

type AnalyticsPayloads = {
  "add-to-cart": undefined;
  "checkout": undefined;
  "place-order": ShoppingItem[];
  "page-view": undefined;
  "time-spent": { duration: number };
  "active": boolean;
  "remove-data": undefined;
  "cancel": undefined;
  "answer": { question: string; answer: string };
  'uninstall': undefined;
  "visualize_alternatives_continue": { amount: number; from: string };
  "visualize_alternatives_cancel": { amount: number; from: string };
  "visualize_alternatives_select_option": { amount: number; option: string };
  "visualize_alternatives_back": { amount: number; from: string };
  "corporate_agenda_select_category": { category: string };
  "corporate_agenda_collapse_category": { category: string };
  "corporate_agenda_acknowledge": { category: string };
  "corporate_agenda_continue": { acknowledged: boolean };
  "corporate_agenda_cancel": undefined;
};

export async function sendAnalytics<T extends keyof AnalyticsPayloads>(
  type: T,
  payload: AnalyticsPayloads[T],
) {
  if (!(["active", "remove-data"].includes(type)) && !settings.value.active) return;

  const data: AnalyticsEvent = {
    type,
    url: window ? window.location.hostname + window.location.pathname : "",
    payload: JSON.stringify(payload),
    user_id: await getUserId(),
    session_id: await getSessionId(),
    created_at: new Date().toISOString(),
    apikey: process.env.PLASMO_PUBLIC_ANALYTICS_SECRET,
  };

  if (process.env.NODE_ENV === "development") {
    console.log(`${data.type} - ${data.url} - ${data.payload}`);
  }

  // Send the analytics data to the server
  const URL = process.env.PLASMO_PUBLIC_ANALYTICS_URL
  /* fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }); */
  navigator.sendBeacon(URL,JSON.stringify(data));
}

type SessionID = {
  id: string;
  expires: number;
};

async function getSessionId(): Promise<string> {
  const unparsedSession = (await chrome.storage.local.get("session"))
    ?.["session"];
  const session = JSON.parse(unparsedSession ?? "{}") as SessionID;

  // Create new ID if session is new or previous session has expired
  if (session.id === undefined || session.expires < Date.now()) {
    session.id = crypto.randomUUID();
  }

  // Extend the session expiration time
  session.expires = Date.now() + SESSION_LENGTH;

  await chrome.storage.local.set({ session: JSON.stringify(session) });
  return session.id;
}

export async function getUserId(): Promise<string> {
  const id = (await chrome.storage.local.get("userid"))?.["userid"];
  if (id) return id;

  const newId = crypto.randomUUID();
  chrome.storage.local.set({ userid: newId });
  return newId;
}
