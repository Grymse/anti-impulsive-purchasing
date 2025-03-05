import { it } from "node:test";

export type ElementGetters = {
    checkoutButtons: (e: HTMLElement) => HTMLElement[];
    placeOrderButtons: (e: HTMLElement) => HTMLElement[];
    checkoutButtonLabels: (e: HTMLElement) => HTMLElement[];
    addToCartButtons: (e: HTMLElement) => HTMLElement[];
    getCartItems: (e: HTMLElement) => ShoppingItem[];
    getOneClickBuyNow?: (e: HTMLElement) => {button?: HTMLElement, label?: HTMLElement, item: ShoppingItem}[];
}

export type ShoppingItem = {
    quantity: number;
    price: number;
    currency: string;
}

type GetterRegister = {
    register: (domain: string | string[], getters: ElementGetters) => void;
    _getters: Map<string,ElementGetters>;
    getDomainGetters : () => ElementGetters;
    hasDomain: (domain: string) => boolean;
    hasCurrentDomain : () => boolean;
}

function splitPriceCurrency(price?: string | null) {
    const numericPrice = price?.match(/[\d,.]+/);
    if (!numericPrice) {
        return { price: 0, currency: 'none'}
    }
    const currency = price.replace(numericPrice ? numericPrice[0] : '', '');
    return { price: parsePrice(numericPrice[0]), currency: currency.trim() };
}

function parsePrice(price: string): number {
    // Remove any non-numeric characters except for '.' and ','
    const cleanedPrice = price.replace(/[^\d.,]/g, '');

    // Check if the price contains both '.' and ','
    if (cleanedPrice.includes('.') && cleanedPrice.includes(',')) {
        // Assume the last occurrence of either '.' or ',' is the decimal separator
        const lastDotIndex = cleanedPrice.lastIndexOf('.');
        const lastCommaIndex = cleanedPrice.lastIndexOf(',');

        if (lastDotIndex > lastCommaIndex) {
            // '.' is the decimal separator
            return parseFloat(cleanedPrice.replace(/,/g, ''));
        } else {
            // ',' is the decimal separator
            return parseFloat(cleanedPrice.replace(/\./g, '').replace(',', '.'));
        }
    }

    // If the price contains only one of '.' or ',', determine the format
    if (cleanedPrice.includes('.')) {
        // Assume American format
        return parseFloat(cleanedPrice);
    } else if (cleanedPrice.includes(',')) {
        // Assume Danish format
        return parseFloat(cleanedPrice.replace(',', '.'));
    }

    // If no decimal separator is found, parse as an integer
    return parseFloat(cleanedPrice);
}

function findFromText<T extends HTMLElement>(elements: NodeListOf<T>, search: string[] | string, id: string = "less-injected-id"): T[] {
    return Array.from(elements).filter(b => {
        if (b.id === id) return true;
        const txt = b.textContent;
        if (!txt) return false;
        if (Array.isArray(search)) {
            return search.some(s => txt.includes(s));
        }
        return txt.includes(search);
    }).map(b => {b.id = id; return b});
}

function parseQty(qty: string | null): number {
    const numbers = qty?.match(/[\d,.]+/);
    if (!numbers) return 1;
    return parseInt(numbers[0]);
}

const shopifyDomains = [
    "klaedeskabet.dk",
    "fashionnova.com",
    "kyliecosmetics.com",
    "colourpop.com",
    "jeffreestarcosmetics.com",
    "gymshark.com",
    "allbirds.com",
    "brooklinen.com",
    "ruggable.com",
    "chubbiesshorts.com",
    "puravidabracelets.com",
    "nativecos.com",
    "hauslabs.com",
    "skknbykim.com",
    "harney.com",
    "redbullshopus.com",
    "tula.com",
    "tesla.com",
    "spiritualgangster.com",
    "taylorstitch.com",
    "american-giant.com",
    "drsquatch.com",
    "mejuri.com",
    "mejuri.com",  
    "peets.com",
    "deathwishcoffee.com",
    "hellotushy.com",
    "bando.com",
    "moroccanoil.com",
    "negativeunderwear.com",
    "birdies.com",
    "naadam.co", 
    "popflexactive.com", 
    "moderncitizen.com",
    "greatjonesgoods.com",
    "pinklily.com",
    "misen.com", 
    "materialkitchen.com",
    "hedleyandbennett.com",
    "rumpl.com",
    "mizzenandmain.com",
    "ohpolly.com",
    "tecovas.com",
    "stance.com",
    "spongelle.com",
    "trueclassictees.com",
    "meundies.com",
    "studs.com",
    "jackhenry.co",
    "luxyhair.com",
    "juicycouture.com",
    "everlast.com",
    "skims.com",
    "feals.com",
    "foursigmatic.com",
    "golde.co",
    "liquid-iv.com",
    "thesill.com",
    "wearlively.com",
    "andieswim.com",
    "yourparade.com",
    "brightland.co",
    "omsom.com",
    "jenis.com",
    "snowehome.com",
    "graza.co",
    "flybyjing.com",
    "getmaude.com",
    "ugmonk.com",
]


