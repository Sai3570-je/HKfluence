# HKfluence

## Overview

**HKfluence** is an open-source influencer marketing dashboard built for HealthKart teams to track campaign ROI, incremental ROAS, influencer rankings, and payouts across brands (MuscleBlaze, HKVitals, Gritzo) and social platforms (Instagram, YouTube, Twitter, TikTok). Designed to match HealthKart's branding, it offers real-world usability and impact for data-driven marketing decisions.

## Features

- **Multi-platform Analytics**: Track performance on Instagram, YouTube, Twitter, and TikTok.
- **Campaign Performance**: Monitor revenue, orders, and engagement by influencer, brand, or channel.
- **Incremental ROAS**: Calculate true advertising impact against a 15% organic baseline (configurable).
- **Influencer Insights**: View leaderboards and persona segmentation to identify top/bottom performers.
- **Payout Tracking**: Automatic calculations for post- or order-based contracts.
- **Dynamic Filtering**: Filter by brand, product, influencer, or platform.
- **Exportable Reports**: Download insights as CSV (PDF optional).
- **Responsive UI**: Matches HealthKart’s branding with a mobile-friendly design.

## Demo

Live Demo:  
[HealthKart Influencer Dashboard Demo](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e6ac23580dfe8f64d0cb69d39eb11b6c/38f32d4d-b1aa-417d-a117-6b1cef73a5f7/index.html)

## Data Model

| Table           | Fields                                                                |
|-----------------|-----------------------------------------------------------------------|
| influencers     | id, name, category, gender, follower_count, platform                  |
| posts           | influencer_id, platform, date, url, caption, reach, likes, comments   |
| tracking_data   | source, campaign, influencer_id, user_id, product, date, orders, revenue |
| payouts         | influencer_id, basis (post/order), rate, orders, total_payout         |

## Getting Started

### Prerequisites

- **Node.js** (optional, for advanced deployment) or **Python 3** (for static server)
- **Git** (for cloning the repo)
- **VS Code** with [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sai3570-je/HKfluence.git
   cd HKfluence
   Run a local server:
bash

Collapse

Wrap

Run

Copy
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: Use Live Server in VS Code
View in browser:
Navigate to http://localhost:8000
Usage
Upload Data: Import campaign CSVs via the “Upload Data” button or use sample data.
Filter & Analyze: Slice metrics by platform, brand, influencer, or date.
Export Reports: Download analytics as CSV from the export menu.
Payouts: View influencer compensation details in the Payouts tab.
Project Structure
text

Collapse

Wrap

Copy
HKfluence/
├── index.html           # Main dashboard UI
├── data/                # Sample datasets (CSV/JSON)
├── src/
│   ├── components/      # UI components (charts, tables, filters)
│   ├── pages/           # Dashboard modules and views
│   └── utils/           # Data processing and analytics helpers
├── assets/              # Brand colors, fonts, logo
├── README.md
└── CONTRIBUTING.md
Key Assumptions
Simulated Data: All influencer, post, and revenue data is simulated.
Attribution: Revenue/orders tied to influencers via tracking_data.
Incremental ROAS: Calculated against a 15% organic baseline (configurable).
Payouts: Influencers paid per post or per order, not both in one campaign.
No Live API: Uses CSV uploads or demo data (API hooks possible for production).
Technology Stack
Frontend: HTML5, CSS3, Vanilla JavaScript
Charts: Chart.js for visualizations
Export: CSV via browser-based download
Deployment: Static site compatible with Netlify, Vercel, or Railway
Optional PDF: PyMuPDF for offline PDF processing
Deployment
Push to GitHub and deploy via Netlify, Vercel, or Railway.
For Railway, see deployment notes in the project wiki.
Insights & Reporting
Insights Tab: View campaign summaries in PDF or Notion format.
Leaderboard & ROI: Optimize budget allocation and flag underperformers.
Contribution
Pull requests are welcome! See CONTRIBUTING.md for guidelines.

License
MIT
