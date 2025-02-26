import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { ThemeSwitcherComponent } from '../../../shared/components/theme-switcher/theme-switcher.component';
import { UserService } from '../../database/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  // User profile
  userProfileImage = '/assets/images/default-avatar.png';
  userName = 'John Doe';
  userRole = 'Administrator';
  
  // Page title based on current route
  pageTitle = 'Dashboard';
  
  // Toast notifications
  showSuccessToast = false;
  showErrorToast = false;
  showWarningToast = false;
  showInfoToast = false;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    // Set page title based on route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const urlSegments = this.router.url.split('/').filter(segment => segment);
      
      if (urlSegments.length > 0) {
        // Format the last segment as page title (capitalize first letter)
        const segment = urlSegments[urlSegments.length - 1];
        this.pageTitle = segment.charAt(0).toUpperCase() + segment.slice(1);
      } else {
        this.pageTitle = 'Dashboard';
      }
    });
    
    // Get user profile data
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.userProfileImage = user.profilePicture;
          this.userName = `${user.firstName} ${user.lastName}`;
          this.userRole = user.role;
        }
      });
    
    // Load user profile if needed
    this.userService.getUserProfile().subscribe();
  }
  
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  // Toast notification methods
  showToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    if (type === 'success') this.showSuccessToast = true;
    else if (type === 'error') this.showErrorToast = true;
    else if (type === 'warning') this.showWarningToast = true;
    else if (type === 'info') this.showInfoToast = true;
    
    setTimeout(() => {
      this.closeToast(type);
    }, 5000); // Auto close after 5 seconds
  }
  
  closeToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    if (type === 'success') this.showSuccessToast = false;
    else if (type === 'error') this.showErrorToast = false;
    else if (type === 'warning') this.showWarningToast = false;
    else if (type === 'info') this.showInfoToast = false;
  }
  
  closeSuccessToast(): void {
    this.showSuccessToast = false;
  }
  
  closeErrorToast(): void {
    this.showErrorToast = false;
  }
  
  closeWarningToast(): void {
    this.showWarningToast = false;
  }
  
  closeInfoToast(): void {
    this.showInfoToast = false;
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
