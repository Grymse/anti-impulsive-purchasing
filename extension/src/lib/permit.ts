import { PersistentValue } from "./utils";
import { PERMIT_LENGTH, PERMIT_WAIT_TIME, PERMIT_ON_PAY_GRACE } from "./constants";

export type Permit = {
  start: number;
  end: number;
}

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

