import { getSessionId, getUserId } from "./analytics";

/**
 * Allows sending error reports to the server
 * @param area Where did the error happen
 * @param payload The error report
 * @returns The response from the server
 */
export async function sendErrorReport(area: string, e: Error | any) {
    const error = e.message + "\n\n" + e.stack;
    const apiKey = process.env.PLASMO_PUBLIC_SECRET
    const url = process.env.PLASMO_PUBLIC_ERRORS_URL + "?apikey=" + apiKey;
    const headers = {
        "apikey": apiKey,
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    };

    const user_id = await getUserId();
    const session_id = await getSessionId();
    const body = JSON.stringify({ error, user_id, session_id, url, area });

    if (process.env.NODE_ENV === "development") {
        console.error(`${area} - ${error}`);
        return;
    }

    fetch(url, { method: "POST", headers, body }).then(() => console.log("sent error to server")).catch(console.error);
}