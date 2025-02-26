import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Adding pagination methods
  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }
  
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  getPageArray(): number[] {
    const pages = [];
    for (let i = 1; i <= this.getTotalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
  // Chart references
  @ViewChild('revenueChart') revenueChartCanvas!: ElementRef;
  @ViewChild('platformChart') platformChartCanvas!: ElementRef;
  
  // Chart instances
  revenueChart!: Chart;
  platformChart!: Chart;
  
  // Data
  revenueData: any;
  platformData: any;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 15;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    // Load chart data
    this.fetchChartData();
  }
  
  ngAfterViewInit(): void {
    // Initialize charts with static data to ensure they load properly
    setTimeout(() => {
      this.initRevenueChart();
      this.initPlatformChart();
    }, 500);
  }
  
  fetchChartData(): void {
    // Static revenue data
    this.revenueData = {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      currentYear: [4500, 5200, 6800, 7200, 9200, 8400, 10500, 11200, 12800, 14900, 16200, 18500],
      previousYear: [3800, 4100, 5000, 6300, 6900, 7200, 8400, 9500, 10000, 11500, 13200, 15000]
    };
    
    // Static platform engagement data
    this.platformData = {
      platforms: ["Desktop", "Mobile", "Tablet", "iOS App", "Android App"],
      users: [6500, 8900, 2300, 4700, 5100],
      sessions: [12000, 19000, 3200, 7500, 8700],
      colors: ["#1976d2", "#2196f3", "#64b5f6", "#90caf9", "#bbdefb"]
    };
  }
  
  initRevenueChart(): void {
    if (this.revenueChartCanvas && this.revenueData) {
      const ctx = this.revenueChartCanvas.nativeElement.getContext('2d');
      
      this.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.revenueData.months,
          datasets: [
            {
              label: 'Current Year',
              data: this.revenueData.currentYear,
              borderColor: '#1976d2',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            },
            {
              label: 'Previous Year',
              data: this.revenueData.previousYear,
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
  }
  
  initPlatformChart(): void {
    if (this.platformChartCanvas && this.platformData) {
      const ctx = this.platformChartCanvas.nativeElement.getContext('2d');
      
      this.platformChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.platformData.platforms,
          datasets: [
            {
              label: 'Users',
              data: this.platformData.users,
              backgroundColor: 'rgba(25, 118, 210, 0.7)',
              borderColor: 'rgba(25, 118, 210, 1)',
              borderWidth: 1
            },
            {
              label: 'Sessions',
              data: this.platformData.sessions,
              backgroundColor: 'rgba(76, 175, 80, 0.7)',
              borderColor: 'rgba(76, 175, 80, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
  }
}
