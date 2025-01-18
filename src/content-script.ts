export function modifyAmazonPricesToMindfulness(): void {
    const body = document.body;
    if (!body) return;
  
    // Amazone dollar sign
    const priceElements = body.querySelectorAll("span.a-price-symbol");


    priceElements.forEach((symbolElement) => {
      // Find the parent container of the price
      const priceContainer = symbolElement.closest("span.a-price");
      if (priceContainer) {
        // Replace the entire price with "Mindfulness"
        priceContainer.textContent = "Mindfulness";
      }
    });


  }

export function modifyText(find: string, replace: string): void {
    const body = document.body;
    if (!body) return;
  
    body.innerHTML = body.innerHTML.replace(new RegExp(find, 'g'), replace);
  }
  
  export function interceptBuyNowButton(): void {
    // Use a MutationObserver to handle dynamic rendering
    const observer = new MutationObserver(() => {
      const buyNowButton = document.getElementById("buy-now-button") as HTMLInputElement;
  
      if (buyNowButton) {
        observer.disconnect(); // Stop observing once the button is found
  
        // Attach an event listener to intercept and block its behavior
        buyNowButton.addEventListener(
          "click",
          (event) => {
            event.stopImmediatePropagation(); // Block all other event handlers
            event.preventDefault(); // Prevent the default submission behavior
  
            // Custom interference logic
            alert("Hold on! Did you know that this kind of impulsive shopping can lead to financial stress and in severe cases LIGMA?");
            console.log("Buy Now button click intercepted.");
          },
          true // Use capture phase to intercept early
        );
  
        console.log("Buy Now button is ready and intercepted.");
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  
  

  