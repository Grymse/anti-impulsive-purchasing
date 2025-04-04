export type OneBlickBuyButton = {
    button?: HTMLElement;
    item: ShoppingItem;
}

export type ElementGetters = {
    placeOrderButtons: (e: HTMLElement) => HTMLElement[];
    addToCartButtons: (e: HTMLElement) => HTMLElement[];
    getCartItems: (e: HTMLElement) => ShoppingItem[];
    getOneClickBuyNow?: (e: HTMLElement) => OneBlickBuyButton[];
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
    const numericPrice = price?.match(/\d[\d,.]+/);
    if (!numericPrice) {
        return { price: 0, currency: 'none'}
    }

    const parsedPrice = parsePrice(numericPrice[0]);
    const currency = price.replace(numericPrice ? numericPrice[0] : '', '');

    return { price: parsedPrice, currency: currency.trim() };
}

function parsePrice(price: string): number {
    // Remove any non-numeric characters except for '.' and ','
    const cleanedPrice = price.replace(/[^\d.,]/g, '');
    if (!cleanedPrice) return 0;
    if (cleanedPrice.length < 3) return parseFloat(cleanedPrice);

    const lastDotIndex = cleanedPrice.lastIndexOf('.') - cleanedPrice.length;
    const lastCommaIndex = cleanedPrice.lastIndexOf(',') - cleanedPrice.length;

    // If the price contains only one of '.' or ',', determine the format
    if (lastCommaIndex >= -3 || lastDotIndex === -4) {
        // Assume Danish format
        return parseFloat(cleanedPrice.replace('.', '').replace(',', '.'));
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
    "sneakerzone.dk",
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
    "luksusbaby.dk",
    "intersport.dk",
];

function getTopDomain(domain: string) {
    if (domain.includes(".co.uk"))
        return domain.split(".").splice(-3).join(".").replace("/","");
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

getters.register(['amazon.com', 'amazon.se', 'amazon.co.uk', 'amazon.de'], {
    
    placeOrderButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll<HTMLElement>('#add-to-cart-button, input#buy-now-button, [name="submit.addToCart"], .add-to-cart .a-button-input, input[data-asin], div[data-csa-c-action="addToCart"] button, input[name="submit.gc-add-to-cart"], div.ucw-cards-product-atc button, div[data-testid="point-area"] div div div div div div div div div div div div div div button');
      return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('checkout')) return [];

        const items = Array.from(document.querySelectorAll('span[data-csa-c-slot-id="checkout-item-block-itemBlock"]'));

        return items.map(item => {
            // total
            const quantity = parseInt(item.querySelector('select')?.value);
            const unsplitPrice = item.querySelector<HTMLElement>('.lineitem-price-text')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price: price * quantity,
                currency
            }
        });

    },

    getOneClickBuyNow: (e: HTMLElement) => {
        const buttonsSideBar = Array.from(document?.querySelectorAll<HTMLElement>('button[data-testid="buyNow1click"]')).map(b => {
            const {price, currency} = splitPriceCurrency(b.closest('div[data-testid]').querySelector('span').textContent);
            return {button: b, item: {price, currency, quantity: 1}};
        });

        const buttonsProductPage = Array.from(document?.querySelectorAll<HTMLElement>('#one-click-button')).map(b => {
            const unsplitPrice = b.closest('#buybox')?.querySelector?.('.a-price')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);
            return {button: b, item: {price, currency, quantity: 1}};
        });

        const buttonsProductListing = Array.from(document.querySelectorAll('i.a-icon-1click')).map(p => 
            {
                const unsplitPrice = p.closest('.puis-card-container, #bnx_price_block_common')?.querySelector?.('.a-offscreen, .a-size-large');
                const {price, currency} = splitPriceCurrency(unsplitPrice?.textContent);
                return {
                    button: p.parentElement.querySelector('input'),
                    item: {price, currency, quantity: 1}
                } 
        }).filter(b => b.button.id !== "one-click-button");

        const combined = buttonsSideBar.concat(buttonsProductPage, buttonsProductListing);

        return combined;
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
        // total
        const itemElements = e.querySelectorAll<HTMLElement>('article.cart-product-card');
        if (!itemElements) return [];
        const priceElements = Array.from(itemElements).map(i => i.querySelector('header section p')?.textContent);
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

getters.register(["ebay.com", "ebay.de", "ebay.co.uk"], {
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-test-id="cart-checkout-button"], #gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
        return Array.from(buttons)
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div.x-atc-action.overlay-placeholder.atcv3modalloading');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('pay')) return [];
        const listings = e.querySelectorAll<HTMLElement>('.line-item--listings');
        if (!listings) return [];
        // total

        return Array.from(listings).map(l => {
            const price = l.querySelector<HTMLElement>('.item-price');
            const quantity1 = l.querySelector<HTMLInputElement | HTMLSelectElement>('.item-quantity select, .item-quantity input');
            const quantity2 = l.querySelector<HTMLElement>('.item-quantity')?.textContent?.split("Quantity")?.[1]?.trim();
            const quantity = parseInt(quantity1?.value ?? quantity2);

            if (!price || Number.isNaN(quantity)) return;

            return {
                quantity,
                price: (splitPriceCurrency(price.innerText).price),
                currency: splitPriceCurrency(price.innerText).currency
            };
        });
    }
})

