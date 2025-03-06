import { CarTaxiFront } from "lucide-react";

export type ElementGetters = {
    placeOrderButtons: (e: HTMLElement) => HTMLElement[];
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

function findPayButtonFromText<T extends HTMLElement>(elements: NodeListOf<T>, search: string[] | string, id: string = "less-injected-id"): T[] {
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

function findFromText<T extends HTMLElement>(elements: NodeListOf<T>, search: string[] | string): HTMLElement[] {
    return Array.from(elements).filter(b => {
        const txt = b.textContent;
        if (!txt) return false;
        if (Array.isArray(search)) {
            return search.some(s => txt.includes(s));
        }
        return txt.includes(search);
    });
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
            placeOrderButtons: (e: HTMLElement) => [],
            addToCartButtons: (e: HTMLElement) => [],
            getCartItems: (e: HTMLElement) => [],
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
    
    placeOrderButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('input[name="placeYourOrder1"]');
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
    
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
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
    
    },
  
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
MLElement>('button[id="Continue to checkout button"]')
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
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cart-checkout-button"], #gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        return Array.from(buttons)
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
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('oversigt')) return [];
        
        const x = Array.from(document.querySelectorAll<HTMLElement>('button'))
            .filter(e => e.textContent.includes('til betaling') || e.getAttribute('less-button') === "place-order");
        
        return x;
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
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="paymentOption"]')
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
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('.checkout-order-confirmation__content button')
        return Array.from(buttons)
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
    placeOrderButtons:(e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];
        const buyButtons = Array.from(e.querySelectorAll<HTMLElement>('aside button[type="button"]'))
            .filter(b => b.textContent?.toLowerCase()?.includes('køb') || b.textContent?.toLowerCase()?.includes('purchase'));

        const alreadyMarkedBuyButtons = Array.from(e.querySelectorAll<HTMLElement>('button[id="buy-button"]'));

        return [...buyButtons, ...alreadyMarkedBuyButtons];
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
    placeOrderButtons:(e: HTMLElement) => {
        const section = e.querySelector('div[class="md:self-start"]');
        if (section == null) return [];
        const buttons = section.querySelectorAll<HTMLElement>('button');
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
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="submitPayment"]');
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
    placeOrderButtons:(e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('.j-place-order button.sui-button-common__primary, #paypal-vault-button'));
        return buttons.map(createInnerChild);
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
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#co-options-applePay, #rs-checkout-continue-button-bottom');
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
    placeOrderButtons:(e: HTMLElement) => {
        const section = e.querySelector<HTMLElement>('div[class="checkout-step-payment"]');
        if (section == null) return [];
        const buttons = section.querySelectorAll<HTMLElement>('button[type="submit"]');
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
    
    // TODO: Fix placeOrderButton on non-label buttons;
    placeOrderButtons:(e: HTMLElement) => {
        // Remove quick paypal button
        Array.from(document.body.querySelectorAll('div[aria-label]')).filter(b => b.getAttribute('aria-label') === 'Ekspres-betaling med').forEach(b => b.remove());
        
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('div[aria-label][role="button"]')).filter(b => b.getAttribute('aria-label').includes('betal'));
        const appleButtons = Array.from(document.querySelectorAll<HTMLElement>('div[role="button"]')).filter(b => b.textContent?.includes('med'))

        return buttons.concat(appleButtons).map(createInnerChild);
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
    
    
    placeOrderButtons: (e: HTMLElement) => {
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
    
    
    placeOrderButtons: (e: HTMLElement) => {
        if (location.href.includes('supercartEnabled=true')) {
            e.querySelectorAll('button[data-automation-id="checkoutButton"], div[data-testid="paypal-smart-button"]').forEach(b => b.remove());
            return [];
        }

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
    
    
    placeOrderButtons: (e: HTMLElement) => {
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
    placeOrderButtons: (e: HTMLElement) => {
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
    
    placeOrderButtons: (e: HTMLElement) => {
        Array.from(document.querySelectorAll('button[data-auto-id="google-pay"]')).forEach(b => b.remove());
        const paypalButtons = Array.from(document.querySelectorAll('#paypal-button-container')).map(createInnerChild);
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-auto-id="place-order-button"]"]')).concat(paypalButtons);
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
    
    placeOrderButtons: (e: HTMLElement) => {
        document.querySelectorAll('div[data-testid="paypal-container"], button[data-automation="paypal-checkout-button"]')?.forEach(b => b.remove());

        return findPayButtonFromText(document.querySelectorAll('button'), ["Continue to Order Review", "Fortsæt til forhåndsvisning af ordre"]);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-testid="atb-button-mobile"], button[data-testid="atb-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        // total
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

getters.register("etsy.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-selector="cart-submit-button"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('div[data-add-to-cart-button] button, button[data-listing-card-add-to-cart]'));
    },

    getCartItems: (e: HTMLElement) => {
        const items = Array.from(document.querySelectorAll('li[data-cart-listing]'));
        // total
        return items.map(item => {
            const quantity = parseInt(item.querySelector('select')?.value ?? "1");
            const {currency, price} = splitPriceCurrency(item.querySelector('.money').textContent);
            return {
                quantity,
                price,
                currency
            }});
    }
});

getters.register("samsung.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if(location.href.includes('/us/')) {
            document.querySelector('#paypal-button-container')?.remove();
            
            return Array.from(document.querySelectorAll('.total-checkout-cta-holder button'));
        }
        

        return Array.from(document.querySelectorAll('button[data-an-tr="checkout-step-ecommerce"]')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        if(location.href.includes('/us/')) {
            return findFromText(document.querySelectorAll<HTMLElement>('button, a'), ["ADD TO CART", "Add", "Continue"]);
        }
        
        return Array.from(document.querySelectorAll('.add-to-cart-btn, .price-bar-cart-btn, button[data-totalprice], button[data-price], button[ga-ac="addToCart"]'));
    },

    getCartItems: (e: HTMLElement) => {
        // total
        if(location.href.includes('/us/')) {
            const items = Array.from(document.querySelectorAll<HTMLElement>('.cart-item'));

            return items.map(item => {
                const {price, currency} = splitPriceCurrency(item.querySelector('.cart-item-buying-price').textContent);
                const quantity = parseInt(item.querySelector('select')?.value ?? "1");
                return {
                    quantity,
                    price,
                    currency
                }
            });
        }

        const items = Array.from(document.querySelectorAll('cx-cart-item-v2'));

        return items.map(item => {
            const {currency, price } = splitPriceCurrency(item.querySelector('.price__current')?.textContent);

            return {
                quantity: parseInt(item.querySelector('input')?.value ?? "1"),
                price,
                currency
            }
        });
    }
});

getters.register("aliexpress.com", {
    // Fix buy now buttons
    
    placeOrderButtons: (e: HTMLElement) => {
        const sdk = Array.from(document.querySelectorAll<HTMLElement>('#sdk-checkout-button-slot')).map(createInnerChild);
        return Array.from(document.querySelectorAll<HTMLElement>('.pl-order-toal-container__btn-box .pl-order-toal-container__btn')).concat(sdk);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),["Add to cart"]);
    },

    getCartItems: (e: HTMLElement) => {
       if(!location.href.includes('p/trade/')) return;
        const itemInputs = document.querySelectorAll<HTMLInputElement>('.comet-input-number-input');

        return Array.from(itemInputs).map(item => {
            // Total
            const quantity = parseInt(item.value);
            const {price, currency} = splitPriceCurrency(item.parentElement?.parentElement?.children?.[1]?.textContent);

            return {
                quantity,
                price: price * quantity,
                currency
            }
        });
    }
});

