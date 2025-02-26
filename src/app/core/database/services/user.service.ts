import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  // Flag to check if the user is authenticated
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService) {
    // Check for saved user in localStorage on init
    this.checkUserInStorage();
  }

  /**
   * Load user data from storage if available
   */
  private checkUserInStorage(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * Get authenticated user data
   * This is a placeholder for an actual API call
   */
  getUserProfile(): Observable<User> {
    // Replace 'users/profile' with your actual API endpoint
    return this.apiService.get<User>('users/profile').pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError(error => {
        console.error('Error fetching user profile', error);
        this.isAuthenticatedSubject.next(false);
        return of({
          // Fallback mock user data for demo purpose
          id: '1',
          username: 'demo_user',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: '/assets/images/default-avatar.png',
          role: 'User',
          permissions: ['read']
        });
      })
    );
  }

  /**
   * Clear user data on logout
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Get full name of current user
   */
  getUserFullName(): string {
    const user = this.currentUserSubject.value;
    return user ? `${user.firstName} ${user.lastName}` : 'Guest User';
  }

  /**
   * Check if user has specific permission
   * @param permission Permission to check
   */
  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) || false;
  }

  /**
   * Get current user's profile picture
   */
  getProfilePicture(): string {
    const user = this.currentUserSubject.value;
    return user?.profilePicture || '/assets/images/default-avatar.png';
  }
}