getters.register("shop.app", {
    placeOrderButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[aria-label="Pay now"]')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        const basket = document.querySelectorAll<HTMLElement>('aside div[role="rowgroup"]')[1];
        const items = basket.querySelectorAll<HTMLElement>('div[role="row"]');
        // total
        return Array.from(items).map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelectorAll<HTMLElement>('div[role="cell"]')[3]?.textContent);
            return {
                quantity: parseInt(item.querySelectorAll<HTMLElement>('div[role="cell"]')[2]?.textContent),
                price,
                currency,
            }
        });
    }
});

getters.register("matas.dk", {
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('oversigt')) return [];
        
        const x = Array.from(document.querySelectorAll<HTMLElement>('button'))
            .filter(e => e.textContent.includes('til betaling') || e.getAttribute('button') === "place-order");
        
        return x;
    },
    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[aria-label="Læg i kurv"], button[aria-label="Vælg variant"], button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh PDPProductActionRenderer__StyledProductActionRenderer-sc-1puad6u-0 pnAwd CombinedProductActions__StyledPDPProductActionRenderer-sc-uclf41-1 cEvPEY"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/oversigt')) return [];

        const items = Array.from(e.querySelectorAll('a[href]'))
            .map(a => a.parentElement)
            .filter(div => div.className.includes('BasketItem'));

        return Array.from(items).map(item => {
            const spans = Array.from(item.querySelectorAll('span'));
            const {price, currency} = splitPriceCurrency(spans.at(-1)?.textContent);
            const quantity = parseQty(spans.at(-2)?.textContent);
            
            // total
            return {
                quantity,
                price,
                currency,
            };
        }); 
    }
});

getters.register("proshop.dk", {
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[name="paymentOption"]');
        return Array.from(buttons)
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-form-action="addToBasket"]');   
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/Basket')) return [];

        const items = Array.from(document.querySelectorAll('#basketLines li'))
        // total
        return items.map(item => {
            const quantity = item.querySelector<HTMLInputElement>('input[type="number"]')?.value;
            const price = splitPriceCurrency(item.querySelector<HTMLElement>('.basketLinePriceWithVat b')?.textContent);
            return {
                quantity: parseInt(quantity),
                price: price.price,
                currency: price.currency
            }
        });
    }
})

getters.register("boozt.com", {
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        const buttons = e.querySelectorAll<HTMLElement>('.checkout-order-confirmation__content button')
        return Array.from(buttons)
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('div[class="product-actions__add-to-cart"], div.size-selector__button-add-to-cart');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        const items = Array.from(document.querySelectorAll('.cart-item'));

        // total
        return items.map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelector('.product-prices span')?.textContent);
            const quantity = parseQty(findFromText(item.querySelectorAll<HTMLInputElement>('span'), ["Antal", "Quantity"])?.[0]?.textContent);

            return {
                quantity,
                price,
                currency
            }
        })
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
            // total
            const article = (input.closest('article').childNodes[1]) as HTMLElement | undefined;
            const unsplitPrice = article?.querySelector('div span')?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);
            return {
                quantity: parseInt(input?.value),
                price: price * parseInt(input?.value),
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
/* 
        const paypalBtn = document.querySelector('.paypal-buttons');
        paypalBtn?.parentElement?.remove(); */

        return Array.from(document.querySelectorAll('.paypal-buttons, #gpay-button-online-api-id, #checkout-pay-button, #shop-pay-button'))
            .map(createInnerChild).concat(findFromText(document.querySelectorAll<HTMLElement>('button[type="button"]'),["Pay"]));
    },

    addToCartButtons: (e: HTMLElement) => {
        if (location.href.includes('checkout')) return [];
        const buttons = Array.from(document.querySelectorAll<HTMLElement>('button')).filter(button =>
            button?.textContent?.toLowerCase?.()?.includes('add') || button?.textContent?.toLowerCase?.()?.includes('tilføj')
        );
       return buttons;
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('checkout')) return [];

        const basket = document.querySelectorAll<HTMLElement>('aside div[role="rowgroup"]')[1];
        const items = basket.querySelectorAll<HTMLElement>('div[role="row"]');

        // total
        return Array.from(items).map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelectorAll<HTMLElement>('div[role="cell"]')[3]?.textContent);
            return {
                quantity: parseInt(item.querySelectorAll<HTMLElement>('div[role="cell"]')[2]?.textContent),
                price,
                currency,
            }
        });
    }
})