getters.register("gap.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        const checkoutBtns = Array.from(document.querySelectorAll<HTMLElement>('button[data-testid="checkout-button"]'));
        return Array.from(document.querySelectorAll<HTMLElement>('div[data-testid="paypal-button"]')).map(d => createInnerChildWithColor(d, "black")).concat(checkoutBtns);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),["Add to Bag"]);
    },

    getCartItems: (e: HTMLElement) => {
        const items = Array.from(document.querySelectorAll('#active-bag li'));
        
        return items.map(item => {
            // total
            const quantity = parseInt(item.querySelector('div[data-testid="product-quantity"]')?.textContent ?? "1");
            const unsplitPrice = item.querySelector('div[data-testid="product-price"] span:not(.line-through)').textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price: price * quantity,
                currency
            }
        });
    }
});

/**
 * Removes undefined elements from inputs
 * @param elements 
 * @returns 
 */
function toArray<T extends HTMLElement>(...elements: T[]) : T[] {
    return elements.filter(e => !!e);
}

getters.register("wish.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('cart')) return [];

        return toArray(document.querySelector<HTMLElement>('div[data-testid="checkout-button"]'),
            createInnerChild(document.querySelector<HTMLElement>('#gpay-button-online-api-id')),
            createInnerChild(document.querySelector<HTMLElement>('#paypal-button'))).concat(
                findFromText(document.querySelectorAll<HTMLElement>('div[role="button"]'), "Continue to order summary")
            )
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll<HTMLElement>('button, div[role="button"], div[data-testid="add-to-cart"]'),["Add to cart"]);
    },

    getCartItems: (e: HTMLElement) => {
        // total
        const items = document.querySelectorAll('div[data-testid="cart-quantity-dropdown"]');
        return Array.from(items).map((item, i) => {
            const quantity = parseInt(item.children[0].textContent);
            const unsplitPrice = item.parentElement.parentElement.parentElement.querySelector(`div[data-testid="cart-item-actual-price-${i}"]`).textContent
            const {price, currency} = splitPriceCurrency(unsplitPrice);
            
            return {
                quantity,
                price,
                currency
            }
        });

    }
});