function getTopDomain(domain: string) {
    return domain.split(".").splice(-2).join(".").replace("/","");
}

/**
 * A registry for storing and retrieving element getters based on domain.
 */
export const getters: GetterRegister = {
    /**
     * Registers a set of element getters for a specific domain.
     * 
     * @param domain - The domain for which the getters are being registered.
     * @param getters - The set of element getters to register.
     */
    register: function(domain: string | string[], getters: ElementGetters) {
        if (Array.isArray(domain)) {
            domain.forEach(d => this.register(d, getters));
            return;
        }

        // TODO: Replace with topdomain
        this._getters.set(getTopDomain(domain), getters);
    },

    /**
     * A private map storing the registered element getters by domain.
     */
    _getters: new Map<string, ElementGetters>(),

    /**
     * Retrieves the element getters for the current domain.
     * 
     * @returns The set of element getters for the specified domain, or default getters if none are registered.
     */
    getDomainGetters: function() {
        const domain = document.location.hostname;

        return this._getters.get(getTopDomain(domain)) || {
            checkoutButtons: (e: HTMLElement) => [],
            placeOrderButtons: (e: HTMLElement) => [],
            checkoutButtonLabels: (e: HTMLElement) => [],
            addToCartButtons: (e: HTMLElement) => [],
            getCartItems: (e: HTMLElement) => []
        };
    },

    /**
     * Checks if a domain has element getters registered.
     * @param domain - The domain to check.
     * @returns True if the domain has element getters registered, false otherwise.
     */
    hasDomain: function(domain: string) {
        return this._getters.has(getTopDomain(domain));
    },

    /**
     * Checks if the current domain has element getters registered.
     * @returns True if the current domain has element getters registered, false otherwise.
     */
    hasCurrentDomain: function() {
        return this.hasDomain(document.location.hostname);
    }
}

getters.register('amazon.com', {
    checkoutButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    checkoutButtonLabels: (e: HTMLElement) => { 
      const buttons = e.querySelectorAll<HTMLElement>('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('#add-to-cart-button, [name="submit.addToCart"], .add-to-cart .a-button-input, input[data-asin], div[data-csa-c-action="addToCart"] button, input[name="submit.gc-add-to-cart"], div.ucw-cards-product-atc button, div[data-testid="point-area"] div div div div div div div div div div div div div div button');
      return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('.sc-list-body');
        const cartItems1 = e.querySelectorAll<HTMLElement>('.a-fixed-left-grid-col.item-details-right-column.a-col-right');
        const cartItems2 = e.querySelectorAll<HTMLElement>('.lineitem-container');

        if (cartItems1.length !== 0) {
            return Array.from(cartItems1).map((item => {
                const unsplitPrice = item.querySelector<HTMLElement>('.a-color-price').textContent;
                const quantity = item.querySelector<HTMLSelectElement>('select').value
                const {price, currency} = splitPriceCurrency(unsplitPrice);

                return {
                    quantity: parseInt(quantity),
                    price,
                    currency
                }
            }));
        }

        if (cartItems2.length !== 0) {
            return Array.from(cartItems2).map((item) => {
                const quantity = item.querySelector<HTMLElement>('.quantity-display').innerText.trim();
                const unsplitPrice = item.querySelector<HTMLElement>('.lineitem-price-text').innerText;
                const {price, currency} = splitPriceCurrency(unsplitPrice);

                return {
                    quantity: parseInt(quantity),
                    price,
                    currency
                }
            });
        }

        if (!cart) return [];
        const itemsElements = cart.querySelectorAll<HTMLElement>('div[data-csa-c-type="item"]');
        return Array.from(itemsElements).map((item) => {
            const obj = JSON.parse(item.getAttribute('data-subtotal'));
            const totalPrice = parseInt(obj["subtotal"]?.["value"]);
            const quantity = parseInt(obj["quantity"]);
            return {
                quantity,
                price: totalPrice / quantity,
                currency: obj["subtotal"]?.["code"],
            };
        });
    },

    getOneClickBuyNow: (e: HTMLElement) => {
        const products = e.querySelectorAll<HTMLElement>('.s-product-image-container');

        if (products.length > 0) {
            return Array.from(products).map(product => {
                const productContainer = product.closest('.a-section');
                const unsplitPrice = productContainer.querySelector<HTMLElement>('.a-price .a-offscreen').textContent;
                const { price, currency } = splitPriceCurrency(unsplitPrice);
                const button = productContainer.querySelector<HTMLElement>('.a-button-input');
                const label = productContainer.querySelector<HTMLElement>('.a-button-text');

                return {
                    button,
                    label,
                    item: {
                        quantity: 1,
                        price,
                        currency,
                    }
                }
            });
        }

        const button = e.querySelector<HTMLElement>('#one-click-button');
        const item = e.querySelector<HTMLElement>('.a-price');
        const label = button?.parentElement.querySelector<HTMLElement>('.a-button-text');

        if (!button || !item || !label) return [];

        return [{button, label, item: {quantity: 1, price: 0, currency: item.textContent} }];
    }
});

getters.register('zalando.dk', {
    checkoutButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },
    
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },

    addToCartButtons: (e: HTMLElement) => {
        const checkOutBox = e.querySelector<HTMLElement>('div[data-testid="pdp-add-to-cart"]')
        if (!checkOutBox) return [];
        const buttons = Array.from(checkOutBox.querySelectorAll<HTMLElement>('button')).filter(button => !button.hasAttribute('data-testid'));
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const itemElements = e.querySelectorAll<HTMLElement>('article.cart-product-card');
        if (!itemElements) return [];
        const priceElements = Array.from(itemElements).map(i => i.querySelector('header section p').textContent);
        const quantity = Array.from(itemElements).map(i => i.querySelectorAll<HTMLOptionElement>('select')?.[1]?.value);
        let items = [];
        for (let i = 0; i < itemElements.length; i++) {
            items.push({
                quantity: parseInt(quantity[i]),
                price: parseFloat(priceElements[i]),
                currency: "kr"
            });
        }     
        return items;
    }
});