getters.register("elgiganten.dk", {
    placeOrderButtons:(e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        return Array.from(document.querySelectorAll('elk-mobile-pay-payment button, elk-credit-card-pay-button button, elk-trustly-payment button, elk-klarna-payment button, elk-santander-payment button')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="addToCart-buyBox"], button[data-animating="false"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        const items = Array.from(document.querySelectorAll('elk-order-summary-product'));
        
        return items.map(item => {
            // total
            const quantity = parseInt(item.querySelector('input')?.value);
            const unsplitPrice = Array.from(item.querySelector('.product-item__price')?.children).at(-1)?.textContent;
            const {price} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price,
                currency: "kr"
            }
        });
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
                return parseInt(e.textContent.split("Normal pris")[1]?.replaceAll(".", ""));
            } else {
                return parseInt(e.textContent);
            }
        });
        const quantityElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="product_card-item-quantity"]')).map(e => e.textContent.split(" ")[0]);

        // total
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
        // total
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
                price: price * parseInt(quantity),
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

        // total
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
        const buttons = e.querySelectorAll<HTMLElement>('button[class="product-details__button-add btn btn-success btn-add icon"], .mini-basket__add-to-basket-wrapper button');
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
            // total
            items.push({
                quantity: quantityElements[i],
                price: parsePrice(priceElements[i]),
                currency: "kr"
            });
        }
        return items;
    }
})

getters.register("temu.com", {
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('bgt_order_checkout')) return [];

        const search = ["Køb med", "Bestil og betal", "Order and Pay", "Buy with"];
        return Array.from(findFromText(document.querySelectorAll<HTMLElement>('div[role="button"]'),search)).map(createInnerChild)
    },

    addToCartButtons: (e: HTMLElement) => {
        const search = ['Tilføj til kurv', 'Add to cart'];
        return Array.from(findFromText(document.querySelectorAll<HTMLElement>('span[role="button"]'),search))
            .map(s => s.parentElement.parentElement)
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('bgt_order_checkout')) return [];
        const items = e.querySelectorAll('.splide__slide');

        return Array.from(items).map(item => {
            // total    
            const priceAndQuantity = item.querySelector('span[data-priority-index]');
            const price = parsePrice(priceAndQuantity?.childNodes?.[0]?.textContent);
            const currency = priceAndQuantity?.childNodes?.[1]?.textContent;
            const quantity = getNumberFromText(priceAndQuantity?.childNodes?.[2]?.textContent ?? "1")

            return {
                quantity,
                price: price * quantity,
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
            const quantity = parseInt(item.querySelector('select')?.value);
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('p[data-test="cartItem-price"]')?.textContent);
            // total
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
            const quantity = parseInt(item.querySelector('input')?.value);
            // total price
            const {price, currency} = splitPriceCurrency(item.querySelector('span[data-automation-id="pricingScenariosTotalPriceAddedText"]')?.textContent);

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
            const qty = qtyHolder.querySelector('select')?.value;
            const unsplitPrice = qtyHolder.parentElement.querySelector('div.price-block__primary-price')?.textContent;
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
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>(`div[automation-id=totalPriceOutput_${i+1}]`)?.textContent);

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
            const quantity = item.querySelector<HTMLInputElement>('select')?.value;
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('div[data-auto-id="gl-price-item"]')?.textContent);

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
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('div[data-attr="checkout-cart-item-price"]')?.textContent);
            const quantity = parseQty(Array.from(item.querySelectorAll('figcaption div')).find(t => t?.textContent.includes(' @ '))?.textContent ?? "");
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
            const {currency, price} = splitPriceCurrency(item.querySelector('.money')?.textContent);
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
                const {price, currency} = splitPriceCurrency(item.querySelector('.cart-item-buying-price')?.textContent);
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
            const quantity = parseInt(item?.value);
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
            const unsplitPrice = item.querySelector('div[data-testid="product-price"] span:not(.line-through)')?.textContent;
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
            const quantity = parseInt(item.children[0]?.textContent);
            const unsplitPrice = item.parentElement.parentElement.parentElement.querySelector(`div[data-testid="cart-item-actual-price-${i}"]`)?.textContent
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
            const {price, currency} = splitPriceCurrency(item.querySelector('.ConfirmationProductCard-price')?.textContent);
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
            const {price, currency} = splitPriceCurrency(unsplitElem?.textContent);
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
        // total

        return items.map(item => {
            const quantity = parseQty(item.querySelector('.item-quantity')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.item-price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
        
    }
});

getters.register("chewy.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('.gpay-button, .paypal-buttons')).map(createInnerChild).concat(
            Array.from(document.querySelectorAll('button[data-testid="place-order-button"]')));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('.js-tracked-product-add-to-cart, button[data-testid="add-to-cart"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = Array.from(document.querySelectorAll('.kib-product-card__content'));

        return items.map(item => {
            // total
            const quantity = parseInt(item.querySelector('select')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.kib-product-price')?.textContent);

            return {
                quantity,
                price: price * quantity,
                currency
            }
        });
    }
});

