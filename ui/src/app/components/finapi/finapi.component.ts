import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finapi',
  templateUrl: './finapi.component.html',
  styleUrls: ['./finapi.component.css'],
  standalone: false
})
export class FinapiComponent implements OnInit {
  mfEndpoints: any[] = [];
  ipoEndpoints: any[] = [];
  slides: any[] = [];
  currentSlide = 0;

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    // Mock data for demonstration
    this.mfEndpoints = [
      { key: 'schemes', name: 'Mutual Fund Schemes', path: '/api/mutual-funds/schemes' },
      { key: 'nav', name: 'NAV Data', path: '/api/mutual-funds/nav' }
    ];
    this.ipoEndpoints = [
      { key: 'ipo', name: 'IPO Details', path: '/api/ipo' }
    ];
    this.currentSlide = 0;
    this.slides = [
      {
        title: 'Mutual Funds',
        command: '"https://finapi.upvaly.com/api/mf/isin/INF879O01027"',
        response: {
          status: 'success',
          statusCode: "200",
          message: 'Mutual Fund record fetched successfully',
          data:[
            {
              schemeCode: '122639',
              schemeName: 'Parag Parikh Flexi Cap Fund',
              isinDivPayout: 'INF879O01027',
              latestNav: "87.841",
            }
          ]
        }
      },
      {
        title: 'IPO Details',
        command: '"https://finapi.upvaly.com/api/ipo"',
        response: {
          status: 'success',
          statusCode: "200",
          message: 'IPO details fetched successfully',
          data: [
            {
              "symbol": "OMPOWER",
              "name": "Om Power Transmission",
              "priceRange": "₹166 – ₹175",
              "status": "LIVE",
            }
          ]
        }
      },
      {
        title: 'Market Holidays',
        command: '"https://finapi.upvaly.com/api/exchange/holidays"',
        response: {
          status: 'success',
          statusCode: "200",
          message: 'Market holidays fetched successfully',
          data: [
            {
              date: "2026-01-26",
              description: 'Republic Day',
              holidayType: 'TRADING_HOLIDAY',
              closedExchanges: ["NSE", "NFO", "CDS", "BSE", "BFO"],
            }
          ]
        }
      }
    ];
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  isArray(data: any): boolean {
    return Array.isArray(data);
  }

  formatNumber(num: number): string {
    return num.toString();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
