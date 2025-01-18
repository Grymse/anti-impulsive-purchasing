export function modifyAmazonPricesToMindfulness(): void {
    const body = document.body;
    if (!body) return;
  
    // Select all elements with the class "a-price-symbol"
    const priceElements = body.querySelectorAll("span.a-price-symbol");

    
    // Loop through each price element and update the text
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
  