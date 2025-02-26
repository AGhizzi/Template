import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']  // Note: Changed from styleUrl to styleUrls
})
export class ComponentsComponent implements OnInit {
  // Icons
  faClose = faClose;
  faCheck = faCheck;
  faInfo = faInfo;
  faWarning = faWarning;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faStar = faStar;
  faBell = faBell;

  // Modal properties
  showModal = false;
  showLargeModal = false;
  showConfirmModal = false;
  
  // Toast notifications
  showSuccessToast = false;
  showErrorToast = false;
  showInfoToast = false;
  showWarningToast = false;
  
  // Form
  contactForm: FormGroup;
  formSubmitted = false;
  
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
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  ngOnInit(): void {}
  
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
  
  // Form methods
  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.contactForm.valid) {
      console.log('Form submitted', this.contactForm.value);
      this.showToast('success');
      this.contactForm.reset();
      this.formSubmitted = false;
    } else {
      this.showToast('error');
    }
  }
  
  // Card tabs method
  setActiveCardTab(tabId: string): void {
    this.activeCardTab = tabId;
  }
  
  // Form validation getters
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}