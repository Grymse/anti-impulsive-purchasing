export function setTimeoutTimer(): void {

  const buyNowButton = getPurchaseButtons();
  console.log("Fetched this amount of buttons: ", buyNowButton.length);
  const oneHour = 24 * 60 * 60 * 1000; // One hour in milliseconds
  const now = Date.now();
  const expirationTime = now + oneHour;
  const parentDomain = getParentDomain(window.location.href);
  console.log("Fetched correct parent domain when setting timer! ", parentDomain);


  if (buyNowButton) {
    buyNowButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopImmediatePropagation(); // Block all other event handlers
        event.preventDefault(); // Prevent the default submission behavior
        chrome.storage.local.set({ expirationTime });
        console.log("Following information stored: ", expirationTime);
        chrome.storage.local.set({ [parentDomain]: expirationTime });
        console.log("Following information stored: ", parentDomain);
      });
    });
  }
}

export function getPurchaseButtons(): HTMLElement[] {
  const amazonButton = document.getElementById("buy-now-button");
  // Return the button in an array if found, otherwise an empty array
  return amazonButton instanceof HTMLElement ? [amazonButton] : [];
}

export function getParentDomain(domain : string): string { 
  const currentUrl =  domain;
  try {
    const url = new URL(currentUrl);
    return url.hostname;
  }
  catch (e) {
    return "Not a url: " + currentUrl;
  }
}

// Listen for requests from the popup:
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message from popup: ", request);  
  if (request.type === 'GET_TIMER') {
    // Option A: fetch from chrome.storage
    chrome.storage.local.get([getParentDomain(window.location.href)], (result) => {
      sendResponse({ expirationTimer: result.expirationTimer || "No time fetched." });
    });
    
    // Must return true to indicate async response
    return true;
  }
});



