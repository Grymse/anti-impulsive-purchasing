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

function splitPriceCurrency(price: string) {
    const numericPrice = price.match(/[\d,.]+/);
    const currency = price.replace(numericPrice ? numericPrice[0] : '', '');
    return { price: parseFloat(numericPrice[0].replace(',', '.')), currency: currency.trim() };
}

const shopifyDomains = [
    "klaedeskabet.dk",
    "www.fashionnova.com",
    "kyliecosmetics.com",
    "colourpop.com",
    "jeffreestarcosmetics.com",
    "www.gymshark.com",
    "us.checkout.gymshark.com",
    "www.allbirds.com",
    "www.brooklinen.com",
    "ruggable.com",
    "shop.ruggable.com",
    "www.chubbiesshorts.com",
    "checkout.chubbiesshorts.com",
    "www.puravidabracelets.com",
    "www.nativecos.com",
    "www.hauslabs.com",
    "skknbykim.com",
    "www.harney.com",
    "www.redbullshopus.com",
    "tula.com",
    "checkout.tula.com",
    "shop.tesla.com",
    "spiritualgangster.com",
    "www.taylorstitch.com",
    "www.american-giant.com",
    "www.drsquatch.com",
    "mejuri.com",
    "checkout-uk.mejuri.com",  
    "www.peets.com",
    "www.deathwishcoffee.com",
    "hellotushy.com",
    "www.bando.com",
    "www.moroccanoil.com",
    "negativeunderwear.com",
    "birdies.com",
    "naadam.co", 
    "www.popflexactive.com", 
    "www.moderncitizen.com",
    "greatjonesgoods.com",
    "pinklily.com",
    "misen.com", 
    "materialkitchen.com",
    "shop.hedleyandbennett.com",
    "www.rumpl.com",
    "checkout.mizzenandmain.com",
    "ohpolly.com",
    "checkout.tecovas.com",
    "eu.stance.com",
    "spongelle.com",
    "www.trueclassictees.com",
    "checkout.meundies.com",
    "studs.com",
    "jackhenry.co",
    "www.luxyhair.com",
    "juicycouture.com",
    "www.everlast.com",
    "checkout.skims.com",
    "feals.com",
    "us.foursigmatic.com",
    "golde.co",
    "shop.liquid-iv.com",
    "www.thesill.com",
    "www.wearlively.com",
    "andieswim.com",
    "yourparade.com",
    "brightland.co",
    "omsom.com",
    "jenis.com",
    "snowehome.com",
    "graza.co",
    "shop.flybyjing.com",
    "getmaude.com",
    "ugmonk.com",
]



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

        this._getters.set(domain, getters);
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

        return this._getters.get(domain) || {
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
        return this._getters.has(domain);
    },

    /**
     * Checks if the current domain has element getters registered.
     * @returns True if the current domain has element getters registered, false otherwise.
     */
    hasCurrentDomain: function() {
        return this._getters.has(document.location.hostname);
    }
}

getters.register('www.amazon.com', {
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

getters.register('www.zalando.dk', {
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

/* getters.register("www.walmart.com", {
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

getters.register("cart.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cart-checkout-button"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register("pay.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        buttons.forEach(e => {e.style.color = 'white'; e.style.fontSize="16px"; e.style.fontWeight="bold"; e.style.backgroundColor="blue"; e.style.padding="10px"; e.style.borderRadius="20px"; e.style.cursor="pointer";});
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    /* getOneClickBuyButtons: (e: HTMLElement) => {
        const button = e.querySelector<HTMLElement>('#buy-now-button');
        const item = e.querySelector<HTMLElement>('.a-price .a-offscreen');

        return [];  
    }, */

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

getters.register("www.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons);
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div.x-atc-action.overlay-placeholder.atcv3modalloading');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register("www.matas.dk", {
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

getters.register("www.proshop.dk", {
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

getters.register("www.boozt.com", {
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

getters.register("www2.hm.com", {
    checkoutButtons:(e: HTMLElement) => {
        const minicart = e.querySelector<HTMLElement>('div[data-testid="minicart-open"]');
        if (!minicart) return [];
        const buttons1 = e.querySelectorAll<HTMLElement>('button[data-elid="header-cart-button"]');
        const buttons2 = minicart.querySelectorAll<HTMLElement>('button')[1];
        const allButtons = Array.from(buttons1).concat(Array.from([buttons2]));
        return Array.from(allButtons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const minicart = e.querySelector<HTMLElement>('div[data-testid="minicart-open"]');
        if (!minicart) return [];
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="continue-button-cart-sidebar"]')
        const button2 = minicart.querySelectorAll<HTMLElement>('button');
        return Array.from(buttons).concat(button2[1]);  
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const minicart = e.querySelector<HTMLElement>('div[data-testid="minicart-open"]');
        if (!minicart) return [];
        const buttons = minicart.querySelectorAll<HTMLElement>('button');
        return [buttons[0]];
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="pdp_add_to_cart_button"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register(shopifyDomains, {
    checkoutButtons:(e: HTMLElement) => {
        return [];
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const paypalBtn = document.querySelector('.paypal-buttons');
        paypalBtn?.parentElement?.remove();
        
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"], #shop-pay-button');
        const googleButton = e.querySelector<HTMLElement>('#gpay-button-online-api-id');

        if(googleButton) {
            googleButton.style.backgroundImage = 'none';
            let inner: HTMLElement | undefined;
            if(googleButton.childNodes.length === 0) {
                inner = document.createElement('div');
                inner.style.width = "100%";
                inner.style.height = "100%";
                inner.style.color = "white";
                inner.style.fontSize = "1.5rem";
                inner.style.padding = "";
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
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"], button[type="submit"], #shop-pay-button, #gpay-button-text');
        return Array.from(button);
    },

    addToCartButtons: (e: HTMLElement) => {
       return [];
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

getters.register("www.elgiganten.dk", {
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

getters.register("www.magasin.dk", {
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

getters.register("euqs.shein.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="sui-button-common sui-button-common__primary sui-button-common__H54PX j-cart-check incentive-button"], button[class="sui-button-common sui-button-common__primary sui-button-common__H44PX bsc-mini-cart-footer__button"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="sui-button-common sui-button-common__primary sui-button-common__H54PX j-cart-check incentive-button"]');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('span[class="checkout-btn-content"], button[class="sui-button-common sui-button-common__primary sui-button-common__H44PX bsc-mini-cart-footer__button"]');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="ProductDetailAddBtn"], button[aria-label="ADD TO CART"], button[class="goods-btn__add goods-btn__horizontal"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register("www.apple.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="proceed"], button[id="globalnav-menubutton-link-bag"], a[data-analytics-title="Review Bag"]');
        return Array.from(buttons);
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[id="shoppingCart.actions.navApwCheckout"], button[id="shoppingCart.actions.apwCheckout"], button[id="shoppingCart.actions.navCheckoutOtherPayments"], button[id="shoppingCart.actions.checkoutOtherPayments"]');
        return Array.from(buttons);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="proceed"]');
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
                price: parseFloat(priceElements[i]),
                currency: splitPriceCurrency(priceElements[i]).currency
            });
        }
        return items;
    }
})

getters.register("www.jemogfix.dk", {
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