import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { FamvestComponent } from './components/famvest/famvest.component';
import { NetlyComponent } from './components/netly/netly.component';
import { FinapiComponent } from './components/finapi/finapi.component';
import { HealthDashboardComponent } from './components/health-dashboard/health-dashboard.component';
import { NotificationService } from './services/notification.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        FamvestComponent,
        NetlyComponent,
        FinapiComponent,
        HealthDashboardComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            closeButton: true,
            progressBar: true
        }),
        NgOptimizedImage,
    ],
    providers: [
        provideZoneChangeDetection({ eventCoalescing: false }),
        NotificationService,
        // HttpErrorInterceptor runs after to handle all other errors
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: 'en-IN'
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
