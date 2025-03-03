import type { ShoppingItem } from "./getters";
import { PersistentValue } from "./utils";

type Purchase = {
    time: number;
    items: ShoppingItem[];
}


const DOMAIN = document.location.hostname;
const LOCAL_CART_STORAGE_KEY = DOMAIN + "-cart";

export const purchases = new PersistentValue<Purchase[]>("purchases", []);
export const cart = new PersistentValue<ShoppingItem[]>(LOCAL_CART_STORAGE_KEY);