getters.register("wayfair.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('div[data-testid="paykit-next-payment-confirmation-CARD"] button, div[data-testid="paykit-next-payment-confirmation-WAYFAIR_FINANCING"] button, div[data-testid="paykit-next-payment-confirmation-AFTERPAY"] button, div[data-testid="paykit-next-payment-confirmation-KLARNA_PAY_IN_X"] button')).
            concat(toArray(createInnerChild(document.querySelector<HTMLElement>('#paypal-button'))));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-testing-id="atc-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        // total
        const items = Array.from(document.querySelectorAll('.OrderSummaryCard li'));
        return items.map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelector('.ConfirmationProductCard-price').textContent);
            const quantity = parseInt(item.querySelector('.ConfirmationProductCard-quantity')?.textContent ?? "1");

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("zara.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('order/summary')) return [];
        return findPayButtonFromText(document.querySelectorAll('button[data-qa-id="shop-continue"]'), ["AUTHORIZE PAYMENT", "GODKEND BETALING"]);
        
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-qa-action="add-to-cart"], button[data-qa-action="product-grid-open-size-selector"]'));
    },

    getCartItems: (e: HTMLElement) => {
        // total
        const items = document.querySelectorAll('.shop-cart-item__info')

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('.shop-cart-item-quantity')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('.shop-cart-item-pricing__current')?.textContent);

            return {
                price,
                quantity,
                currency
            }
        });
    }
});

getters.register("ikea.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/shoppingcart')) return [];
        return Array.from(document.querySelectorAll('button[data-cart-cta="true"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLButtonElement>('button[aria-label="Add to bag"], button.pip-product-compact__add-to-cart-button, button[aria-label="Læg i indkøbskurv"], button.plp-btn.plp-btn--small.plp-btn--icon-emphasised'))
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/shoppingcart')) return [];

        const inputs = document.querySelectorAll<HTMLInputElement>('input.cart-ingka-quantity-stepper__input');

        return Array.from(inputs).map(input => {
            // total
            const quantity = parseInt(input.value ?? "1");
            const unsplitPrice = input.parentElement.parentElement.parentElement.querySelector('.cart-ingka-price span')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                price,
                quantity,
                currency
            }
        });
    }
});

