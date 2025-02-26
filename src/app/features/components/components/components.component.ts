import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faRocket, faArrowUp, faCheckCircle, 
  faExclamationTriangle, faInfoCircle, 
  faSave, faEdit, faTrash, faCheck 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class ComponentsComponent {
  // FontAwesome icons
  faRocket = faRocket;
  faArrowUp = faArrowUp;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  faInfoCircle = faInfoCircle;
  faSave = faSave;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheck = faCheck;

  // Modal properties
  showModal = false;
  showLargeModal = false;
  showConfirmModal = false;
  
  // Toast notifications
  showSuccessToast = false;
  showErrorToast = false;
  showInfoToast = false;
  showWarningToast = false;
  
  // Card tabs
  activeCardTab = 'standard';
  
  // Standard Cards
  standardCards = [
    {
      title: 'Basic Card',
      content: 'This is a simple card with basic styling.',
      footer: 'Card footer',
      type: 'basic'
    },
    {
      title: 'Image Card',
      imageUrl: 'https://via.placeholder.com/300x150',
      content: 'This card includes an image at the top.',
      footer: 'Last updated 3 mins ago',
      type: 'image'
    },
    {
      title: 'Action Card',
      content: 'This card has action buttons in the footer.',
      actions: ['Save', 'Cancel', 'Delete'],
      type: 'action'
    },
    {
      title: 'Styled Card',
      content: 'This card has a colored border and background.',
      footer: 'Card with custom styling',
      type: 'styled',
      color: 'primary'
    }
  ];
  

  // Modal methods
  openModal(): void {
    this.showModal = true;
    console.log('Modal opened');
  }
  
  closeModal(): void {
    this.showModal = false;
  }
  
  openLargeModal(): void {
    this.showLargeModal = true;
  }
  
  closeLargeModal(): void {
    this.showLargeModal = false;
  }
  
  openConfirmModal(): void {
    this.showConfirmModal = true;
  }
  
  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }
  
  confirmAction(): void {
    // Do something when user confirms
    this.showSuccessToast = true;
    this.closeConfirmModal();
    
    // Auto hide the toast after 3 seconds
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }
  
  // Toast methods
  showToast(type: 'success' | 'error' | 'info' | 'warning'): void {
    if (type === 'success') this.showSuccessToast = true;
    else if (type === 'error') this.showErrorToast = true;
    else if (type === 'info') this.showInfoToast = true;
    else if (type === 'warning') this.showWarningToast = true;
    
    // Auto hide the toast after 3 seconds
    setTimeout(() => {
      this.closeToast(type);
    }, 3000);
  }
  
  closeToast(type: 'success' | 'error' | 'info' | 'warning'): void {
    if (type === 'success') this.showSuccessToast = false;
    else if (type === 'error') this.showErrorToast = false;
    else if (type === 'info') this.showInfoToast = false;
    else if (type === 'warning') this.showWarningToast = false;
  }

  // Card tabs method
  setActiveCardTab(tabId: string): void {
    this.activeCardTab = tabId;
  }
}