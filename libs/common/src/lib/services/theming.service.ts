import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  private readonly storageKey = 'theme';
  private readonly themes: ThemeType[] = ['dark', 'light'];
  private themeSubject = new BehaviorSubject<ThemeType>('light');
  theme$ = this.themeSubject.asObservable();

  constructor(private ref: ApplicationRef) {
    // 1. LocalStorage’da varsa onu al burası şimdilik kullanılmayacak
    // const storedTheme = localStorage.getItem(this.storageKey) as ThemeType | null;
    // if (storedTheme && this.themes.includes(storedTheme)) {
    //   this.setTheme(storedTheme);
    //   return;
    // }

    // 2. Sistem ayarına bak
    const darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(darkModeOn ? 'dark' : 'light');

    // 3. Sistem değişikliklerini dinle
    // window.matchMedia('(prefers-color-scheme: dark)')
    //   .addEventListener('change', (event) => {
    //     this.setTheme(event.matches ? 'dark' : 'light');
    //     this.ref.tick(); // UI güncellemesi için
    //   });
  }

  get currentTheme(): ThemeType {
    return this.themeSubject.value;
  }

  setTheme(theme: ThemeType) {
    this.themeSubject.next(theme);
    localStorage.setItem(this.storageKey, theme);
  }
}