getters.register("macys.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if (location.href.includes('/bag')) return Array.from(document.querySelectorAll('button[aria-label="Paypal"], button[aria-label="Klarna"]'));
        if (!location.href.includes('/my-checkout')) return [];

        return Array.from(document.querySelectorAll('#rc-place-order-btn, #rc-signedin-paypal-continue, #rc-klarna-place-order-btn'));
    },

    addToCartButtons: (e: HTMLElement) => {
        document.querySelectorAll('button[aria-label="Buy Now"]').forEach(b => b.remove());
        return findFromText(document.querySelectorAll('button'), "Add To Bag");
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/bag')) return [];

        const itemPrices = Array.from(document.querySelectorAll('.bag-price-NO_LABEL, .bag-price-SALE'));
        return itemPrices.map(unsplitElem => {
            // total
            const {price, currency} = splitPriceCurrency(unsplitElem.textContent);
            const quantity = parseInt(unsplitElem.closest('.qty-price-wrapper')?.querySelector('input')?.value ?? "1");

            return {
                price: price * quantity,
                currency,
                quantity
            }
        });
    }
});

getters.register("asos.com", {
    
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('secure.asos.com')) return [];

        return Array.from(document.querySelectorAll('.paypal-buttons')).map(createInnerChild).concat(
            Array.from(document.querySelectorAll('button.cta.place-order'))
        )
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-testid="add-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('secure.asos.com')) return [];

        const items = Array.from(document.querySelectorAll('li.item.product-item'));

        return items.map(item => {
            const quantity = parseQty(item.querySelector('.item-quantity').textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.item-price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
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
    if (!btn) return btn;

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

getters.register("jysk.dk", {
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="continueToConfirmation"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test="addToTheBasketButton"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[data-test="onlineCart"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[data-test="checkoutProductOrderLinePrice"]')).map(e => e.textContent);
        //@ts-expect-error value is valid.
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('input[class="product-quantity-input"]')).map(e => e.value);

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: parseFloat(priceElements[i])/parseInt(quantityElements[i]),
                currency: "kr"
            });
        }
        return items.filter((_, index) => index % 2 === 0);
    }
})

getters.register(["bilka.dk", "foetex.dk"], {
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="checkout-submit-payment"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="add-to-cart-button"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[class="row cart-main__row"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('span[class="product-price price medium blackText"]')).map(e => e.textContent);
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="v-select__selection v-select__selection--comma"]')).map(e => e.textContent);
        
        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: parseFloat(priceElements[i]) / parseInt(quantityElements[i]),
                currency: "kr"
            });
        }
        return items;
    }
})

getters.register("saxo.com", {

    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('input[value="Bekræft køb"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[aria-label="Læg i kurv"], div .product-add-to-cart button');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[class="product-grid"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('span[class="hidden-sm hidden-xs"]')).map(e => getNumberFromText(e.textContent));
        //@ts-expect-error: value is a valid field.
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('input[name="quantity"]')).map(e => e.value);

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: (priceElements[i]/100) * parseInt(quantityElements[i]),
                currency: "kr"
            });
        }
        return items;
    }
});

getters.register("thansen.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="formsubmitbtn BwButton BwButton--large BwButton--dark BwButton--al-1 BwButton--cs-cta"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="BuyButton__button BwButton BwButton--al-1 BwButton--dark BwButton--small BwButton--cs-cta"], button[class="BuyButton__button BwButton BwButton--al-1 BwButton--dark BwButton--cs-cta BwButton--large"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[data-content="cart"]');
        if (cart === null) return [];
        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('span[class="cartpricesum"]')).map(e => e.textContent);
        //@ts-expect-error: value is a valid field.
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('input[class="cartamount no-edit"]')).map(e => e.value);
        
        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: parseInt(priceElements[i].replace(/\D/g, ''))/100,
                currency: "kr"
            });
        }
        return items;
    }
});