/* getters.register("walmart.com", {
    checkoutButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },
  
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
  
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },

    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
  }) */

getters.register("ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cta-top"], #binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cart-checkout-button"], #gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cta-top"], #binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')

        const buttons2 = e.querySelectorAll<HTMLElement>('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        buttons2.forEach(e => {e.style.color = 'white'; e.style.fontSize="16px"; e.style.fontWeight="bold"; e.style.backgroundColor="blue"; e.style.padding="10px"; e.style.borderRadius="20px"; e.style.cursor="pointer";});

        return Array.from(buttons).concat(Array.from(buttons2));
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div.x-atc-action.overlay-placeholder.atcv3modalloading');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const listings = e.querySelectorAll<HTMLElement>('.line-item--listings');
        if (!listings) return [];

        return Array.from(listings).map(l => {
            const price = l.querySelector<HTMLElement>('.item-price');
            const quantity1 = l.querySelector<HTMLInputElement | HTMLSelectElement>('.item-quantity select, .item-quantity input');
            const quantity2 = l.querySelector<HTMLElement>('.item-quantity')?.textContent?.split("Quantity")?.[1]?.trim();
            const quantity = parseInt(quantity1?.value ?? quantity2);

            if (!price || Number.isNaN(quantity)) return;

            return {
                quantity,
                price: (splitPriceCurrency(price.innerText).price) / quantity,
                currency: splitPriceCurrency(price.innerText).currency
            };
        });
    }
})

getters.register("matas.dk", {
    checkoutButtons:(e: HTMLElement) => {
        if(!location.href.includes('kurv')) return [];
        
        const buttons = Array.from(document.querySelectorAll<HTMLElement>('button[less-button="checkout"]'))
        return buttons;
    },  
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('oversigt')) return [];
        
        const x = Array.from(document.querySelectorAll<HTMLElement>('button'))
            .filter(e => e.textContent.includes('til betaling') || e.getAttribute('less-button') === "place-order");
        
        return x;
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        if(!location.href.includes('kurv') && !location.href.includes('oversigt')) return [];

        const checkoutButtons = Array.from(document.querySelectorAll<HTMLElement>('button div, button[less-button="checkout"]'))
            .filter(e => e.textContent.includes('kassen') || e.hasAttribute('less-button'));

        checkoutButtons.forEach(e => e.closest('button').setAttribute('less-button', 'checkout'));

        const placeOrderButtons = Array.from(document.querySelectorAll<HTMLElement>('button div, button[less-button="place-order"]'))
            .filter(e => e.textContent.includes('til betaling') || e.hasAttribute('less-button'));
        
        placeOrderButtons.forEach(e => e.closest('button').setAttribute('less-button', 'place-order'));

        return [...checkoutButtons, ...placeOrderButtons];
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[aria-label="Læg i kurv"], button[aria-label="Vælg variant"], button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh PDPProductActionRenderer__StyledProductActionRenderer-sc-1puad6u-0 pnAwd CombinedProductActions__StyledPDPProductActionRenderer-sc-uclf41-1 cEvPEY"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const quantities = e.querySelectorAll<HTMLSelectElement>('select[name="quantity"]');
        return Array.from(quantities).map(q => {
            const box = q.parentElement.parentElement.parentElement.parentElement.parentElement;
            const price = Array.from(box.querySelectorAll<HTMLElement>('div[direction="column"] span')).filter(i => i.innerText.includes('kr.'))[0];
            
            return {
                quantity: parseInt(q.value),
                price: splitPriceCurrency(price.innerText).price,
                currency: "kr"
            };
        }); 
    }
});

