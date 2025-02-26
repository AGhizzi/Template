import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear: number;
  
  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  
  ngOnInit(): void {
    // Additional initialization can be done here if needed
  }
}