getters.register("imerco.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (location.href.includes('step=levering')) {
            const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="go-to-checkout"]');
            return Array.from(buttons);
        }
        return [];
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="ecogc800 next-pkfaeh ellotkw1"], button[class="ecogc800 next-11vcflj ellotkw1"], button[class="next-1hppgum ellotkw1"]');
        return Array.from(buttons); 
    },
    getCartItems: (e: HTMLElement) => {
        const info = Array.from(e.querySelectorAll<HTMLElement>('div[class="next-utw6et ed71law2"]'));
        if (info === null) return [];
        const items = info.map(e => e.textContent.split('x')).map(e => {
            const quantity = getNumberFromText(e[0]);
            const price = (getNumberFromText(e[1])/100) * quantity;
            return {
                quantity,
                price,
                currency : "kr"
            }   
        });
        return items;
    }
});

getters.register("sport24.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if(window.location.href.includes('payment')) {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="flex flex-row ring-1 font-semibold transition-all ease-in-out duration-200 sportify__Button-modal-rounding min-w-fit disabled:bg-transparent disabled:ring-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed items-center relative bg-primary-600 text-white hover:bg-primary-700 hover:ring-primary-700 ring-primary-600 px-5 py-3 text-base [&>.icon]:w-6 [&>.icon]:h-6 [&>.icon]:hidden w-fit"]');
        return Array.from(buttons);
    }
        return [];
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="flex flex-row ring-1 font-semibold transition-all ease-in-out duration-200 sportify__Button-modal-rounding min-w-fit disabled:bg-transparent disabled:ring-gray-200 disabled:text-gray-200 disabled:cursor-not-allowed items-center relative bg-primary-600 text-white hover:bg-primary-700 hover:ring-primary-700 ring-primary-600 px-6 py-3.5 text-base [&>.icon]:w-6 [&>.icon]:h-6 [&>.icon]:hidden flex-grow justify-center"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if(window.location.href.includes('payment')) {
        const priceElements = Array.from(e.querySelectorAll<HTMLElement>('p[data-testid="price"]')).map(e => getNumberFromText(e.textContent.replace('.', '')));
        const quantityElements = Array.from(e.querySelectorAll<HTMLElement>('p[class="font-normal text-gray-500 text-sm last-of-type:pb-2"]')).map(e => getNumberFromText(e.textContent));
        
        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: quantityElements[i],
                price: priceElements[i] * quantityElements[i],
                currency: "kr"
            });
        }
        return items.slice(0, items.length - 1);
    }
        return [];
    }

});

getters.register("bog-ide.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="e13xd5sc0 css-1c3vif9-StyledButton-CheckoutSubmitButton eh0pg5q0"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="e1t1q4g40 css-8js23k-StyledButton-BasketButton eh0pg5q0"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        //Hacky because of the way the site is built
        const price = Array.from(e.querySelectorAll<HTMLElement>('div[class="css-1pjrbim-Price e75bkt5"]'));
        return [
            {
                quantity: 1,
                price: getNumberFromText(price[0].textContent)/100,
                currency: "kr"
            }
        ];
    }
});

getters.register("power.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('pwr-lib-button[data-testid="confirm-button"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = Array.from(e.querySelectorAll<HTMLElement>('button[class="button-content can-add-to-cart"]'));
        const additionalButtons = Array.from(e.querySelectorAll<HTMLElement>('button')).filter(button => {
            const div = button.querySelector('div');
            return div && div.textContent.includes('Tilføj til kurv');
        });
        buttons.push(...additionalButtons);
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        
        if(window.location.href.includes('checkout')) {
        const cart = e.querySelector<HTMLElement>('div[class="checkout-summary-item products"]');
        if (cart === null) return [];

        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="w-100-p text-right strong"]')).map(e => e.textContent);
        const quantities = Array.from(e.querySelectorAll<HTMLElement>('span[class="quantities-text ng-binding"]')).map(e => getNumberFromText(e.textContent));
    
        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: quantities[i],
                price: parseFloat(priceElements[i].replace('.', '').replace(',', '.')),
                currency: "kr"
            });
        }   
        return items;
        }
        return [];
    }
});