import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class PersistentValue<T> {
  private _value : T | null = null;
  private _key : string;
  private _listeners : ((value: T | null) => void)[] = [];

  constructor(key: string) {
    this._key = key;
    this._init();
  }

  get value() : T | null {
    return this._value;
  }

  set value(value: T | null) {
    if (value === this._value) return;
    this._value = value;
    chrome.storage.local.set({[this._key]: value});
    this._listeners.forEach((listener) => listener(value));
  }

  onChange(f: (value: T | null) => void) {
    this._listeners.push(f);
  }

  removeOnChange(f: (value: T | null) => void) {
    this._listeners = this._listeners.filter((listener) => listener !== f);
  }

  private _init() {
    chrome.storage.local.get(this._key, (data) => {
      this._value = data[this._key] ?? null;
    });
  }
}