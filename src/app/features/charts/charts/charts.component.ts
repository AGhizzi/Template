import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, AfterViewInit {
  activeTab = 'overview';
  
  constructor() {}
  
  ngOnInit(): void {
    // Initialize component
  }
  
  ngAfterViewInit(): void {
    this.initCharts();
  }
  
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
  
  initCharts(): void {
    // Sample charts for the overview section
    this.initBarChartSample();
    this.initLineChartSample();
    this.initPieChartSample();
    
    // Detailed charts for each tab
    this.initBarCharts();
    this.initLineCharts(); 
    this.initPieCharts();
  }
  
  // Sample Charts for Overview Tab
  initBarChartSample(): void {
    const ctx = document.getElementById('barChartSample') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  initLineChartSample(): void {
    const ctx = document.getElementById('lineChartSample') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Users',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  initPieChartSample(): void {
    const ctx = document.getElementById('pieChartSample') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: 'Dataset',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  // Detailed Bar Charts
  initBarCharts(): void {
    this.initVerticalBarChart();
    this.initHorizontalBarChart();
    this.initStackedBarChart();
  }
  
  initVerticalBarChart(): void {
    const ctx = document.getElementById('verticalBarChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: '2023 Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }, {
          label: '2024 Sales',
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }
  
  initHorizontalBarChart(): void {
    const ctx = document.getElementById('horizontalBarChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia'],
        datasets: [{
          label: 'Market Share (%)',
          data: [35, 15, 25, 20, 3, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Percentage (%)'
            }
          }
        }
      }
    });
  }
  
  initStackedBarChart(): void {
    const ctx = document.getElementById('stackedBarChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Product A',
            data: [50, 60, 70, 180],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          },
          {
            label: 'Product B',
            data: [100, 80, 120, 60],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          },
          {
            label: 'Product C',
            data: [30, 50, 35, 60],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgb(255, 206, 86)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Quarter'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($K)'
            }
          }
        }
      }
    });
  }
  
  // Detailed Line Charts
  initLineCharts(): void {
    this.initBasicLineChart();
    this.initMultiLineChart();
    this.initAreaChart();
  }
  
  initBasicLineChart(): void {
    const ctx = document.getElementById('basicLineChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Monthly Active Users',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Users (K)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }
  
  initMultiLineChart(): void {
    const ctx = document.getElementById('multiLineChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Desktop',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Mobile',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },
          {
            label: 'Tablet',
            data: [17, 28, 39, 36, 28, 38, 20],
            fill: false,
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sessions (K)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }
  
  initAreaChart(): void {
    const ctx = document.getElementById('areaChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Revenue Growth',
          data: [65, 78, 90, 105, 125, 150, 170],
          fill: true,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($K)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }
  
  // Detailed Pie Charts
  initPieCharts(): void {
    this.initBasicPieChart();
    this.initDonutChart();
    this.initNestedPieChart();
  }
  
  initBasicPieChart(): void {
    const ctx = document.getElementById('basicPieChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        datasets: [{
          label: 'Sales Distribution',
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Product Sales Distribution'
          }
        }
      }
    });
  }
  
  initDonutChart(): void {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          label: 'Traffic Source',
          data: [55, 35, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 206, 86)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Website Traffic by Device'
          }
        }
      }
    });
  }
  
  initNestedPieChart(): void {
    const ctx = document.getElementById('nestedPieChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    // For a true nested pie chart, we'd need a more advanced library or custom implementation
    // This is simplified to demonstrate the concept
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'North America - Desktop', 
          'North America - Mobile',
          'Europe - Desktop', 
          'Europe - Mobile',
          'Asia - Desktop', 
          'Asia - Mobile'
        ],
        datasets: [{
          label: 'Regional Device Usage',
          data: [20, 15, 15, 10, 25, 15],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.4)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(75, 192, 192, 0.4)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Regional Device Distribution'
          }
        }
      }
    });
  }
}