getters.register("lowes.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/cart') && !location.href.includes('/checkout')) {
            document.querySelector('#paypal-button')?.remove();
            return [];
        }

        return Array.from(document.querySelectorAll<HTMLElement>('#paypal-button, #gpay-button')).map(createInnerChild).concat(
                Array.from(document.querySelectorAll<HTMLElement>('button[data-automation-id="submit-checkout"]')),
                Array.from(document.querySelectorAll('apple-pay-button')).map(p => createInnerChild((p?.parentElement)))   
        );
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-testid="atc-button"], #atcButton, .add-all-to-cart, #atc button, a[data-automation-id="rec-AddToCart"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if(location.href.includes('/checkout')) {
            const itemImages = document.querySelectorAll('div[data-selector="ar-sc-orderSummary"] img');

            return Array.from(itemImages).map((itemImage, index) => {
                const item = itemImage.parentElement.parentElement;

                const quantity = parseQty(item.querySelector(`span[data-selector="art-sc-pickupItemQty${index}"]`)?.textContent);
                const {price, currency} = splitPriceCurrency(item.querySelector(`div[data-selector="art-sc-pickupItemPrice${index}"]`)?.textContent);
                // total
                return {
                    quantity,
                    price,
                    currency
                }
            })
        } else if (!location.href.includes('/cart')) {
            return [];
        }

        const items = Array.from(document.querySelectorAll('div[data-test="cc-product-details"]')).map(p => p.parentElement);

        return items.map(item => {
            const quantity = parseQty(item.querySelector('input')?.value);
            const {price, currency} = splitPriceCurrency(item.querySelector('div[data-selector="art-sc-itemPrice"]')?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("lg.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('checkout/cart')) return []; 

        return findFromText(document.querySelectorAll<HTMLElement>('button.MuiButtonBase-root'), "Checkout");
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-testid="cart-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('checkout/cart')) return [];

        const items = Array.from(document.querySelectorAll('.CartItemWrap'));

        return items.map(item => {
            // total
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('div[data-testid="pricesave"] span')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        })
    }
});

getters.register("dell.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];

        return Array.from(document.querySelectorAll<HTMLElement>('#checkout-btn-cta, #gpay-button-online-api-id, .paypal-buttons')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('a[data-testid="addToCartButton"], button[create-basketed-click], button.ps-add-to-cart'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];
        const items = Array.from(
            document.querySelector('item-stack')?.shadowRoot?.querySelectorAll('item-detail'))?.
                flatMap(i => Array.from(i.shadowRoot?.querySelectorAll('item-component')).map(i => i?.shadowRoot)).filter(i => !!i);
        
        if (!items) return [];
        // total
        return items.map(item => {
            const qty = item.querySelector('item-quantity')?.shadowRoot?.querySelector('input')?.value;
            const {price, currency } = splitPriceCurrency(item.querySelector('.price_total_display')?.textContent);
            
            return {
                price, currency, quantity: parseInt(qty ?? "1")
            }
        });
    }
});

getters.register("kohls.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        return Array.from(document.querySelectorAll('button[title="Proceed to Checkout"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('#addtobagID, #addtobagID2'));
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        const items = Array.from(document.querySelectorAll('.cart-item-panel .cart-item-panel-item'));

        return items.map(item => {
            const quantity = parseInt(item.querySelector('.quantity-user-selected-text')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.product-price-list-sale-price')?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("walgreens.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/cart')) return [];

        return Array.from(document.querySelectorAll<HTMLElement>('button#wag-cart-proceed-to-checkout')).concat(
            Array.from(document.querySelectorAll<HTMLElement>('#visa, #paypal-button-container')).map(createInnerChild)
        );
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[name="pickup-ship-btn"], a[create-basketed-click], button.upsellATC'));
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/cart')) return [];

        const items = Array.from(document.querySelectorAll('.wag-cart-prd-box'));

        return items.map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('p.wag-cart-prd-gift-price span')?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("lenovo.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/cart')) return [];
        
        return findFromText(document.querySelectorAll('button'), ["Proceed to Checkout", "Til Kassen"]).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll<HTMLElement>('button, div[role="button"]'), ["Add To Cart", "Add to Cart", "Add to cart", "Læg i indkøbskurven", "Tilføj til kurv"]);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/cart')) return [];

        const items = document.querySelectorAll('.productcart');
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.priceSavings h1')?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("hp.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/stores/servlet')) return [];
        return findFromText(document.querySelectorAll('a'), "checkout").concat(
            Array.from(document.querySelectorAll('.paypal-buttons')).map(createInnerChild)
        )
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'), "Add to cart");
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/stores/servlet')) return [];

        const items = Array.from(document.querySelectorAll('.productrow')).filter(d => d.id);

        return items.map(item => {
            const {price, currency} = splitPriceCurrency(item.querySelector('.product-price-tab span')?.textContent);
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            // total
            return {
                quantity,
                price,
                currency
            };
        });
    }
});

getters.register("nordstrom.com", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('shopping-bag')) return [];
        return Array.from(document.querySelectorAll('.paypal-buttons, #gpay-button-online-api-id')).map(createInnerChild).concat(Array.from(document.querySelectorAll('a[href="/checkout"]')));
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Add to Bag").concat(Array.from(document.querySelectorAll('#sbn-add-to-bag-button')));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('shopping-bag')) return [];
        
        const items = document.querySelectorAll('#shopping-bag-item');
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('select')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('#item-pricing span')?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("computersalg.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('checkout-step')) return [];

        return findFromText(document.querySelectorAll('button'), ['Start betaling']).concat(
            Array.from(document.querySelectorAll('div.klarnamasterstartbtn, .checkout-payment-provider-formdata-class form'))
        ).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-js-product-details-add-to-basket]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('checkout/basket')) return [];

        const items = document.querySelectorAll('article[data-js-basket-item]');

        return Array.from(items).map(item => {
            // total
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const unsplitPrice = Array.from(item.querySelectorAll('div.m-basket-item__price-wrap span:not([style])')).map(t => t?.textContent).join(" ");
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("ditur.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('button[x-bind="buttonPlaceOrder()"]')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('#product-addtocart-button, button[title="Add to Cart"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('#quote-summary .grid .border-cart-secondary')
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.items-baseline .text-xs')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.product-price span')?.textContent);

            return {
                quantity,
                price: price * quantity,
                currency
            }
        });
    }
});


