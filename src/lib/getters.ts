
export type ElementGetters = {
    checkoutButtons: () => Element[];
    placeOrderButtons: () => Element[];
    checkoutButtonLabels: () => Element[];
    addToCartButtons: () => Element[];
}

type GetterRegister = {
    register: (domain: string, getters: ElementGetters) => void;
    _getters: Map<string,ElementGetters>;
    getDomainGetters : () => ElementGetters;
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
        return this._getters.get(domain) || {
            checkoutButtons: () => [],
            placeOrderButtons: () => [],
            checkoutButtonLabels: () => []
        };
    }
}

getters.register('www.amazon.com',  {
    checkoutButtons: () => {
      const buttons = document.querySelectorAll('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },

    placeOrderButtons: () => {
      const buttons = document.querySelectorAll('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    checkoutButtonLabels: () => {
      const buttons = document.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    },

    addToCartButtons: () => {
      const buttons = document.querySelectorAll('#add-to-cart-button, input[name="submit.addToCart"], .add-to-cart .a-button-input');
      buttons.forEach(button => button.parentElement.style.backgroundColor = 'red');
      return Array.from(buttons);
    }
}
);

getters.register('www.zalando.dk', {
    checkoutButtons: () => {
        const buttons = document.querySelectorAll('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },

    placeOrderButtons: () => {
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },
    
    checkoutButtonLabels: () => {
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        //@ts-expect-error
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },

    addToCartButtons: () => {
        return [];
      }
});
//TODO - Not working because of client side rendering
getters.register("www.walmart.com", {
    checkoutButtons: () => {
        const buttons = document.querySelectorAll('button[id="Continue to checkout button"]')
        console.log(buttons)
        return Array.from(buttons)
    },
  
    placeOrderButtons: () => {
        const buttons = document.querySelectorAll('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },
  
    checkoutButtonLabels: () => {
        const buttons = document.querySelectorAll('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },

    addToCartButtons: () => {
      return []
    }
  })

  getters.register("cart.ebay.com", {
    checkoutButtons() {
        const buttons = document.querySelectorAll('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },  
    placeOrderButtons() {
        const buttons = document.querySelectorAll('button[data-test-id="cart-checkout-button"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels() {
        const buttons = document.querySelectorAll('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },
    addToCartButtons() {
      return []
    }
})

    getters.register("www.ebay.com", {
        checkoutButtons() {
            const buttons = document.querySelectorAll('#binBtn_btn_1, a[_sp="p4375194.m45024.l44798"]')
            return Array.from(buttons)
        },  
        placeOrderButtons() {
            const buttons = document.querySelectorAll('button[data-test-id="cart-checkout-button"]')
            return Array.from(buttons)
        },
        checkoutButtonLabels() {
            const buttons = document.querySelectorAll('div[data-testid="x-bin-action"], , a[_sp="p4375194.m45024.l44798"]')
            //@ts-expect-error
            return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
        },
        addToCartButtons() {
          return []
        }
    })

    //TODO - Reactive components, create mutation observer
    getters.register("www.matas.dk", {
        checkoutButtons() {
            const buttons = document.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh BasketPowerstepOpener__StyledButtonWithSpinner-sc-1s4iypb-1 BasketPowerstepOpener___StyledStyledButtonWithSpinner-sc-1s4iypb-2 VvhEn bFKtaQ"]')
            return Array.from(buttons)
        },  
        placeOrderButtons() {
            const buttons = document.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh BasketPowerstepOpener__StyledButtonWithSpinner-sc-1s4iypb-1 BasketPowerstepOpener___StyledStyledButtonWithSpinner-sc-1s4iypb-2 VvhEn bFKtaQ"]')
            return Array.from(buttons)
        },
        checkoutButtonLabels() {
            const buttons = document.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh BasketPowerstepOpener__StyledButtonWithSpinner-sc-1s4iypb-1 BasketPowerstepOpener___StyledStyledButtonWithSpinner-sc-1s4iypb-2 VvhEn bFKtaQ"]')
            //@ts-expect-error
            return Array.from(buttons.entries().map(([_, element]) => element.querySelector('div')));
        },
        addToCartButtons() {
          return []
        }
    })

    getters.register("www.proshop.dk", {
        checkoutButtons() {
            const buttons = document.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
            return Array.from(buttons)
        },  
        placeOrderButtons() {
            const buttons = document.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
            return Array.from(buttons)
        },
        checkoutButtonLabels() {
            const buttons = document.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
            return Array.from(buttons)
        },
        addToCartButtons() {
          return []
        }
    })

