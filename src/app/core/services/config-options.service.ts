import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ConfigEnity } from '../models/config';

const CONFIG_ITEM_KEY = 'config';

@Injectable()
export class ConfigOptionsService {

  constructor(private storage: LocalStorageService) { }

  get default(): ConfigEnity {
    return new ConfigEnity('1', 'test', 'test@mail.ru');
  }

  get config(): ConfigEnity {
    return JSON.parse(this.storage.getItem(CONFIG_ITEM_KEY)) || this.default;
  }

  set config(data) {
    if (data) {
      this.storage.setItem(CONFIG_ITEM_KEY, JSON.stringify(data));
    }
  }
}
