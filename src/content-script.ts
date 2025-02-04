import { PURCHASE_KEYWORDS } from  "../assets/search-names";

// export function modifyAmazonPricesToMindfulness(): void {
//     const body = document.body;
//     if (!body) return;
  
//     // Amazone dollar sign
//     const priceElements = body.querySelectorAll("span.a-price-symbol");


//     priceElements.forEach((symbolElement) => {
//       // Find the parent container of the price
//       const priceContainer = symbolElement.closest("span.a-price");
//       if (priceContainer) {
//         // Replace the entire price with "Mindfulness"
//         priceContainer.textContent = "Mindfulness";
//       }
//     });


//   }

// export function modifyText(find: string, replace: string): void {
//     const body = document.body;
//     if (!body) return;
  
//     body.innerHTML = body.innerHTML.replace(new RegExp(find, 'g'), replace);
//   }
  
//   export function interceptBuyNowButton(): void {
//     // Use a MutationObserver to handle dynamic rendering
//     const observer = new MutationObserver(() => {
//       const buyNowButton = document.getElementById("buy-now-button") as HTMLInputElement;
  
//       if (buyNowButton) {
//         observer.disconnect(); // Stop observing once the button is found
  
//         // Attach an event listener to intercept and block its behavior
//         buyNowButton.addEventListener(
//           "click",
//           (event) => {
//             event.stopImmediatePropagation(); // Block all other event handlers
//             event.preventDefault(); // Prevent the default submission behavior
  
//             // Custom interference logic
//             alert("Hold on! Did you know that this kind of impulsive shopping can lead to financial stress and in severe cases LIGMA?");
//             console.log("Buy Now button click intercepted.");
//           },
//           true // Use capture phase to intercept early
//         );
  
//         console.log("Buy Now button is ready and intercepted.");
//       }
//     });
//     observer.observe(document.body, { childList: true, subtree: true });
//   }

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

export function getPurchaseButtons(
  keywords: string[] = PURCHASE_KEYWORDS
): HTMLElement[] {
  // Some typical clickable elements
  const selectors = [
    "button",
    "input[type=button]",
    "input[type=submit]",
    "a"
  ]

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")))

  // Normalize for easier matching
  const lowerCaseKeywords = keywords.map((k) => k.toLowerCase())

  return elements.filter((el) => {
    // We can look at various attributes or text content
    const text = (el.textContent || "").toLowerCase().trim()
    const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase().trim()
    const value = (el.getAttribute("value") || "").toLowerCase().trim()

    // Check if any keyword is included in these strings
    return lowerCaseKeywords.some(
      (keyword) =>
        text.includes(keyword) ||
        ariaLabel.includes(keyword) ||
        value.includes(keyword)
    )
  })
}

export function getPurchaseButton(): HTMLElement | null {
  const buttons = document.querySelector
  return buttons.length ? buttons[0] : null
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