getters.register("proshop.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="paymentOption"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"], span[data-amountformat="dubbleLine"]')
        return Array.from(buttons)
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-form-action="addToBasket"]');   
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const quantities = e.querySelectorAll<HTMLElement>('input[name="quantity"]');
        const priceFraction = e.querySelectorAll<HTMLElement>('b[data-bind="autoNumeric: linePriceWithVat"]');
        const priceWhole = e.querySelectorAll<HTMLElement>('strong[data-bind="autoNumeric: BasketContent().totalWithVat"]');
        if (!priceWhole || !priceWhole[0]) return [];
        const priceSymbol = splitPriceCurrency(priceWhole[0].textContent).currency;

        let items = [];
        for (let i = 0; i < priceFraction.length; i++) {
            items.push({
                //@ts-expect-error: value is a valid field.
                quantity: parseInt(quantities[i].value),
                price: parseFloat(priceFraction[i].innerText),
                currency: priceSymbol
            });
        }
    
        return items;
    }
})

getters.register("boozt.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
        return Array.from(buttons)
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('.checkout-order-confirmation__content button')
        return Array.from(buttons)
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div[class="shopcart-order-summary__action"], button[class="palette-button palette-button--primary-boozt palette-button--medium palette-button--rectangle palette-button--expanded palette-button--horizontal-align-center shopcart-quick-checkout__button"], .checkout-order-confirmation__content button')
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div[class="product-actions__add-to-cart"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[class="shopcart-items"]');
        if (!cart) return [];
        const priceElement = cart.querySelectorAll<HTMLElement>('div[class="product-prices__price"] .typography--body2');
        const quantity = cart.querySelectorAll<HTMLElement>('select[class="select__dropdown skip-generic-styling"]');

        let items = [];
        for (let i = 0; i < priceElement.length; i++) {
            items.push({
                //@ts-expect-error .value is a valid field.
                quantity: parseInt(quantity[i].value),
                price: parseFloat(priceElement[i].innerText),
                currency: "kr"
            });
        }
        return items;
    }
})

getters.register("hm.com", {
    checkoutButtons:(e: HTMLElement) => {
        const minicart = e.querySelector<HTMLElement>('div[data-testid="minicart-open"]');
        if (!minicart) return [];
        const buttons1 = e.querySelectorAll<HTMLElement>('button[data-elid="header-cart-button"]');
        const buttons2 = minicart.querySelectorAll<HTMLElement>('button')[1];
        const allButtons = Array.from(buttons1).concat(Array.from([buttons2]));
        return Array.from(allButtons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];
        const buyButtons = Array.from(e.querySelectorAll<HTMLElement>('aside button[type="button"]'))
            .filter(b => b.textContent?.toLowerCase()?.includes('køb') || b.textContent?.toLowerCase()?.includes('purchase'));

        const alreadyMarkedBuyButtons = Array.from(e.querySelectorAll<HTMLElement>('button[id="buy-button"]'));

        return [...buyButtons, ...alreadyMarkedBuyButtons];
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const minicart = e.querySelector<HTMLElement>('div[data-testid="minicart-open"]');

        const buyButtons = Array.from(e.querySelectorAll<HTMLElement>('aside button[type="button"]'))
            .filter(b => b.textContent?.toLowerCase()?.includes('køb') || b.textContent?.toLowerCase()?.includes('purchase'));
        
        buyButtons.forEach(b => b.id="buy-button");
        const alreadyMarkedBuyButtons = Array.from(e.querySelectorAll<HTMLElement>('button[id="buy-button"]'));
        if (!minicart) return [...buyButtons, ...alreadyMarkedBuyButtons];
        const buttons = minicart.querySelectorAll<HTMLElement>('button');
        return [...buyButtons, ...alreadyMarkedBuyButtons, buttons[0]];
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="pdp_add_to_cart_button"], .panthera--product-addtobag-add');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('cart')) return [];
        const input = e.querySelectorAll<HTMLInputElement>('input[type="number"]');

        return Array.from(input).map(input => {
            const article = (input.closest('article').childNodes[1]) as HTMLElement | undefined;
            const unsplitPrice = article?.querySelector('div span')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);
            return {
                quantity: parseInt(input.value),
                price,
                currency
            };
        });
    }
})

