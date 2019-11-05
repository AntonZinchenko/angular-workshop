import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AppSettingEnity } from '../models/config';
import defaultSettings from 'src/assets/app-settings.json';
import { Observable, of } from 'rxjs';
import { repeat, catchError, tap } from 'rxjs/operators';

const CONFIG_ITEM_KEY = 'appSettings';

@Injectable()
export class AppSettings {

  constructor(private storage: LocalStorageService) {}

  get default(): AppSettingEnity {
    return new AppSettingEnity('default title', 'v1.0');
  }

  get data$(): Observable<AppSettingEnity> {
    return of(JSON.parse(this.storage.getItem(CONFIG_ITEM_KEY)) || defaultSettings)
      .pipe(
        tap((data: AppSettingEnity) => this.storage.setItem(CONFIG_ITEM_KEY, JSON.stringify(data))),
        repeat(3),
        catchError((err) => {
          console.error(err);
          this.storage.setItem(CONFIG_ITEM_KEY, JSON.stringify(this.default));
          return of(this.default);
        })
      );
  }
}