getters.register(["kaufmann.dk","quint.dk"], {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        
        return toArray(document.querySelector<HTMLElement>('form[name=paymentForm] button.button_primary')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.add-to-basket-button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.checkout__sidebar__order-line')
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.checkout__sidebar__order-line__price')?.children?.[0]?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(Array.from(item.querySelector('.checkout__sidebar__order-line__price')?.children)?.at(-1)?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("maxizoo.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/onestepcheckout')) return [];

        return Array.from(document.querySelectorAll('#onestepcheckout-place-order')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[title="Læg i kurv"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/onestepcheckout')) return [];

        const items = document.querySelectorAll('table.onestepcheckout-summary tbody tr')
        // total
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("fribikeshop.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('.checkout__content-submit-button')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Tilføj til kurv").concat(Array.from(document.querySelectorAll('.upsale__button')))
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        const items = document.querySelectorAll('.checkout__minicart-item');
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('strong')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.checkout__minicart-item-price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("williamdam.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/kassen')) return [];

        return Array.from(document.querySelectorAll('p.payment_module a'));
    },

    addToCartButtons: (e: HTMLElement) => {
        // findFromText(document.querySelectorAll('button'),"Tilføj til kurv")
        return Array.from(document.querySelectorAll('a.ajax_add_to_cart_button, #add_to_cart button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/kassen')) return [];

        const items = document.querySelectorAll('#cart_summary_short tr[id]');
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.children[0]?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.children[2]?.textContent ?? "");

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("av-cables.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/kurv')) return [];

        return Array.from(document.querySelectorAll('button[data-test-id="complete-purchase-button"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-test-id="add-to-cart-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/kurv')) return [];

        const itemInputs = document.querySelectorAll<HTMLInputElement>('input[data-test-id="quantity-input"]');
        // total
        return Array.from(itemInputs).map(itemInput => {
            const unsplitPrice = Array.from(itemInput.closest('div').parentElement.children).at(-1)?.querySelector('span span')?.textContent;
            const quantity = parseInt(itemInput?.value);
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("plantetorvet.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        
        return Array.from(document.querySelectorAll('input[value="Gå til betaling"]')).map(createNeighbour)
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Læg i kurv").concat(Array.from(document.querySelectorAll('input[value="Køb"]')));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const itemQtys = document.querySelectorAll('.media .badge-success');
        // total
        return Array.from(itemQtys).map(itemQty => {
            const quantity = parseInt(itemQty?.textContent ?? "1");
            const unsplitPrice = itemQty.parentElement.parentElement.querySelector('.text-right')
            const {price, currency} = splitPriceCurrency(unsplitPrice?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("salling.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button[type="submit"]'), "Betal");
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.button--add-to-basket'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.checkout-header__overlay li.lines__item')
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.basket-summary-line__summary-count')?.textContent ?? "1");
            const unsplitPrice = item.querySelector('.basket-line-price')?.children?.[0]?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("lampeguru.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button[type=button]'), "Gå til betaling").filter(b => !b.textContent?.includes("metode")).map(createNeighbour);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(findFromText(document.querySelectorAll<HTMLElement>('.product-card__CTA button[type="button"]'), "Læg i kurv")).concat(
            Array.from(document.querySelectorAll('button svg[width="17"]')).map(b => b.closest("button") as HTMLElement)
        )
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const itemImgs = document.querySelector('#checkout').children[0].children[1].children[1].querySelectorAll('img')
        // total
        return Array.from(itemImgs).map(item => {
            const unparsedQuantity = item.parentElement.children?.[1]?.textContent
            const unparsedPrice = Array.from(item.parentElement.parentElement.children[1].children[1].children[1].children).at(-1)?.textContent;
            const quantity = parseInt(unparsedQuantity ?? "1");
            const {price} = splitPriceCurrency(unparsedPrice);

            return {
                quantity,
                price,
                currency: 'kr'
            }
        });
    }
});


getters.register("havehandel.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('#place_order'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[name="add-to-cart"], .single_add_to_cart_button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('tbody .cart_item');
        // total
        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.product-quantity')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.product-total')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("sinful.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        // Array.from(document.querySelectorAll('.paypal-buttons, #gpay-button-online-api-id')).map(createInnerChild);
        return Array.from(document.querySelectorAll('button[data-testid="gotopayment"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),["Læg i kurv", "Tilføj til kurv"]).concat(
            Array.from(document.querySelectorAll('button[data-testid="add-to-basket-button"]'))
        );
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const itemsQty = Array.from(document.querySelectorAll('span')).filter(s => s.textContent.includes(' stk'));

        return Array.from(itemsQty).map(itemQty => {
            const quantity = parseQty(itemQty?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(Array.from(itemQty.parentElement.children[1].children)?.at(-1)?.textContent);
            // total
            return {
                quantity,
                price,
                currency
            }
        });
    }
});


getters.register("hyggeonkel.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('kurv/kasse')) return [];

        return Array.from(document.querySelectorAll('input[value="GODKEND ORDRE →"]')).map(createNeighbour);
    },

    addToCartButtons: (e: HTMLElement) => {
        // findFromText(document.querySelectorAll('button'),"Tilføj til kurv")
        return Array.from(document.querySelectorAll('.card-product-grid__sidecar-add-to-cart, .section-product-details__main-content-tocart-button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('kurv/kasse')) return [];
        // total

        const itemQtys = document.querySelectorAll('table tbody tr td[align="center"]');

        return Array.from(itemQtys).map(itemQty => {
            const quantity = parseQty(itemQty.textContent ?? "1");
            const unparsedPrice = Array.from(itemQty.parentElement.querySelectorAll('td[align="right"]')).at(-1);
            const {price} = splitPriceCurrency(unparsedPrice?.textContent);
            
            return {
                quantity,
                price,
                currency: 'kr'
            }
        });
    }
});

getters.register("legeakademiet.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('button.checkout')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.tocart'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.product-item')
        // total
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("lampemesteren.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/mcheckout')) return [];

        return Array.from(document.querySelectorAll('input[value="GÅ TIL SIKKER BETALING"]')).map(createNeighbour);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.item-order-purchase__addtocart'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/mcheckout')) return [];

        const items = document.querySelectorAll('tr.cart__data')
        // total
        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-item__price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("zooplus.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        // TODO: FIX
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('.paypal-buttons, #gpay-button-online-api-id, #makeTheOrder')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-zta="add-to-cart"], button[aria-label="Tilføj til kurven"], button[data-zta="SelectedArticleBox__AddToCartButton"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.item__price__info');
        // total
        return Array.from(items).map(item => {
            const unparsedPrice = item.querySelector('.item__price__total .z-product-price__price-wrap')?.textContent;
            const quantity = parseQty(item.querySelector('.item__price__quantity')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(unparsedPrice);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("harald-nyborg.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/kasse')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button[type="submit"]'), ["Gå til betaling"]);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Læg i kurv")
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/kurv')) return [];

        const itemsQty = document.querySelectorAll<HTMLInputElement>('input[type="number"]')
        // total
        return Array.from(itemsQty).map(itemQty => {
            const quantity = parseInt(itemQty.value ?? "1");
            const unparsedPrice = itemQty.closest('li')?.children?.[0]?.children?.[5];
            const {price, currency} = splitPriceCurrency(unparsedPrice?.textContent);

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

function createNeighbour(element: HTMLElement) {
    if(!element) return;
    if(element.parentElement.id === "less-button-wrapper")
        return element.parentElement.querySelector<HTMLElement>('#less-inner-button-text');

    const wrapper = document.createElement('div');
    wrapper.id = "less-button-wrapper";
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    return createInnerChild(wrapper);
}

function createInnerChildWithColor(btn: HTMLElement, textColor: string) {
    if (!btn) return btn;

    const inner = (btn.querySelector<HTMLElement>('#less-inner-button-text')) as HTMLElement | undefined
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
        if(!location.href.includes('/checkout')) return [];
        const buttons = e.querySelectorAll<HTMLElement>('#continueToConfirmation');
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
            // total
            items.push({
                quantity: parseInt(quantityElements[i]),
                price: parseFloat(priceElements[i]),
                currency: "kr"
            });
        }
        return items.filter((_, index) => index % 2 === 0);
    }
})

getters.register(["bilka.dk", "foetex.dk"], {
    placeOrderButtons:(e: HTMLElement) => {
        if(!location.href.includes('checkout/payment')) return [];

        const buttons = e.querySelectorAll<HTMLElement>('button[data-testid="checkout-submit-payment"]');
        return Array.from(buttons).map(createInnerChild)
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
        // total
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
            // total
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
        if (!location.href.includes('/orderstep')) return [];

        const buttons = e.querySelectorAll<HTMLElement>('button.formsubmitbtn');
        return Array.from(buttons).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button.BuyButton__button');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/orderstep')) return [];

        const items = Array.from(document.querySelectorAll('.shopping-cart .CartLine'));

        return items.map(item => {
            const quantity = parseQty(item.querySelector('div.number')?.textContent);

            const {price, currency} = splitPriceCurrency(item.querySelector('.cartpricesum')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
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
        return findFromText(e.querySelectorAll<HTMLElement>('button'), ["Læg i kurv"]);
    },
    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        
        const items = Array.from(e.querySelector('aside ul')?.querySelectorAll('li'));
        
        return items.map(item => {
            const content = Array.from(item.querySelectorAll('div')).at(-1)?.textContent;
            const quantity = parseQty(content);
            const {price} = splitPriceCurrency(content);
            
            
            return {
                price: price*quantity,
                currency: 'kr',
                quantity,
            }
        });
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
            // total
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

function findParentWithClass(e: HTMLElement, className: string) : HTMLElement | null {
    if(!e) return null;
    
    if (e.className.includes(className)) {
        return e;
    }
    return findParentWithClass(e.parentElement, className);
}

getters.register("bog-ide.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];
        
        return findFromText(e.querySelectorAll<HTMLElement>('button[type="submit"]'),'Gå til sikker betaling');
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(e.querySelectorAll<HTMLElement>('button'), ["Læg i kurv", "Forudbestil"]);
    },

    getCartItems: (e: HTMLElement) => {
        if(!location.href.includes('/checkout')) return [];

        const items = Array.from(document.querySelectorAll<HTMLElement>('img[sizes]'))
            .map(e => findParentWithClass(e, "FlexLayout"));

        return items.map(item => {
            const quantity = parseQty(item.querySelector('div[type="dim"]')?.textContent);
            const unsplitPrice = Array.from(Array.from(item.children).at(-1)?.children).at(-1)?.textContent;
            const {price, currency} = splitPriceCurrency(unsplitPrice);

            return {
                quantity,
                price,
                currency
            }
        }).filter(p => p.price !== 0);
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
            // total
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

getters.register("plantorama.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        const orderForm = e.querySelector<HTMLElement>('form[data-vv-scope="paymentStep"]');
        if (orderForm === null) return [];
        const buttons = orderForm.querySelectorAll<HTMLElement>('button');
        return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('button[class="button-with-icon product-card__add-to-cart-button"], button[class="button-with-icon product-information__call-to-action-button"]');
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('div[class="checkout-section__description checkout-section__description--active"]');
        if (cart === null) return [];

        const priceElements = Array.from(cart.querySelectorAll<HTMLElement>('div[class="aside-right-modal__click-collect-normal-price"]')).map(e => getNumberFromText(e.textContent));
        const quantities = Array.from(cart.querySelectorAll<HTMLElement>('span[class="aside-right-modal__click-collect-unit"]')).map(e => getNumberFromText(e.textContent));

        let items = [];
        for (let i = 0; i < priceElements.length; i++) {
            items.push({
                quantity: quantities[i],
                price: priceElements[i],
                currency: "kr"
            });
        }
        return items;
    }
});

getters.register("plantorama.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/til-kassen')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button.checkout-section__submit'), "Gå til betaling").map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('.product-card__add-to-cart-button, .product-information__call-to-action-button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/til-kassen')) return [];

        const items = Array.from(document.querySelectorAll('.aside-right-modal__item'));

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.aside-right-modal__click-collect-unit')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.aside-right-modal__click-collect-normal-price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("www.kop-kande.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return []

        return findFromText(document.querySelectorAll<HTMLElement>('button[type="submit"]'), "Fortsæt til sikker betaling").map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Læg i kurv")
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelector('.product-list')?.querySelectorAll('.name-and-price')

        return Array.from(items).map(item => {
            const unparsedQuantity = items[0].querySelector('.detail')?.textContent?.split?.('x')?.[1]
            const quantity = parseQty(unparsedQuantity);
            const {price, currency} = splitPriceCurrency(item.querySelector('.price-value')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("avxperten.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('#approveCheckoutBtn'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('a[title="Læg i kurv"], button[title="Læg i kurv"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.ncb-approve-row');

        return Array.from(items).map(item => {
            const children = item.querySelector('.product-name')?.children;
            const quantity = parseQty(children?.[0]?.textContent);
            const {price, currency} = splitPriceCurrency(children?.[1]?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("ilva.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('checkout/kurv')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button[type="submit"]'), "Godkend og betal").map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Tilføj til kurv")
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('checkout/kurv')) return [];

        const items = document.querySelectorAll('.basket-line')

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('.amount-field__value')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.price__total--default')?.textContent);

            return {
                quantity,
                price,
                currency: 'kr'
            }
        });
    }
});

getters.register("sportsworld.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return Array.from(document.querySelectorAll('button[data-testid="submit-card-details"], .paypal-buttons, button.adyen-checkout__button')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('button[data-testid="add-to-cart-button"], button[data-testid="purchase-button"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('div[data-testid="order-card"]');

        return Array.from(items).map(item => {
            const unparsedPrice = item.querySelectorAll('p[data-testid="price"]')?.[1]?.textContent;
            const unparsedQuantity = Array.from(item.querySelector('div')?.children?.[0]?.children).at(-1);
            const quantity = parseQty(unparsedQuantity?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(unparsedPrice);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("kids-world.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout_payment')) return [];

        return Array.from(document.querySelectorAll('#checkoutPaymentContinue')).map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return findFromText(document.querySelectorAll('button'),"Læg i kurv")
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout_payment')) return [];

        const items = document.querySelectorAll('article.product');

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.product__title')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

function pickLastChild<T>(node: Element) : Element {
    return Array.from(node.children).at(-1);
}

function repeatPickLastChild<T>(node: Element, times: number) : Element {
    let last = node;
    for (let i = 0; i < times; i++) {
        last = pickLastChild(last);
    }
    return last;
}

getters.register("billigvvs.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button[tabindex="0"]'),"Gå til betaling").filter(b => !b.textContent.includes('metode'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.new-productbox button, .product-card__CTA button[tabindex="0"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const elem = document.querySelectorAll('a[href="/basket/"]')?.[2]?.parentElement?.parentElement

        if (!elem) return [];

        const items = Array.from(elem.children).slice(0,-1).filter(a => !!a);

        if(!items) return [];

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('img')?.parentElement?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(repeatPickLastChild(item, 5)?.textContent);

            return {
                quantity,
                price,
                currency: "kr"
            }
        });
    }
});

getters.register("loebeshop.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return findFromText(document.querySelectorAll('button'), "Godkend og betal");
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.product_addtocart_form button.bg-primary, .product_addtocart_form input[type="checkbox"], #product-addtocart-button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.minicart-items li.product-item')

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.product-image-qty')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-price .price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});


getters.register("loberen.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        // TODO: FIX
        if (!location.href.includes('EXAMPLE')) return [];

        // Array.from(document.querySelectorAll('.paypal-buttons, #gpay-button-online-api-id')).map(createInnerChild);
        return Array.from(document.querySelectorAll('.EXAMPLE'));
    },

    addToCartButtons: (e: HTMLElement) => {
        // TODO: FIX
        // findFromText(document.querySelectorAll('button'),"Tilføj til kurv")
        return Array.from(document.querySelectorAll('#product-addtocart-button'));
    },

    getCartItems: (e: HTMLElement) => {
        // TODO: FIX
        if (!location.href.includes('EXAMPLE')) return [];

        const items = document.querySelectorAll('.EXAMPLE');

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('.EXAMPLE')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.EXAMPLE')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});


getters.register("cocopanda.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];

        return Array.from(document.querySelectorAll<HTMLElement>('a[href="/klarna"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('.add-to-cart-button, .add-to-cart-icon'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];

        const items = document.querySelectorAll('.product-card-footer');

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.strong.cart-product-quantity')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-product-price-wrapper .price-text')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        }).filter(p => p.price !== 0);
    }
});

getters.register("mytrendyphone.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('shop/order3')) return [];

        return Array.from(document.querySelectorAll('input[value="Gå til sikker betaling"]')).map(createNeighbour);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('input[value="Læg i kurv"]'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('shop/order3')) return [];

        const items = document.querySelectorAll('.summaryitem');

        return Array.from(items).map(item => {
            const children = item.querySelector('.summaryiteminfo').children;
            const quantity = parseQty(children?.[0]?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(children?.[1]?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("jacobsenplus.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('mcheckout/Step3')) return [];

        return Array.from(document.querySelectorAll('input[value="Godkend og betal"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('.item-order-purchase__addtocart, .item__addtocart-submit'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('mcheckout/Step3')) return [];

        const items = document.querySelector('.order-summary__items')?.querySelectorAll('.summary-line')

        if(!items) return [];

        return Array.from(items).map(item => {
            const quantity = parseInt(item.children?.[0]?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.children?.[2]?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("cchobby.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];
        
        return findFromText(document.querySelectorAll<HTMLElement>('button.checkout'),'Afgiv ordre').map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('.amquote-addto-button, #product-addtocart-button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        const items = document.querySelectorAll('.minicart-items li.product-item')

        return Array.from(items).map(item => {
            const quantity = parseQty(item.querySelector('.details-qty')?.textContent ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-price .price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("komplett.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('payment.')) return [];

        return Array.from(document.querySelectorAll('button[data-automationid="confirmButton"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button[data-automationid="AddToCart"], .addtocart-buttonContainer button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('payment.')) return [];

        const items = document.querySelector('.items-listing')?.querySelectorAll('tr[data-automationid="product"]')

        if (!items) return [];

        return Array.from(items).map(item => {

            
            const quantity = parseQty(item.querySelector('span[data-automationid="quantityValue"]')?.textContent ?? "1");
            const {price} = splitPriceCurrency(pickLastChild(item.querySelector('td[data-automationid="productPrice"]'))?.textContent);

            return {
                quantity,
                price: price * quantity,
                currency: 'kr'
            }
        });
    }
});


getters.register("billigparfume.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];

        return Array.from(document.querySelectorAll('input[name="doPlaceOrder"]'));
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll('button.add-to-cart'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/cart')) return [];

        const items = document.querySelectorAll('div.cart-product:not(.cart-product-suggestion)');

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input').value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.cart-product-price .price')?.textContent);

            return {
                quantity,
                price,
                currency
            }
        });
    }
});

getters.register("faraos.dk", {
    placeOrderButtons: (e: HTMLElement) => {
        if (!location.href.includes('/checkout')) return [];

        return findFromText(document.querySelectorAll<HTMLElement>('button.button-arrow-up'),'betaling').map(createInnerChild);
    },

    addToCartButtons: (e: HTMLElement) => {
        return Array.from(document.querySelectorAll<HTMLElement>('.itemslider-item button.button-arrow-up, .trustpilot-big-container button'));
    },

    getCartItems: (e: HTMLElement) => {
        if (!location.href.includes('/basket')) return [];

        const items = document.querySelectorAll('.basket-table tbody tr')

        return Array.from(items).map(item => {
            const quantity = parseInt(item.querySelector('input')?.value ?? "1");
            const {price, currency} = splitPriceCurrency(item.querySelector('.tbl-col-7')?.textContent);

            return {
                quantity,
                price: price / 100,
                currency
            }
        });
    }
});