getters.register(shopifyDomains, {
    checkoutButtons:(e: HTMLElement) => {
        if (location.href.includes('checkout')) return [];
        const checkoutButtons = Array.from(
            document.querySelectorAll<HTMLElement>('button'))
                    .filter(button => button.textContent.toLowerCase().includes('checkout') ||
                                      button.textContent.toLowerCase().includes('check out')
        );
        return checkoutButtons;
    },  

    placeOrderButtons:(e: HTMLElement) => {
        document.querySelector<HTMLElement>('shopify-paypal-button')?.remove();
        document.querySelector<HTMLElement>('shop-pay-wallet-button')?.remove();
        document.querySelector('shopify-google-pay-button')?.remove();

        const paypalBtn = document.querySelector('.paypal-buttons');
        paypalBtn?.parentElement?.remove();
        
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"], #shop-pay-button');
        const googleButton = e.querySelector<HTMLElement>('#gpay-button-online-api-id');

        if(googleButton) {
            let inner: HTMLElement | undefined;
            googleButton.style.padding = "0";
            if(googleButton.childNodes.length === 0) {
                inner = document.createElement('div');
                inner.style.width = "100%";
                inner.style.height = "100%";
                inner.style.color = "white";
                inner.style.fontSize = "1.5rem";
                inner.id = "gpay-button-text";
                googleButton.appendChild(inner);
            } 
            if (!inner) inner = googleButton.childNodes[0] as HTMLElement;
            return Array.from(button).concat([inner]);
        }
        
        if (location.href.includes('checkout')) {
            const submitButtons = e.querySelectorAll<HTMLElement>('button[type="submit"]');
            return Array.from(button).concat(Array.from(submitButtons));
        }
        
        return Array.from(button);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"], #shop-pay-button, #gpay-button-text');

        if (location.href.includes('checkout')) {
            const submitButtons = e.querySelectorAll<HTMLElement>('button[type="submit"]');
            return Array.from(button).concat(Array.from(submitButtons));
        }

        const checkoutButtons = Array.from(
            document.querySelectorAll<HTMLElement>('button'))
                    .filter(button => button.textContent.toLowerCase().includes('checkout') || button.textContent.toLowerCase().includes('check out')
        );
        
        return Array.from(button).concat(checkoutButtons);
    },

    addToCartButtons: (e: HTMLElement) => {
        if (location.href.includes('checkout')) return [];
        const buttons = Array.from(document.querySelectorAll<HTMLElement>('button')).filter(button =>
            button.textContent.toLowerCase().includes('add') || button.textContent.toLowerCase().includes('tilføj')
        );
       return buttons;
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];

        const basket = document.querySelectorAll<HTMLElement>('aside div[role="rowgroup"]')[1];
        const items = basket.querySelectorAll<HTMLElement>('div[role="row"]');

        return Array.from(items).map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelectorAll<HTMLElement>('div[role="cell"]')[3].textContent);
            return {
                quantity: parseInt(item.querySelectorAll<HTMLElement>('div[role="cell"]')[2].textContent),
                price,
                currency,
            }
        });
    }
})

getters.register("elgiganten.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('a[href="/checkout-integration"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const section = e.querySelector('div[class="md:self-start"]');
        if (section == null) return [];
        const buttons = section.querySelectorAll<HTMLElement>('button');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('a[href="/checkout-integration"], button[data-ta="checkoutPlaceOrder-button"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="addToCart-buyBox"], button[data-animating="false"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('ul[data-testid="order-summary"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div.grid.grid-cols-subgrid.grid-rows-subgrid.row-span-2.gap-1.items-end')).map(e => e.textContent.split(".")[0]);
        //@ts-expect-error: value is a valid field.
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('input[pattern="[0-9]*"]')).map(e => e.value);

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: parseFloat(priceElements[i]),
                currency: "kr"
            });
        }
        return items;
    }
})

