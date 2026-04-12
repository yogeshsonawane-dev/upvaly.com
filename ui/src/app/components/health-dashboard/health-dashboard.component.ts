import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HealthService, ServiceHealth } from '../../services/health.service';

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './health-dashboard.component.html',
  styleUrls: ['./health-dashboard.component.css'],
  standalone: false
})
export class HealthDashboardComponent implements OnInit, OnDestroy {
  healthStatus: ServiceHealth = {};
  private subscription: Subscription = new Subscription();

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.subscription = this.healthService.getHealthStatus().subscribe(status => {
      this.healthStatus = status;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getStatusColor(status: string | undefined): string {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  }

  getStatusIcon(status: string | undefined): string {
    switch (status) {
      case 'healthy': return 'fa-check-circle';
      case 'degraded': return 'fa-exclamation-triangle';
      case 'down': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
  }

  getStatusBgColor(status: string | undefined): string {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  formatLastChecked(date: Date): string {
    return date.toLocaleString();
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
