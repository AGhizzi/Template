import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit, OnDestroy {
  /** Whether the sidebar is collapsed or expanded */
  sidebarCollapsed = false;
  
  /** Whether dark theme is active */
  isDarkTheme = false;
  
  /** Subject to cleanup subscriptions on destroy */
  private destroy$ = new Subject<void>();
  
  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Auto-collapse sidebar on mobile when navigating
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (window.innerWidth < 768) {
        this.sidebarCollapsed = true;
      }
    });
    
    // Subscribe to theme changes
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.isDarkTheme = theme === Theme.DARK;
      });
    
    // Initial sidebar state based on screen size
    this.sidebarCollapsed = window.innerWidth < 768;
    
    // Listen for window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  /**
   * Toggle sidebar collapsed state
   */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  
  /**
   * Handle window resize event
   */
  private handleResize(): void {
    if (window.innerWidth < 768) {
      this.sidebarCollapsed = true;
    }
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.destroy$.next();
    this.destroy$.complete();
  }
}
