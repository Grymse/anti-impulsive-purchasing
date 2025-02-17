import type { ShoppingItem } from "./getters";
import { PersistentValue } from "./utils";

const SESSION_LENGTH = 1000 * 30; // 1000 * 60 * 15; // 30 minutes
export const consent = new PersistentValue<boolean>('content');

consent.onChange((value) => {
    sendAnalytics('consent', {allow: value});
});

export function removeData() {
    sendAnalytics('remove-data', undefined);
}

type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: string;
}

type AnalyticsPayloads = {
  'add-to-cart': undefined;
  'checkout': undefined;
  'place-order': ShoppingItem[];
  'page-view': undefined;
  'time-spent': {duration: number};
  'consent': {allow: boolean};
  'remove-data': undefined;
}

export async function sendAnalytics<T extends keyof AnalyticsPayloads>(type: T, payload: AnalyticsPayloads[T]) {
  if (type !== 'remove-data' && !consent.value) return;

  const data: AnalyticsEvent = {
    type,
    url: window.location.hostname+window.location.pathname,
    payload: JSON.stringify(payload),
    user_id: await getUserId(),
    session_id: await getSessionId(),
    created_at: new Date().toISOString(),
  }

  // Send the analytics data to the server
  console.log(`${data.type} - ${data.url} - ${data.payload}`);
  const URL = process.env.PLASMO_PUBLIC_ANALYTICS_URL + '?apikey=' + process.env.PLASMO_PUBLIC_ANALYTICS_SECRET;
  navigator.sendBeacon(URL,JSON.stringify(data));
}

type SessionID = {
  id: string;
  expires: number;
}

async function getSessionId(): Promise<string> {
  const unparsedSession = (await chrome.storage.local.get('session'))?.["session"];
  const session = JSON.parse(unparsedSession ?? "{}") as SessionID;

  // Create new ID if session is new or previous session has expired
  if(session.id === undefined || session.expires < Date.now()) {
    session.id = crypto.randomUUID();
  }

  // Extend the session expiration time
  session.expires = Date.now() + SESSION_LENGTH;

  await chrome.storage.local.set({session: JSON.stringify(session)});
  return session.id;
}

async function getUserId(): Promise<string> {
  const id = (await chrome.storage.local.get('userid'))?.["userid"];
  if(id) return id;

  const newId = crypto.randomUUID();
  chrome.storage.local.set({userid: newId});
  return newId;
}