getters.register("magasin.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div[class="minicart__icon"], button[class="checkout-btn button -primary -full-width"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="submitPayment"]');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="checkout-btn button -primary -full-width"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="button -primary -fw --brand-default add-to-cart js-size-selection-modal  is-disabled"], button[ref="add-to-cart-btn"], svg[class="svg-icon svg-icon-quickAddButton"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('aside[class="checkout__summary hidden-until-lg"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="sales-wrapper"]')).map(e => {
            if (e.textContent.includes("Normal pris")) {
                return parseInt(e.textContent.split("Normal pris")[1].replaceAll(".", ""));
            } else {
                return parseInt(e.textContent);
            }
        });
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="product_card-item-quantity"]')).map(e => e.textContent.split(" ")[0]);

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: priceElements[i],
                currency: "kr"
            });
        }
        return items;
    }
})

getters.register("shein.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button.bsc-mini-cart-footer__button, .bsc-mini-cart__trigger, button.j-cart-check');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('.j-place-order button.sui-button-common__primary, #paypal-vault-button'));
        return buttons.map(createInnerChild);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const payButton = Array.from(e.querySelectorAll<HTMLElement>('.j-place-order button.sui-button-common__primary, #paypal-vault-button'));
        const payButtonInner = payButton.map(b => b.querySelector<HTMLElement>('span')).filter(b => !!b);

        const buttons = e.querySelectorAll<HTMLElement>('button.bsc-mini-cart-footer__button, .bsc-mini-cart__trigger, button.j-cart-check');
        return Array.from(buttons).concat(payButtonInner);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="ProductDetailAddBtn"], button[aria-label="ADD TO CART"], button[class="goods-btn__add goods-btn__horizontal"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const items = document.querySelectorAll<HTMLElement>('.checkout-cart__item-effiency');

        return Array.from(items).map(item => {
            let quantity = item.querySelector('input')?.value;
            if(!quantity) {
                const unsplit = item.querySelector('.shopping-bag-item__belt-wrap')?.textContent;
                if (unsplit) {
                    const {price} = splitPriceCurrency(unsplit)
                    quantity = String(price);
                }
            }
            const unsplitPrice = item.querySelector('.item-price-content')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity: parseInt(quantity),
                price,
                currency
            };
        })
    }
})

getters.register("apple.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="proceed"], button[id="globalnav-menubutton-link-bag"], a[data-analytics-title="Review Bag"], button[data-autom="checkout"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#co-options-applePay, #rs-checkout-continue-button-bottom');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="proceed"], #co-options-applePay, #rs-checkout-continue-button-bottom');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="add-to-cart"], div[class="rc-addtobag-container"], button[data-autom="recommendations-addToBag-button"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('ol[data-autom="bag-items"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[data-autom="Monthly_price"]')).map(e => e.textContent);
        //@ts-expect-error: value is a valid field.
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('select[class="rs-quantity-dropdown form-dropdown-select"]')).map(e => e.value);

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: splitPriceCurrency(priceElements[i]).price,
                currency: splitPriceCurrency(priceElements[i]).currency
            });
        }
        return items;
    }
})

getters.register("jemogfix.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[title="Indkøbskurv"], a[class="mini-basket__button btn btn-success w-100"], button[class="btn btn-success w-100"], div[class="product-price-summary__checkout"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const section = e.querySelector<HTMLElement>('div[class="checkout-step-payment"]');
        if (section == null) return [];
        const buttons = section.querySelectorAll<HTMLElement>('button[type="submit"]');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[title="Indkøbskurv"], button[class="btn btn-success w-100"], div[class="product-price-summary__checkout"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="product-details__button-add btn btn-success btn-add icon"]');
        buttons.forEach(e => e.style.backgroundColor = "blue");
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[class="checkout-aside-module__products-list"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="checkout-aside-module__product-item-price"]')).map(e => e.textContent);
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="checkout-aside-module__product-item-name"]')).map(e => parseInt(e.textContent.split("stk.")[0].replaceAll('(', '')));

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: quantityElements[i],
                price: parseFloat(priceElements[i]),
                currency: "kr"
            });
        }
        return items;
    }
})



