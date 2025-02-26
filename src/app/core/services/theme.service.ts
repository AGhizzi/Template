import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum Theme {
  LIGHT = 'light-theme',
  DARK = 'dark-theme'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentThemeSubject = new BehaviorSubject<Theme>(Theme.LIGHT);
  currentTheme$ = this.currentThemeSubject.asObservable();

  // Default theme colors - can be modified for custom themes
  private readonly themeColors: Record<Theme, Record<string, string>> = {
    [Theme.LIGHT]: {
      primary: '#1976d2',
      secondary: '#424242',
      accent: '#ff4081',
      background: '#f5f5f5',
      sidebar: '#ffffff',
      text: '#212121',
      border: '#e0e0e0'
    },
    [Theme.DARK]: {
      primary: '#90caf9',
      secondary: '#616161',
      accent: '#ff80ab',
      background: '#303030',
      sidebar: '#212121',
      text: '#ffffff',
      border: '#424242'
    }
  };

  constructor(rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  /**
   * Initialize theme from saved preference or system preference
   */
  private initializeTheme(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && Object.values(Theme).includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      // Use system preference as fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? Theme.DARK : Theme.LIGHT);
      }
    });
  }

  /**
   * Set the current theme
   * @param theme Theme to set
   */
  setTheme(theme: Theme): void {
    // Remove current theme class
    this.currentThemeSubject.value && 
      this.renderer.removeClass(document.body, this.currentThemeSubject.value);
    
    // Add new theme class
    this.renderer.addClass(document.body, theme);
    
    // Update CSS variables for theming
    this.updateCssVariables(theme);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Update subject
    this.currentThemeSubject.next(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.setTheme(newTheme);
  }

  /**
   * Check if current theme is dark
   */
  isDarkTheme(): boolean {
    return this.currentThemeSubject.value === Theme.DARK;
  }

  /**
   * Update CSS custom properties for theming
   * @param theme Current theme
   */
  private updateCssVariables(theme: Theme): void {
    const colors = this.themeColors[theme];
    
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
  }

  /**
   * Update a specific color in the current theme
   * @param colorName Color to update
   * @param value New color value
   */
  updateThemeColor(colorName: string, value: string): void {
    const currentTheme = this.currentThemeSubject.value;
    
    if (this.themeColors[currentTheme][colorName]) {
      this.themeColors[currentTheme][colorName] = value;
      document.documentElement.style.setProperty(`--${colorName}-color`, value);
    }
  }

  /**
   * Get the current theme colors
   */
  getThemeColors(): Record<string, string> {
    return {...this.themeColors[this.currentThemeSubject.value]};
  }

  /**
   * Update the sidebar color specifically
   * @param color New sidebar color
   */
  updateSidebarColor(color: string): void {
    this.updateThemeColor('sidebar', color);
  }
}
