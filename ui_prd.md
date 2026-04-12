# Product Requirements Document (PRD)

## Product Name

Upvaly (Frontend Web Application)

## Overview

Upvaly is a centralized frontend web platform that showcases and provides access to multiple financial and infrastructure products including:

* Famvest
* FinAPI
* Netly

The platform serves as a discovery, information, and status hub for users to understand offerings, access products, and monitor service health.

---

## Objectives

* Provide a unified brand experience for all Upvaly products
* Enable users to discover and understand each product
* Offer quick access/navigation to individual products
* Display real-time service health using health APIs
* Build a scalable frontend architecture for future products

---

## Target Users

* Retail users (Famvest users)
* Developers/partners (FinAPI users)
* Network/infra users (Netly users)
* Internal stakeholders

---

## Key Features

### 1. Landing Page

* Brand introduction (Upvaly)
* Overview of all products
* Call-to-action buttons for each product
* Quick status overview (health summary)
* Use upvaly.png from assets section for landing page hero image

### 2. Products Section

Each product should have:

* Dedicated section/page
* Description
* Key features
* Target audience
* Access instructions (links, onboarding steps)

#### Famvest (Detailed)

**Overview**
Famvest is a portfolio management application designed for families to track, analyze, and manage their investments in one unified platform.

**Core Value Proposition**

* Centralized family investment tracking
* Data-driven financial decision making
* Secure and real-time portfolio insights

**Key Features**

* Multi-member family tracking
* Zerodha KiteConnect integration
* Advanced analytics & reporting
* Real-time performance monitoring
* Transaction history tracking

**Target Users**

* Families managing shared investments
* Individual investors with complex portfolios

**Access Flow**

* CTA: "Open Famvest"
* Redirect to Famvest application
* Optional: onboarding/help documentation link

**Famvest MCP Server (AI Integration)**

The Famvest MCP Server enables integration with AI assistants and applications using the Model Context Protocol (MCP).

**Use Cases**

* AI-powered portfolio analysis
* Intelligent trading assistants
* Automated investment insights
* Programmatic portfolio access

**Capabilities**

* Secure API-like access via MCP
* Standardized communication protocol
* Enterprise-grade reliability

**Sample MCP Configuration**

```json
{
  "mcpServers": {
    "famvest": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.famvest.upvaly.com/mcp"
      ]
    }
  }
}
```

**Security Features**

* Bearer token authentication
* Session-based management
* HTTPS encrypted communication
* Scope-limited access
* Automatic token injection

#### Netly (Detailed)

**Overview**
Netly is a unified investment management platform focused on comprehensive tracking of assets and liabilities with an interactive dashboard.

**Core Value Proposition**

* Single view of net worth across diverse asset classes
* Actionable insights via real-time calculations and reporting
* Simple yet powerful budgeting and planning tools

**Key Features**

* Multi-asset portfolio support (equities, real estate, gold, mutual funds, cryptocurrencies, etc.)
* Interactive dashboard for portfolio overview
* Asset & liability management (loans, EMIs, obligations)
* Real-time calculations (net worth, allocation, growth)
* Budget calculations and reporting
* Fully responsive design

**Target Users**

* Individuals tracking holistic net worth
* Users managing both investments and liabilities
* Budget-conscious users seeking planning tools

**Access Flow**

* CTA: "Open Netly"
* Redirect to Netly application
* Optional: onboarding/help documentation link

**Frontend Requirements (Upvaly Integration)**

* Product card with clear differentiation from Famvest (family vs individual/net-worth focus)
* Highlight asset diversity visually (icons/labels per asset type)
* Showcase dashboard preview (static or animated mock)
* Emphasize budgeting + liabilities (key differentiator)

#### FinAPI (Detailed)

**Overview**
FinAPI provides completely free access to Indian financial market data, designed specifically for developers and data-driven applications.

**Core Value Proposition**

* Zero-auth, plug-and-play financial data access
* Comprehensive mutual fund and IPO datasets
* Developer-first experience with reliable historical data

**Key Features**

* Access to 14,000+ mutual fund schemes
* NAV history since 2006
* Real-time and historical data APIs
* IPO data including GMP (Grey Market Premium) trends
* Market holidays and trading timings
* No authentication required (open access)

**Target Users**

* Developers building fintech apps
* Quant analysts and data engineers
* Retail investors needing raw financial data

**Access Flow**

* CTA: "Explore FinAPI"
* Redirect to API docs or playground
* Provide sample endpoints / quick start guide

**Frontend Requirements (Upvaly Integration)**

* Strong developer-focused messaging ("Free", "No Auth", "API-first")
* Code snippets / sample API calls preview
* Highlight dataset scale (14,000+ schemes)
* Link to documentation and GitHub (if applicable)

**FinAPI MCP Server (AI Integration)**

FinAPI also provides an MCP Server enabling AI assistants and applications to access and analyze financial market data programmatically.

**Use Cases**

* AI-driven mutual fund analysis
* IPO trend analysis (including GMP insights)
* Quant research assistants
* Automated financial dashboards

**Capabilities**