getters.register("temu.com", {
    
    checkoutButtons:(e: HTMLElement) => {
        return [];
    },  

    // TODO: Fix placeOrderButton on non-label buttons;
    placeOrderButtons:(e: HTMLElement) => {
        // Remove quick paypal button
        Array.from(document.body.querySelectorAll('div[aria-label]')).filter(b => b.getAttribute('aria-label') === 'Ekspres-betaling med').forEach(b => b.remove());
        
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('div[aria-label][role="button"]')).filter(b => b.getAttribute('aria-label').includes('betal'));
        const appleButtons = Array.from(document.querySelectorAll<HTMLElement>('div[role="button"]')).filter(b => b.textContent?.includes('med'))

        return buttons.concat(appleButtons).map(createInnerChild);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('div[aria-label][role="button"]')).filter(b => b.getAttribute('aria-label').includes('betal'));
        const generalButtons = buttons.map(b => b.querySelectorAll<HTMLElement>('span')[1]);

        const appleButtons = Array.from(document.querySelectorAll<HTMLElement>('div[role="button"]')).filter(b => b.textContent?.includes('med')).map(createInnerChild);
        return generalButtons.concat(appleButtons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const spans = e.querySelectorAll('span[role="button"]');
        return Array.from(spans).filter(s => s.textContent.includes('kurv')).map(s => s.parentElement.parentElement)
    },

    getCartItems: (e: HTMLElement) => {
        const items = e.querySelectorAll('.splide__slide');

        return Array.from(items).map(item => {    
            const priceAndQuantity = item.querySelector('span[data-priority-index]');
            const price = parseFloat(priceAndQuantity.childNodes[0].textContent);
            const currency = priceAndQuantity.childNodes[1].textContent;

            return {
                quantity: getNumberFromText(priceAndQuantity.childNodes[2]?.textContent ?? "1"),
                price,
                currency
            }
        });
    }
})

getters.register("target.com", {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll<HTMLElement>('button[data-test="placeOrderButton"], button[data-test="payWithAffirmButton"], button[data-test="pay-with-paypal-in-four-button"], button[data-test="pay-with-paypal-button"]'));
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll<HTMLElement>('button[data-test="placeOrderButton"], button[data-test="payWithAffirmButton"], button[data-test="pay-with-paypal-in-four-button"], button[data-test="pay-with-paypal-button"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('Add to cart'));
    },

    getCartItems: (e: HTMLElement) => {
        const items = e.querySelectorAll('div[data-test="cartItem"]');

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('select').value);
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('p[data-test="cartItem-price"]').textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});


getters.register("homedepot.com", {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        if (location.href.includes('supercartEnabled=true')) {
            e.querySelectorAll('button[data-automation-id="checkoutButton"], div[data-testid="paypal-smart-button"]').forEach(b => b.remove());
            return [];
        }

        const paypal = Array.from(e.querySelectorAll<HTMLElement>('div[data-testid="paypal-smart-button"]')).map(createInnerChild);
        
        return Array.from(e.querySelectorAll<HTMLElement>('button[data-automation-id="checkoutButton"]')).concat(paypal)
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        const paypal = Array.from(e.querySelectorAll<HTMLElement>('div[data-testid="paypal-smart-button"]')).map(createInnerChild);
        
        return Array.from(e.querySelectorAll<HTMLElement>('button[data-automation-id="checkoutButton"]')).concat(paypal)
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = Array.from(e.querySelectorAll('button')).filter(b => b.textContent?.includes('Add to Cart'));
        return buttons;
    },

    getCartItems: (e: HTMLElement) => {
        const items = e.querySelectorAll('div[data-automation-id="cart-item"]');
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input').value);
            // total price
            const {price, currency} = splitPriceCurrency(item.querySelector('span[data-automation-id="pricingScenariosTotalPriceAddedText"]').textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("bestbuy.com", {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        const paypal = Array.from(e.querySelectorAll<HTMLElement>('.paypal-component')).map(createInnerChild);
        return Array.from(e.querySelectorAll<HTMLElement>('button.checkout-buttons__paypal, .payment__order-summary button')).concat(paypal);
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        const paypal = Array.from(e.querySelectorAll<HTMLElement>('.paypal-component')).map(createInnerChild);
        return Array.from(e.querySelectorAll<HTMLElement>('button.checkout-buttons__paypal, .payment__order-summary button')).concat(paypal);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll('button')).filter(b => b.textContent?.includes('Add to Cart'));
    },

    getCartItems: (e: HTMLElement) => {
        // total
        if(location.href.includes('checkout/r/payment')) {
            const items = Array.from(document.querySelectorAll('.item-list__entry'));
            return items.map(item => {
                const contents = item.querySelectorAll<HTMLElement>('.item-list__content');
                if(contents.length < 2) return {
                    price: 0, currency: "$", quantity: 0
                }
                const {price: quantity} = splitPriceCurrency(contents[1].innerText);
                const {price, currency} = splitPriceCurrency(contents[0].innerText);

                return {price, currency, quantity}
            }).filter(({price}) => price !== 0);
        }
        const qtyHolders = document.querySelectorAll('div.fluid-item__actions')

        return Array.from(qtyHolders).map(qtyHolder => {
            const qty = qtyHolder.querySelector('select').value;
            const unsplitPrice = qtyHolder.parentElement.querySelector('div.price-block__primary-price').textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                price,
                currency,
                quantity: parseInt(qty)
            }
        })
    }
});

