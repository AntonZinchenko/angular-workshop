import { Injectable } from '@angular/core';

export interface IStorageItem {
  key: string;
  value: any;
}

@Injectable()
export class LocalStorageService {

  constructor() {
    if (!localStorage) {
      throw new Error('Local storage not supported');
    }
  }

  get length(): number {
    return localStorage.length;
  }

  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(): void {
    localStorage.clear();
  }

  items(): Array<IStorageItem> {
    const storageContent = new Array<IStorageItem>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      storageContent.push({ key, value });
    }

    return storageContent;
  }
}
