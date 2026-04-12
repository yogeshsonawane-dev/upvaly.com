import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, startWith, switchMap, catchError, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HealthStatus {
  ui: 'healthy' | 'degraded' | 'down' | 'unknown';
  api: 'healthy' | 'degraded' | 'down' | 'unknown';
  dependencies?: { [key: string]: string };
  lastChecked: Date;
}

export interface ServiceHealth {
  [serviceName: string]: HealthStatus;
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private services = {
    famvest: {
      ui: 'https://famvest.upvaly.com',
      api: 'https://api.famvest.upvaly.com/public/health'
    },
    netly: {
      ui: 'https://netly.upvaly.com',
      api: 'https://api.netly.upvaly.com/public/health'
    },
    finapi: {
      ui: 'https://finapi.upvaly.com',
      api: 'https://api.finapi.upvaly.com/api/public/health'
    }
  };

  constructor(private http: HttpClient) {}

  getHealthStatus(): Observable<ServiceHealth> {
    return interval(30000).pipe(
      startWith(0),
      switchMap(() => this.checkAllServices())
    );
  }

  private checkAllServices(): Observable<ServiceHealth> {
    const serviceNames = Object.keys(this.services);
    const healthObservables = serviceNames.map(serviceName =>
      this.checkService(serviceName).pipe(
        map(health => ({ [serviceName]: health })),
        catchError(() => of({ [serviceName]: {
          ui: 'unknown' as const,
          api: 'unknown' as const,
          lastChecked: new Date()
        } }))
      )
    );

    return combineLatest(healthObservables).pipe(
      map(results => results.reduce((acc, curr) => ({ ...acc, ...curr }), {} as ServiceHealth))
    );
  }

  private checkService(serviceName: string): Observable<HealthStatus> {
    const service = this.services[serviceName as keyof typeof this.services];

    const uiCheck = this.checkEndpoint(service.ui).pipe(
      catchError(() => of('down' as const))
    );

    const apiCheck = this.checkApiHealth(service.api).pipe(
      catchError(() => of(null))
    );

    return combineLatest([uiCheck, apiCheck]).pipe(
      map(([ui, apiResult]) => ({
        ui,
        api: this.mapApiStatus(apiResult),
        dependencies: apiResult?.dependencies,
        lastChecked: new Date()
      }))
    );
  }

  private checkEndpoint(url: string): Observable<'healthy' | 'down'> {
    return this.http.get(url, { observe: 'response', responseType: 'text' }).pipe(
      map((response: any) => response.status === 200 ? 'healthy' as const : 'down' as const),
      catchError(() => of('down' as const))
    );
  }

  private checkApiHealth(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError(() => of(null))
    );
  }

  private mapApiStatus(apiResponse: any): 'healthy' | 'degraded' | 'down' | 'unknown' {
    if (!apiResponse) return 'down';
    if (apiResponse.status === 'healthy') {
      if (apiResponse.dependencies) {
        const deps = Object.values(apiResponse.dependencies) as string[];
        if (deps.some(dep => dep !== 'UP')) return 'degraded';
      }
      return 'healthy';
    }
    return 'down';
  }
}