getters.register("costco.com", {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll<HTMLInputElement>('#place-order-button-regular')).map(i => createInnerChildWithColor(i, "black"));
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll<HTMLInputElement>('#place-order-button-regular')).map(i => createInnerChildWithColor(i, "black"));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll('button')).filter(b => b.textContent?.includes('Add')).concat(
            Array.from(e.querySelectorAll('#add-to-cart-btn'))
        )
    },
    
    getCartItems: (e: HTMLElement) => {
        const items = Array.from(document.querySelectorAll<HTMLElement>('.order-item'));
        // Total price

        return items.map((item, i) => {
            const quantity = item.querySelector<HTMLInputElement>(`input#quantity_${i+1}`)?.value;
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>(`div[automation-id=totalPriceOutput_${i+1}]`).textContent);

            return {
                quantity: parseInt(quantity),
                price,
                currency
            }
        });
    }
});

getters.register(["adidas.dk", "adidas.com"], {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        Array.from(document.querySelectorAll('button[data-auto-id="google-pay"]')).forEach(b => b.remove());
        const paypalButtons = Array.from(document.querySelectorAll('#paypal-button-container')).map(createInnerChild);
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-auto-id="place-order-button"]"]')).concat(paypalButtons);
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        Array.from(document.querySelectorAll('button[data-auto-id="google-pay"]')).forEach(b => b.remove());
        const paypalButtons = Array.from(document.querySelectorAll('#paypal-button-container')).map(createInnerChild);
        
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-auto-id="place-order-button"] span"]')).concat(paypalButtons);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(e.querySelectorAll('#add-to-bag button.gl-cta, button[data-auto-id="add-to-bag-addon"]'))
    },

    getCartItems: (e: HTMLElement) => {
        const items = Array.from(document.querySelectorAll('div[data-auto-id="cart-line-item"]'));

        return items.map(item => {
            // total
            const quantity = item.querySelector<HTMLInputElement>('select').value;
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('div[data-auto-id="gl-price-item"]').textContent);

            return {
                quantity: parseInt(quantity),
                price,
                currency
            }
        });
    }
});

getters.register(["nike.com"], {
    checkoutButtons: (e: HTMLElement) => {
        return [];
    },

    placeOrderButtons: (e: HTMLElement) => {
        document.querySelectorAll('div[data-testid="paypal-container"], button[data-automation="paypal-checkout-button"]')?.forEach(b => b.remove());

        return findFromText(document.querySelectorAll('button'), ["Continue to Order Review", "Fortsæt til forhåndsvisning af ordre"]);
    },

    checkoutButtonLabels: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'), ["Continue to Order Review", "Fortsæt til forhåndsvisning af ordre"]);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-testid="atb-button-mobile"], button[data-testid="atb-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        const items = Array.from(document.querySelectorAll('aside figure[data-attr="cloud-cart-item"]'));

        return items.map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('div[data-attr="checkout-cart-item-price"]').textContent);
            const quantity = parseQty(Array.from(item.querySelectorAll('figcaption div')).find(t => t.textContent.includes(' @ '))?.textContent ?? "");
            return {
                quantity,
                price,
                currency
            };
        });
    }
});

function getNumberFromText(text: string) {
    return parseInt(text.replace(/\D/g, ''));
}

function createInnerChild(btn: HTMLElement) {
    return createInnerChildWithColor(btn, "white");
}

function createInnerChildWithColor(btn: HTMLElement, textColor: string) {
    const inner = (btn.querySelector<HTMLElement>('#less-inner-button-text')) as HTMLElement | undefined
    btn.style.padding = "0";
    btn.style.position = "relative";
    if(inner) return inner;

    const newInner = document.createElement('div');
    newInner.style.width = "100%";
    newInner.style.height = "100%";
    newInner.style.color = textColor;
    newInner.style.zIndex = "1000";
    newInner.style.top = "0";
    newInner.style.left = "0";
    newInner.style.position = "absolute";
    newInner.style.cursor = "pointer";
    newInner.id = "less-inner-button-text";
    btn.appendChild(newInner);
    return newInner;
}