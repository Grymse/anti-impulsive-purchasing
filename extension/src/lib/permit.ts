import { PersistentValue } from "./utils";

export type Permit = {
  start: number;
  end: number;
}
const PERMIT_LENGTH = parseInt(process.env.PLASMO_PUBLIC_PERMIT_LENGTH || "172800000"); // default: 2 days
const PERMIT_WAIT_TIME = parseInt(process.env.PLASMO_PUBLIC_PERMIT_WAIT_TIME || "86400000"); // default: 1 day
const PERMIT_ON_PAY_GRACE = parseInt(process.env.PLASMO_PUBLIC_PERMIT_ON_PAY_GRACE || "3000000"); // default: 10 minutes
const DOMAIN = document.location.hostname;
const LOCAL_STORAGE_KEY = DOMAIN + "-permit";
const permit = new PersistentValue<Permit>(LOCAL_STORAGE_KEY);

function get() : Permit | null {
    return permit.value;
}

function markAsUsed() {
    permit.value = {
        start: permit.value.start,
        end: Date.now() + PERMIT_ON_PAY_GRACE
    }
}

function createIfNone() {
    // Do nothing if the current permit has not expired
    if (permit.value && Date.now() < permit.value.end) return;

    permit.value = {
        start: Date.now() + PERMIT_WAIT_TIME,
        end: Date.now() + PERMIT_LENGTH + PERMIT_WAIT_TIME
    }
}
  
function isValid() : boolean {
    if (!permit.value) return false;
  
    const now = Date.now();
    const permitExpired = permit.value.end < now;
    const permitIsValid = permit.value.start < now && !permitExpired;
  
    return permitIsValid;
};

export default {
    get,
    markAsUsed,
    createIfNone,
    isValid,
};

