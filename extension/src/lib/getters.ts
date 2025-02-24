
export type ElementGetters = {
    checkoutButtons: (e: HTMLElement) => Element[];
    placeOrderButtons: (e: HTMLElement) => Element[];
    checkoutButtonLabels: (e: HTMLElement) => Element[];
    addToCartButtons: (e: HTMLElement) => Element[];
    getCartItems: (e: HTMLElement) => ShoppingItem[];
}

export type ShoppingItem = {
    quantity: number;
    price: number;
    currency: string;
}

type GetterRegister = {
    register: (domain: string, getters: ElementGetters) => void;
    _getters: Map<string,ElementGetters>;
    getDomainGetters : () => ElementGetters;
}

function splitPriceCurrency(price: string) {
    const numericPrice = price.match(/[\d,.]+/);
    const currency = price.replace(numericPrice ? numericPrice[0] : '', '');
    return { price: parseFloat(numericPrice[0].replace(',', '.')), currency };
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
    "www.bombas.com",
    "www.ruggable.com",
    "www.chubbiesshorts.com",
    "www.beardbrand.com",
    "www.mvmt.com",
    "www.puravidabracelets.com",
    "www.fashionphile.com",
    "www.nativecos.com",
    "www.hauslabs.com",
    "www.kkwbeauty.com",
    "www.harney.com",
    "www.redbullshopus.com",
    "www.tula.com",
    "shop.tesla.com",
    "www.spiritualgangster.com",
    "www.outdoorvoices.com",
    "www.taylorstitch.com",
    "www.american-giant.com",
    "www.manscaped.com",
    "www.drsquatch.com",
    "www.mejuri.com",
    "www.peets.com",
    "www.deathwishcoffee.com",
    "www.bluebottlecoffee.com",
    "drink.haus",
    "www.hellotushy.com",
    "www.brooklyncandlestudio.com",
    "www.bando.com",
    "www.moroccanoil.com",
    "www.decenmia.com",
    "www.negativeunderwear.com",
    "www.kotn.com",
    "www.birdies.com",
    "www.naadam.co",
    "www.adoreme.com",
    "www.primalkitchen.com",
    "www.huel.com",
    "www.flovitamins.com",
    "www.popflexactive.com",
    "www.aloyoga.com",
    "www.sugarfina.com",
    "www.moderncitizen.com",
    "www.greatjonesgoods.com",
    "www.buffy.co",
    "www.pinklily.com",
    "www.misen.com",
    "www.carawayhome.com",
    "www.materialkitchen.com",
    "www.glossier.com",
    "www.hedleyandbennett.com",
    "www.starface.world",
    "www.youthtothepeople.com",
    "myhydro.hydroflask.com",
    "www.rumpl.com",
    "www.therabody.com",
    "www.aesop.com",
    "www.iliabeauty.com",
    "www.mizzenandmain.com",
    "www.marinelayer.com",
    "www.ohpolly.com",
    "www.happysocks.com",
    "www.tecovas.com",
    "stance.com",
    "eu.stance.com",
    "www.spongelle.com",
    "www.trueclassictees.com",
    "www.meundies.com",
    "www.nuggetsofwisdom.com",
    "www.studs.com",
    "www.jackhenry.co",
    "www.luxyhair.com",
    "www.juicycouture.com",
    "www.everlast.com",
    "www.getstix.co",
    "www.skims.com",
    "www.feals.com",
    "www.foursigmatic.com",
    "www.golde.co",
    "www.liquid-iv.com",
    "www.readyjudy.com",
    "www.thesill.com",
    "www.wearlively.com",
    "www.andieswim.com",
    "www.yourparade.com",
    "www.brightland.co",
    "www.omsom.com",
    "www.jenis.com",
    "www.partakefoods.com",
    "www.snowehome.com",
    "www.imperfectfoods.com",
    "www.graza.co",
    "www.flybyjing.com",
    "www.getmaude.com",
    "www.ugmonk.com",
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
    register: function(domain: string, getters: ElementGetters) {
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

        if (shopifyDomains.includes(domain)) return this._getters.get("shopify") || {
            checkoutButtons: (e: HTMLElement) => [],
            placeOrderButtons: (e: HTMLElement) => [],
            checkoutButtonLabels: (e: HTMLElement) => [],
            addToCartButtons: (e: HTMLElement) => [],
            getCartItems: (e: HTMLElement) => []
        } 
        return this._getters.get(domain) || {
            checkoutButtons: (e: HTMLElement) => [],
            placeOrderButtons: (e: HTMLElement) => [],
            checkoutButtonLabels: (e: HTMLElement) => [],
            addToCartButtons: (e: HTMLElement) => [],
            getCartItems: (e: HTMLElement) => []
        };
    }
}

