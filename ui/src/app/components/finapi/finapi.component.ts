import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finapi',
  templateUrl: './finapi.component.html',
  styleUrls: ['./finapi.component.css'],
  standalone: false
})
export class FinapiComponent implements OnInit {
  activeTab = 'mf';
  mfEndpoints: any[] = [];
  ipoEndpoints: any[] = [];
  slides: any[] = [];
  currentSlide = 0;
  stats: any = null;
  statsLoading = false;
  tryIt: any = {};
  tryItIpo: any = {};

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
    this.slides = [
      { title: 'Mutual Funds', command: 'curl "https://finapi.upvaly.com/api/mutual-funds/schemes"', response: { status: 'success', statusCode: 200, message: 'Schemes retrieved', data: [{ schemeCode: 'INF123', schemeName: 'Sample Fund', latestNav: 45.67 }] } },
      { title: 'IPO Details', command: 'curl "https://finapi.upvaly.com/api/ipo"', response: { status: 'success', statusCode: 200, message: 'IPO data retrieved', data: [{ symbol: 'SAMPLE', type: 'Mainline', name: 'Sample IPO' }] } }
    ];
    this.stats = {
      totalSchemes: 14000,
      totalFundHouses: 45,
      navHistorySince: '2006-01-01',
      totalNavRecords: 5000000,
      lastUpdatedAt: new Date(),
      lastNavDate: '2024-04-12'
    };
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  scrollTo(section: string) {
    // Mock scroll
  }

  refreshUI() {
    // Mock refresh
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

  formatLargeNumber(num: number): string {
    return num.toLocaleString();
  }

  formatNumber(num: number): string {
    return num.toString();
  }

  getYearsSinceData(date: string): string {
    const years = new Date().getFullYear() - new Date(date).getFullYear();
    return years.toString();
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  executeApi(endpoint: any) {
    // Mock API execution
  }

  callIpoEndpoint(key: string) {
    // Mock
  }

  hasTextParams(endpoint: any): boolean {
    return endpoint.params?.some((p: any) => p.type === 'string');
  }

  getTextParams(endpoint: any): any[] {
    return endpoint.params?.filter((p: any) => p.type === 'string') || [];
  }

  hasDateParams(endpoint: any): boolean {
    return endpoint.params?.some((p: any) => p.type === 'date');
  }

  getDateParams(endpoint: any): any[] {
    return endpoint.params?.filter((p: any) => p.type === 'date') || [];
  }

  hasNumberParams(endpoint: any): boolean {
    return endpoint.params?.some((p: any) => p.type === 'number');
  }

  getNumberParams(endpoint: any): any[] {
    return endpoint.params?.filter((p: any) => p.type === 'number') || [];
  }

  formatJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }

  brandTitle = 'FinAPI';
  brandSubtitle = 'Financial Data API';
  mobileMenuOpen = false;
}
