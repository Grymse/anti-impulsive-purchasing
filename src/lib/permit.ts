
export type Permit = {
  start: number;
  end: number;
}


const PERMIT_LENGTH = 10_000 //1000 * 60 * 60 * 24 * 3; // 3 days
const PERMIT_WAIT_TIME = 5_000 //1000 * 60 * 60 * 24 * 2; // 2 days
const PERMIT_ON_PAY_GRACE = 1_000 * 60 * 10 // 1000 * 60 * 10; // 10 minutter
const DOMAIN = document.location.hostname;
const LOCAL_STORAGE_KEY = DOMAIN + "-permit";
let permit : Permit | null = null;

async function init() {
    // Load the permit from local storage
    const loadedObject = (await chrome.storage.local.get(LOCAL_STORAGE_KEY)) as Record<string, Permit>;
    permit = loadedObject[LOCAL_STORAGE_KEY] ?? null;
}

function get() : Permit | null {
    return permit;
}


function markAsUsed() {
    permit = {
        start: permit.start,
        end: Date.now() + PERMIT_ON_PAY_GRACE
    }
    
    chrome.storage.local.set({[LOCAL_STORAGE_KEY]: permit});
}

  
function createIfNone() {
    // Do nothing if the current permit has not expired
    if (permit && Date.now() < permit.end) return;

    permit = {
        start: Date.now() + PERMIT_WAIT_TIME,
        end: Date.now() + PERMIT_LENGTH + PERMIT_WAIT_TIME
    }
    
    chrome.storage.local.set({[LOCAL_STORAGE_KEY]: permit});
}
  
function isValid() : boolean {
    if (!permit) return false;
  
    const now = Date.now();
    const permitExpired = permit.end < now;
    const permitIsValid = permit.start < now && !permitExpired;
  
    return permitIsValid;
};

export default {
    init,
    get,
    markAsUsed,
    createIfNone,
    isValid,
};