getters.register('www.amazon.com', {
    checkoutButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    checkoutButtonLabels: (e: HTMLElement) => { 
      const buttons = e.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('#add-to-cart-button, [name="submit.addToCart"], .add-to-cart .a-button-input, input[data-asin], div[data-csa-c-action="addToCart"] button, input[name="submit.gc-add-to-cart"], div.ucw-cards-product-atc button, div[data-testid="point-area"] div div div div div div div div div div div div div div button');
      return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const cart = e.querySelector<HTMLElement>('.sc-list-body');
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
    }
});

getters.register('www.zalando.dk', {
    checkoutButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },
    
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },

    addToCartButtons: (e: HTMLElement) => {
        const checkOutBox = e.querySelector<HTMLElement>('div[data-testid="pdp-add-to-cart"]')
        if (!checkOutBox) return [];
        const buttons = Array.from(checkOutBox.querySelectorAll('button')).filter(button => !button.hasAttribute('data-testid'));
        return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const itemElements = e.querySelectorAll('article.cart-product-card');
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
        const buttons = e.querySelectorAll('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },
  
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
  
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[id="Continue to checkout button"]')
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
        const buttons = e.querySelectorAll('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-test-id="cart-checkout-button"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-test-id="cta-top"]')
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
        const buttons = e.querySelectorAll('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"], button[data-test-id="CONFIRM_AND_PAY_BUTTON"]')
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

    getCartItems: (e: HTMLElement) => {
        const listings = e.querySelectorAll<HTMLElement>('.line-item--listings');
        if (!listings) return [];

        return Array.from(listings).map(l => {
            const price = l.querySelector<HTMLElement>('.item-price');
            const quantity = l.querySelector<HTMLInputElement | HTMLSelectElement>('.item-quantity select, .item-quantity input');
            if (!price || !quantity) return;
            const q = parseInt(quantity.value);
            return {
                quantity: q,
                price: (splitPriceCurrency(price.innerText).price) / q,
                currency: splitPriceCurrency(price.innerText).currency
            };
        });
    }
})

getters.register("www.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
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
        
        const x = Array.from(document.querySelectorAll<HTMLElement>('button[less-button="place-order"]'))
        
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
})

getters.register("www.proshop.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[name="paymentOption"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"], span[data-amountformat="dubbleLine"]')
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
                //@ts-expect-error .value is a valid field.
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
        const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
        return Array.from(buttons)
    },  

    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('.checkout-order-confirmation__content button')
        return Array.from(buttons)
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], button[class="palette-button palette-button--primary-boozt palette-button--medium palette-button--rectangle palette-button--expanded palette-button--horizontal-align-center shopcart-quick-checkout__button"], .checkout-order-confirmation__content button')
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



function shopifyExtender(remainders: Omit<ElementGetters, 'getCartItems' | 'placeOrderButtons'>) : ElementGetters {
    return {
        ...remainders,
        checkoutButtonLabels: (e: HTMLElement) => {
            // TODO: REPLACE WITH ACTUAL SELECTOR
            const buttons = e.querySelectorAll('SOME BUTTONS');

            // merge
            return [...Array.from(buttons), ...remainders.checkoutButtonLabels(e)];
        },
        getCartItems: (e: HTMLElement) => {
            // TODO: REPLACE WITH ACTUAL SELECTOR
            return [];
        },
        placeOrderButtons: (e: HTMLElement) => {
            // TODO: REPLACE WITH ACTUAL SELECTOR
            return [];
        }
    };

}

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

getters.register("shopify", {
    checkoutButtons:(e: HTMLElement) => {
        return [];
    },  

    placeOrderButtons:(e: HTMLElement) => {
        console.log("OH YES WE ARE POPPING")
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"]');
        return Array.from(button);
    },

    checkoutButtonLabels:(e: HTMLElement) => {
        const button = e.querySelectorAll<HTMLElement>('button[id="checkout-pay-button"]');
        return Array.from(button);
    },

    addToCartButtons: (e: HTMLElement) => {
       return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

// TODO: EXAMPLE:
// getters.register("www.huel.com", shopifyExtender({
//     checkoutButtons:(e: HTMLElement) => {
//         const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
//         return Array.from(buttons)
//     },  
//     addToCartButtons: (e: HTMLElement) => {
//         const buttons = e.querySelectorAll<HTMLElement>('div[class="product-actions__add-to-cart"]');
//         return Array.from(buttons);
//     },
//     checkoutButtonLabels: (e: HTMLElement) => {
//         const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], button[class="palette-button palette-button--primary-boozt palette-button--medium palette-button--rectangle palette-button--expanded palette-button--horizontal-align-center shopcart-quick-checkout__button"], .checkout-order-confirmation__content button')
//         return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
//     }
// }))
