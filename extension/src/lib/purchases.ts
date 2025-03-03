import type { ShoppingItem } from "./getters";
import { PersistentValue } from "./utils";

type Purchase = {
    time: number;
    items: ShoppingItem[];
}

export const purchases = new PersistentValue<Purchase[]>("purchases", []);