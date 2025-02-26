import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() collapsed = false;
  
  // For responsive design
  isMobile = false;
  
  // Active menu tracking
  activeMenuItem = 'dashboard';
  expandedItems: string[] = [];
  
  // Sidebar background color - can be customized
  sidebarBgColor = '#ffffff';
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}
  
  ngOnInit(): void {
    // Check if mobile
    this.isMobile = window.innerWidth < 768;
    
    // Listen for window resize
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Listen for route changes to set active menu item
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.setActiveMenuItemFromUrl();
    });
    
    // Initialize active menu item based on current URL
    this.setActiveMenuItemFromUrl();
    
    // Subscribe to theme changes to update the sidebar color
    this.themeService.currentTheme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(theme => {
      // Get theme colors from the theme service
      const themeColors = this.themeService.getThemeColors();
      this.sidebarBgColor = themeColors['sidebar'];
    });
  }
  
  /**
   * Toggle sidebar collapse state
   */
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
  
  /**
   * Toggle submenu visibility
   * @param menuItem Menu item to toggle
   */
  toggleSubMenu(menuItem: string): void {
    if (this.expandedItems.includes(menuItem)) {
      this.expandedItems = this.expandedItems.filter(item => item !== menuItem);
    } else {
      this.expandedItems.push(menuItem);
    }
    
    // On mobile or when sidebar is collapsed, navigate to the first submenu item
    if (this.isMobile || this.collapsed) {
      if (menuItem === 'charts') {
        this.router.navigate(['/charts/bar-charts']);
      }
    }
  }
  
  /**
   * Set active menu item
   * @param menuItem Menu item to activate
   */
  setActiveMenuItem(menuItem: string): void {
    this.activeMenuItem = menuItem;
    
    // If clicking a submenu item, make sure parent is expanded
    if (menuItem === 'bar-charts' || menuItem === 'pie-charts' || menuItem === 'line-charts') {
      if (!this.expandedItems.includes('charts')) {
        this.expandedItems.push('charts');
      }
    }
  }
  
  /**
   * Set the active menu item based on the current URL
   */
  private setActiveMenuItemFromUrl(): void {
    const url = this.router.url;
    
    if (url.includes('/dashboard')) {
      this.activeMenuItem = 'dashboard';
    } else if (url.includes('/charts/bar-charts')) {
      this.activeMenuItem = 'bar-charts';
      this.expandedItems = ['charts'];
    } else if (url.includes('/charts/pie-charts')) {
      this.activeMenuItem = 'pie-charts';
      this.expandedItems = ['charts'];
    } else if (url.includes('/charts/line-charts')) {
      this.activeMenuItem = 'line-charts';
      this.expandedItems = ['charts'];
    } else if (url.includes('/tables')) {
      this.activeMenuItem = 'tables';
    } else if (url.includes('/buttons')) {
      this.activeMenuItem = 'buttons';
    }
  }
  
  /**
   * Handle window resize
   */
  private handleResize(): void {
    this.isMobile = window.innerWidth < 768;
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.destroy$.next();
    this.destroy$.complete();
  }
}