* Structured access to financial datasets via MCP
* Seamless integration with AI tools
* Standardized protocol for data querying and analysis

**Sample MCP Configuration**

```json
{
  "mcpServers": {
    "finapi": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.finapi.upvaly.com/mcp"
      ]
    }
  }
}
```

**Security / Access Model**

* No authentication required (open developer access)
* HTTPS-based communication
* Designed for safe public data consumption

**Positioning vs Other Products**

* Famvest → End-user portfolio management
* Netly → Net worth & asset/liability tracking
* FinAPI → Developer infrastructure / data layer

### 3. Service Health Dashboard

The application should display real-time health status of all Upvaly products by calling both UI endpoints and backend health APIs directly from the frontend.

**Services to Monitor**

**UI Endpoints (Availability Check)**

* [https://famvest.upvaly.com](https://famvest.upvaly.com)
* [https://netly.upvaly.com](https://netly.upvaly.com)
* [https://finapi.upvaly.com](https://finapi.upvaly.com)

**Expected Response**

* HTTP Status: 200 → Healthy
* Any other response → Degraded/Down

**API Health Endpoints (Deep Health Check)**

* [https://api.famvest.upvaly.com/api/public/health](https://api.famvest.upvaly.com/api/public/health)
* [https://api.netly.upvaly.com/api/public/health](https://api.netly.upvaly.com/api/public/health)
* [https://api.finapi.upvaly.com/api/public/health](https://api.finapi.upvaly.com/api/public/health)

**Expected Response Format**

```json
{
  "status": "healthy",
  "dependencies": {
    "postgres": "UP",
    "redis": "UP"
  }
}
```

**Health Mapping Logic (Frontend)**

* `status === "healthy"` → Healthy (Green)
* Dependency partially down → Degraded (Yellow)
* API failure / non-200 → Down (Red)

**UI Requirements**

* Display per product:

    * UI Status
    * API Status
    * Dependency breakdown (Postgres, Redis, etc.)
* Visual indicators (Green / Yellow / Red)
* Last checked timestamp
* Auto-refresh every 30–60 seconds

**Error Handling**

* Timeout handling (mark as "Unknown")
* Retry mechanism (optional exponential backoff)
* Graceful fallback UI

**Extensibility**

* Config-driven endpoints (no hardcoding)
* Easy addition of new services

---

### 4. Navigation

* Top navigation bar

    * Home
    * Products
    * Health Status
    * Documentation (optional)
* Footer with links

### 5. Access & Redirection

* Buttons/links to:

    * Famvest
    * FinAPI
    * Netly
* External redirects handled safely

### 6. Documentation / Info Pages

* FAQs
* Getting Started
* Contact / Support info

---

## Functional Requirements

### Product Listing

* Static or CMS-driven list of products
* Easy to extend for new products

### Health API Integration

* Configurable endpoints per service
* Polling interval (e.g., 30–60 seconds)
* Error handling (fallback UI if API fails)

### Responsiveness

* Fully responsive design (mobile, tablet, desktop)

### Performance

* Fast load times
* Lazy loading where applicable

### SEO

* Meta tags per page
* Proper semantic HTML

---

## Non-Functional Requirements

* High availability
* Scalable architecture
* Secure external linking
* Accessibility (WCAG basics)

---

## Tech Considerations

* Framework: (Anagulr)
* Styling: (Tailwind / CSS Modules)

---

## Data Model (Initial)

### Product

* name
* description
* url
* features[]
* category

### Service Health

* serviceName
* status
* lastUpdated

---

## UI/UX Guidelines

* Modern, clean, and minimal UI
* Consistent branding across products
* Clear CTAs and product differentiation
* Smooth animations and transitions (micro-interactions)
* Minimal friction navigation

### Design Direction

* Use a modern design system (cards, soft shadows, rounded corners)
* Prefer spacious layouts with clear hierarchy
* Use subtle gradients and modern typography
* Ensure high readability and accessibility

### Reference Implementation

* Refer to existing Angular UI code present in the repository for:

    * Layout structure
    * Component patterns
    * Page flow
* Do NOT copy styling directly
* Use a **different color palette and branding style** to establish Upvaly identity

### Visual Consistency

* Similar layout patterns can be reused:

    * Hero section
    * Product cards
    * Dashboard-like sections
* Maintain consistency across all product pages

### Responsiveness

* Mobile-first design approach
* Fully responsive across devices

### Developer Guidance (for Copilot)

* Follow component-driven architecture
* Reuse layout patterns from reference Angular code
* Abstract styling into reusable components/themes
* Avoid tight coupling with legacy styles

## Future Enhancements

* Personalized dashboard
* Analytics integration
* Notifications for service downtime
* CMS integration for content management

---

## Incremental Changes
1. Remove the UI health check. Only perform API Health Check.
2. Use diffent shade color for landing page and famvest, its same currently
3. Similar to landing page image, use image for famvest (famvest.png) and netly(netly.png) as well. dont show cards which showing now. finapi can remain as is.
4. Remove how it works in health status page
5. Bring Our Products section above to Service Health Status section ln landing page


