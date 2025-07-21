// HealthKart Dashboard Data
const dashboardData = {
  performance_summary: {
    total_revenue: 54706,
    total_cost: 31494,
    roi_percentage: 73.7,
    roas: 1.74,
    total_influencers: 50,
    total_posts: 200,
    total_orders: 500,
    avg_order_value: 109.41
  },
  platform_data: [
    {platform: "Instagram", revenue: 18713, orders: 171, percentage: 34.2, engagement_rate: 6.5, color: "#E4405F", reach: 29901935},
    {platform: "YouTube", revenue: 12387, orders: 113, percentage: 22.6, engagement_rate: 7.45, color: "#FF0000", reach: 21953815},  
    {platform: "TikTok", revenue: 14677, orders: 142, percentage: 26.8, engagement_rate: 6.09, color: "#000000", reach: 27012856},
    {platform: "Twitter", revenue: 8929, orders: 74, percentage: 16.3, engagement_rate: 6.26, color: "#1DA1F2", reach: 10768467}
  ],
  brand_performance: [
    {brand: "MuscleBlaze", revenue: 17089, orders: 170, percentage: 31.2, aov: 100.52},
    {brand: "HKVitals", revenue: 18679, orders: 163, percentage: 34.1, aov: 114.60},
    {brand: "Gritzo", revenue: 18938, orders: 167, percentage: 34.6, aov: 113.40}
  ],
  top_influencers: [
    {name: "Influencer_46", platform: "Twitter", category: "Lifestyle", revenue: 1852, roas: 7.83, roi: 683},
    {name: "Influencer_38", platform: "Instagram", category: "Lifestyle", revenue: 1664, roas: 6.83, roi: 583},
    {name: "Influencer_37", platform: "TikTok", category: "Fitness", revenue: 1515, roas: 6.20, roi: 520},
    {name: "Influencer_41", platform: "Instagram", category: "Nutrition", revenue: 1946, roas: 6.03, roi: 503},
    {name: "Influencer_8", platform: "Twitter", category: "Fitness", revenue: 1681, roas: 0.57, roi: -43},
    {name: "Influencer_15", platform: "YouTube", category: "Sports", revenue: 1420, roas: 4.98, roi: 398},
    {name: "Influencer_22", platform: "Instagram", category: "Wellness", revenue: 1386, roas: 5.46, roi: 446},
    {name: "Influencer_33", platform: "TikTok", category: "Nutrition", revenue: 1298, roas: 4.73, roi: 373}
  ],
  monthly_trends: [
    {month: "Feb 2025", revenue: 8234, cost: 4928, orders: 75},
    {month: "Mar 2025", revenue: 9567, cost: 5389, orders: 87}, 
    {month: "Apr 2025", revenue: 10123, cost: 5724, orders: 93},
    {month: "May 2025", revenue: 8876, cost: 5103, orders: 81},
    {month: "Jun 2025", revenue: 9445, cost: 5234, orders: 86},
    {month: "Jul 2025", revenue: 8461, cost: 5116, orders: 78}
  ],
  categories: [
    {category: "Fitness", influencers: 15, revenue: 16412, engagement: 6.8},
    {category: "Nutrition", influencers: 12, revenue: 14567, engagement: 7.1},
    {category: "Wellness", influencers: 10, revenue: 12234, engagement: 6.9},
    {category: "Sports", influencers: 8, revenue: 7893, engagement: 6.4},
    {category: "Lifestyle", influencers: 5, revenue: 3600, engagement: 7.3}
  ],
  payment_models: [
    {type: "Post-based", influencers: 28, total_cost: 18567, avg_rate: 663},
    {type: "Order-based", influencers: 22, total_cost: 12927, avg_rate: 25.85}
  ]
};

// Chart instances
let charts = {};

// Current filters
let currentFilters = {
  dateFilter: '6m',
  platformFilter: 'all',
  brandFilter: 'all'
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('HealthKart Dashboard initializing...');
  
  // Wait for DOM to be fully ready
  setTimeout(() => {
    initializeNavigation();
    initializeFilters();
    updateKPIs();
    populateTables();
    initializeCharts();
    console.log('HealthKart Dashboard fully loaded');
  }, 100);
});

// Navigation functionality - COMPLETELY REWRITTEN
function initializeNavigation() {
  console.log('Setting up navigation...');
  
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  console.log(`Found ${navLinks.length} nav links and ${sections.length} sections`);
  
  // Log all sections found
  sections.forEach(section => {
    console.log(`Section found: ${section.id}`);
  });

  const sectionTitles = {
    'executive': {
      title: 'Executive Summary',
      subtitle: 'Overview of influencer marketing performance'
    },
    'platform': {
      title: 'Platform Analytics',
      subtitle: 'Performance breakdown by social media platform'
    },
    'campaigns': {
      title: 'Campaign Performance',
      subtitle: 'Detailed campaign analytics and conversion funnel'
    },
    'influencers': {
      title: 'Influencer Insights',
      subtitle: 'Top performers and category analysis'
    },
    'brands': {
      title: 'Brand Analytics',
      subtitle: 'Multi-brand performance comparison'
    },
    'financial': {
      title: 'Financial Tracking',
      subtitle: 'Budget utilization and payout management'
    }
  };

  // Set up click handlers for each nav link
  navLinks.forEach((link) => {
    console.log(`Setting up nav link: ${link.dataset.section}`);
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetSection = this.dataset.section;
      console.log(`Navigation clicked: ${targetSection}`);
      
      // Remove active class from all nav links
      navLinks.forEach(nav => {
        nav.classList.remove('active');
      });
      
      // Add active class to clicked nav link
      this.classList.add('active');
      
      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });
      
      // Show target section
      const targetSectionElement = document.getElementById(`${targetSection}-section`);
      if (targetSectionElement) {
        targetSectionElement.classList.add('active');
        targetSectionElement.style.display = 'block';
        console.log(`Successfully showed section: ${targetSection}-section`);
      } else {
        console.error(`Target section not found: ${targetSection}-section`);
      }
      
      // Update page titles
      const titleInfo = sectionTitles[targetSection];
      if (titleInfo && pageTitle && pageSubtitle) {
        pageTitle.textContent = titleInfo.title;
        pageSubtitle.textContent = titleInfo.subtitle;
      }
      
      // Trigger chart resize after a delay
      setTimeout(() => {
        Object.values(charts).forEach(chart => {
          if (chart && typeof chart.resize === 'function') {
            chart.resize();
          }
        });
      }, 100);
      
      // Show success notification
      showNotification(`Navigated to ${titleInfo ? titleInfo.title : targetSection}`);
    });
  });

  // Show executive section by default
  const executiveSection = document.getElementById('executive-section');
  const firstNavLink = document.querySelector('.nav-link[data-section="executive"]');
  
  if (executiveSection) {
    // Hide all sections first
    sections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    // Show executive section
    executiveSection.style.display = 'block';
    executiveSection.classList.add('active');
    
    // Set first nav link as active
    if (firstNavLink) {
      firstNavLink.classList.add('active');
    }
    
    console.log('Default section (executive) displayed');
  }
}

// Filter functionality - FIXED
function initializeFilters() {
  console.log('Setting up filters...');
  
  const filterSelects = document.querySelectorAll('.filter-select');
  
  filterSelects.forEach(select => {
    console.log(`Setting up filter: ${select.id}`);
    
    select.addEventListener('change', function(e) {
      console.log(`Filter changed: ${this.id} = ${this.value}`);
      currentFilters[this.id] = this.value;
      applyFilters();
      showNotification(`Filter applied: ${this.value}`, 'success');
    });
  });
}

function applyFilters() {
  console.log('Applying filters:', currentFilters);
  updateKPIsWithFilters();
  updateChartsWithFilters();
  updateTablesWithFilters();
}

// KPI Updates
function updateKPIs() {
  const summary = dashboardData.performance_summary;
  
  // Update main KPIs with safe checks
  const elements = {
    totalRevenue: document.getElementById('totalRevenue'),
    totalCost: document.getElementById('totalCost'),
    roi: document.getElementById('roi'),
    roas: document.getElementById('roas'),
    totalInfluencers: document.getElementById('totalInfluencers'),
    totalPosts: document.getElementById('totalPosts'),
    totalOrders: document.getElementById('totalOrders'),
    avgOrderValue: document.getElementById('avgOrderValue')
  };

  if (elements.totalRevenue) elements.totalRevenue.textContent = `$${summary.total_revenue.toLocaleString()}`;
  if (elements.totalCost) elements.totalCost.textContent = `$${summary.total_cost.toLocaleString()}`;
  if (elements.roi) elements.roi.textContent = `${summary.roi_percentage}%`;
  if (elements.roas) elements.roas.textContent = `${summary.roas}x`;
  if (elements.totalInfluencers) elements.totalInfluencers.textContent = summary.total_influencers;
  if (elements.totalPosts) elements.totalPosts.textContent = `${summary.total_posts}+`;
  if (elements.totalOrders) elements.totalOrders.textContent = summary.total_orders;
  if (elements.avgOrderValue) elements.avgOrderValue.textContent = `$${summary.avg_order_value}`;
  
  console.log('KPIs updated successfully');
}

function updateKPIsWithFilters() {
  let filteredData = {...dashboardData.performance_summary};
  
  // Apply platform filter
  if (currentFilters.platformFilter !== 'all') {
    const platformData = dashboardData.platform_data.find(p => p.platform === currentFilters.platformFilter);
    if (platformData) {
      filteredData.total_revenue = platformData.revenue;
      filteredData.total_orders = platformData.orders;
      filteredData.avg_order_value = (platformData.revenue / platformData.orders);
    }
  }
  
  // Apply brand filter
  if (currentFilters.brandFilter !== 'all') {
    const brandData = dashboardData.brand_performance.find(b => b.brand === currentFilters.brandFilter);
    if (brandData) {
      filteredData.total_revenue = brandData.revenue;
      filteredData.total_orders = brandData.orders;
      filteredData.avg_order_value = brandData.aov;
    }
  }
  
  // Update displays safely
  const totalRevenueEl = document.getElementById('totalRevenue');
  const totalOrdersEl = document.getElementById('totalOrders');
  const avgOrderValueEl = document.getElementById('avgOrderValue');

  if (totalRevenueEl) totalRevenueEl.textContent = `$${filteredData.total_revenue.toLocaleString()}`;
  if (totalOrdersEl) totalOrdersEl.textContent = filteredData.total_orders;
  if (avgOrderValueEl) avgOrderValueEl.textContent = `$${filteredData.avg_order_value.toFixed(2)}`;
}

// Chart initialization
function initializeCharts() {
  console.log('Initializing HealthKart charts...');
  
  try {
    createRevenueChart();
    createPlatformChart();
    createEngagementChart();
    createTopInfluencersChart();
    createBrandChart();
    createBrandComparisonChart();
    console.log('All charts initialized successfully');
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

function createRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  if (charts.revenue) {
    charts.revenue.destroy();
  }

  const monthlyData = dashboardData.monthly_trends;
  
  charts.revenue = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthlyData.map(d => d.month.split(' ')[0]),
      datasets: [{
        label: 'Revenue',
        data: monthlyData.map(d => d.revenue),
        borderColor: '#b6012a',
        backgroundColor: 'rgba(182, 1, 42, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#b6012a',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#b6012a',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const dataPoint = monthlyData[context.dataIndex];
              return [
                `Revenue: $${context.parsed.y.toLocaleString()}`,
                `Orders: ${dataPoint.orders}`,
                `Cost: $${dataPoint.cost.toLocaleString()}`
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            },
            color: '#666666'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666'
          }
        }
      }
    }
  });
}

function createPlatformChart() {
  const ctx = document.getElementById('platformChart');
  if (!ctx) return;

  if (charts.platform) {
    charts.platform.destroy();
  }

  const platformData = dashboardData.platform_data;
  
  charts.platform = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: platformData.map(d => d.platform),
      datasets: [{
        data: platformData.map(d => d.revenue),
        backgroundColor: ['#E4405F', '#FF0000', '#000000', '#1DA1F2'],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            color: '#000202'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function(context) {
              const platform = platformData[context.dataIndex];
              const total = platformData.reduce((sum, p) => sum + p.revenue, 0);
              const percentage = ((platform.revenue / total) * 100).toFixed(1);
              return [
                `${platform.platform}: $${platform.revenue.toLocaleString()}`,
                `${percentage}% of total revenue`,
                `${platform.orders} orders`,
                `${platform.engagement_rate}% engagement`
              ];
            }
          }
        }
      }
    }
  });
}

function createEngagementChart() {
  const ctx = document.getElementById('engagementChart');
  if (!ctx) return;

  if (charts.engagement) {
    charts.engagement.destroy();
  }

  const platformData = dashboardData.platform_data;
  
  charts.engagement = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: platformData.map(d => d.platform),
      datasets: [{
        label: 'Engagement Rate (%)',
        data: platformData.map(d => d.engagement_rate),
        backgroundColor: '#77dfe0',
        borderColor: '#77dfe0',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function(context) {
              const platform = platformData[context.dataIndex];
              return [
                `Engagement: ${platform.engagement_rate}%`,
                `Revenue: $${platform.revenue.toLocaleString()}`,
                `Reach: ${platform.reach.toLocaleString()}`
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 8,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            },
            color: '#666666'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666'
          }
        }
      }
    }
  });
}

function createTopInfluencersChart() {
  const ctx = document.getElementById('topInfluencersChart');
  if (!ctx) return;

  if (charts.topInfluencers) {
    charts.topInfluencers.destroy();
  }

  const topInfluencers = dashboardData.top_influencers.slice(0, 5);
  
  charts.topInfluencers = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topInfluencers.map(d => d.name),
      datasets: [{
        label: 'Revenue Generated',
        data: topInfluencers.map(d => d.revenue),
        backgroundColor: '#b6012a',
        borderColor: '#b6012a',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function(context) {
              const influencer = topInfluencers[context.dataIndex];
              return [
                `Revenue: $${influencer.revenue.toLocaleString()}`,
                `Platform: ${influencer.platform}`,
                `Category: ${influencer.category}`,
                `ROI: ${influencer.roi}%`,
                `ROAS: ${influencer.roas}x`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(1) + 'K';
            },
            color: '#666666'
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666'
          }
        }
      }
    }
  });
}

function createBrandChart() {
  const ctx = document.getElementById('brandChart');
  if (!ctx) return;

  if (charts.brand) {
    charts.brand.destroy();
  }

  const brandData = dashboardData.brand_performance;
  
  charts.brand = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: brandData.map(d => d.brand),
      datasets: [{
        data: brandData.map(d => d.revenue),
        backgroundColor: ['#dc3545', '#77dfe0', '#28a745'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            color: '#000202'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function(context) {
              const brand = brandData[context.dataIndex];
              const total = brandData.reduce((sum, b) => sum + b.revenue, 0);
              const percentage = ((brand.revenue / total) * 100).toFixed(1);
              return [
                `${brand.brand}: $${brand.revenue.toLocaleString()}`,
                `${percentage}% of total`,
                `${brand.orders} orders`,
                `AOV: $${brand.aov.toFixed(2)}`
              ];
            }
          }
        }
      }
    }
  });
}

function createBrandComparisonChart() {
  const ctx = document.getElementById('brandComparisonChart');
  if (!ctx) return;

  if (charts.brandComparison) {
    charts.brandComparison.destroy();
  }

  const brandData = dashboardData.brand_performance;
  
  charts.brandComparison = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: brandData.map(d => d.brand),
      datasets: [
        {
          label: 'Revenue',
          data: brandData.map(d => d.revenue),
          backgroundColor: '#b6012a',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'Average Order Value',
          data: brandData.map(d => d.aov),
          backgroundColor: '#77dfe0',
          borderRadius: 6,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#000202'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue ($)',
            color: '#666666'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            },
            color: '#666666'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'AOV ($)',
            color: '#666666'
          },
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0);
            },
            color: '#666666'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666'
          }
        }
      }
    }
  });
}

// Chart updates with filters
function updateChartsWithFilters() {
  // Update platform chart based on filters
  if (charts.platform && currentFilters.platformFilter !== 'all') {
    const filteredData = dashboardData.platform_data.filter(p => p.platform === currentFilters.platformFilter);
    if (filteredData.length > 0) {
      charts.platform.data.labels = filteredData.map(d => d.platform);
      charts.platform.data.datasets[0].data = filteredData.map(d => d.revenue);
      charts.platform.update('none');
    }
  } else if (charts.platform && currentFilters.platformFilter === 'all') {
    charts.platform.data.labels = dashboardData.platform_data.map(d => d.platform);
    charts.platform.data.datasets[0].data = dashboardData.platform_data.map(d => d.revenue);
    charts.platform.update('none');
  }
  
  // Update brand chart based on filters
  if (charts.brand && currentFilters.brandFilter !== 'all') {
    const filteredData = dashboardData.brand_performance.filter(b => b.brand === currentFilters.brandFilter);
    if (filteredData.length > 0) {
      charts.brand.data.labels = filteredData.map(d => d.brand);
      charts.brand.data.datasets[0].data = filteredData.map(d => d.revenue);
      charts.brand.update('none');
    }
  } else if (charts.brand && currentFilters.brandFilter === 'all') {
    charts.brand.data.labels = dashboardData.brand_performance.map(d => d.brand);
    charts.brand.data.datasets[0].data = dashboardData.brand_performance.map(d => d.revenue);
    charts.brand.update('none');
  }
}

// Table population
function populateTables() {
  console.log('Populating tables...');
  populateCampaignsTable();
  populateInfluencersTable();
  populatePayoutsTable();
}

function populateCampaignsTable() {
  const tbody = document.getElementById('campaignsTableBody');
  if (!tbody) {
    console.warn('Campaigns table body not found');
    return;
  }

  const platformData = dashboardData.platform_data;
  
  tbody.innerHTML = platformData.map(platform => `
    <tr>
      <td><strong style="color: ${platform.color};">${platform.platform}</strong></td>
      <td>${platform.reach.toLocaleString()}</td>
      <td><strong>$${platform.revenue.toLocaleString()}</strong></td>
      <td>${platform.orders}</td>
      <td>${platform.engagement_rate}%</td>
      <td>$${(platform.revenue / platform.orders).toFixed(2)}</td>
    </tr>
  `).join('');
}

function populateInfluencersTable() {
  const tbody = document.getElementById('influencersTableBody');
  if (!tbody) {
    console.warn('Influencers table body not found');
    return;
  }

  const influencerData = dashboardData.top_influencers;
  
  tbody.innerHTML = influencerData.map(influencer => `
    <tr>
      <td><strong>${influencer.name}</strong></td>
      <td>${influencer.platform}</td>
      <td>${influencer.category}</td>
      <td><strong>$${influencer.revenue.toLocaleString()}</strong></td>
      <td class="${influencer.roi > 0 ? 'positive' : 'negative'}">${influencer.roi}%</td>
      <td><strong>${influencer.roas}x</strong></td>
    </tr>
  `).join('');
}

function populatePayoutsTable() {
  const tbody = document.getElementById('payoutsTableBody');
  if (!tbody) {
    console.warn('Payouts table body not found');
    return;
  }

  const payoutData = dashboardData.top_influencers.slice(0, 8).map((inf, index) => {
    const isOrderBased = index % 3 === 0;
    const rate = isOrderBased ? (Math.random() * 30 + 20).toFixed(2) : (Math.random() * 200 + 400).toFixed(2);
    const performance = isOrderBased ? Math.floor(Math.random() * 15 + 5) : Math.floor(Math.random() * 5 + 2);
    const totalDue = isOrderBased ? (rate * performance) : (rate * performance);
    const status = Math.random() > 0.7 ? 'pending' : Math.random() > 0.3 ? 'paid' : 'processing';
    
    return {
      influencer: inf.name,
      model: isOrderBased ? 'Per Order' : 'Per Post',
      rate: parseFloat(rate),
      performance: performance,
      totalDue: totalDue,
      status: status
    };
  });

  tbody.innerHTML = payoutData.map(payout => `
    <tr>
      <td><strong>${payout.influencer}</strong></td>
      <td>${payout.model}</td>
      <td>$${payout.rate.toFixed(2)}</td>
      <td>${payout.performance} ${payout.model.split(' ')[1].toLowerCase()}s</td>
      <td><strong>$${payout.totalDue.toLocaleString()}</strong></td>
      <td><span class="status-badge ${payout.status}">${payout.status.toUpperCase()}</span></td>
    </tr>
  `).join('');
}

function updateTablesWithFilters() {
  populateTables();
}

// Table sorting - WORKING IMPLEMENTATION
function sortTable(tableId, columnIndex) {
  console.log(`Sorting table ${tableId}, column ${columnIndex}`);
  
  const table = document.getElementById(tableId);
  if (!table) {
    console.warn(`Table ${tableId} not found`);
    return;
  }
  
  const tbody = table.getElementsByTagName('tbody')[0];
  if (!tbody) {
    console.warn(`Table body for ${tableId} not found`);
    return;
  }
  
  const rows = Array.from(tbody.rows);
  const header = table.getElementsByTagName('th')[columnIndex];
  
  // Determine sort direction
  const isAscending = header.classList.contains('sort-asc');
  
  // Clear all sort classes
  table.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
  });
  
  // Add appropriate sort class
  header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
  
  // Sort rows
  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent.trim();
    const bValue = b.cells[columnIndex].textContent.trim();
    
    // Try to parse as numbers (handle currency and percentages)
    const aNum = parseFloat(aValue.replace(/[$,%]/g, ''));
    const bNum = parseFloat(bValue.replace(/[$,%]/g, ''));
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return isAscending ? bNum - aNum : aNum - bNum;
    } else {
      return isAscending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
    }
  });
  
  // Reattach sorted rows
  rows.forEach(row => tbody.appendChild(row));
  
  showNotification(`Table sorted by ${header.textContent.trim()}`, 'success');
}

// Export functionality - FIXED
function exportData(type) {
  console.log(`Exporting data: ${type}`);
  
  let data, filename;
  
  switch(type) {
    case 'campaigns':
      data = dashboardData.platform_data;
      filename = 'healthkart_campaign_performance.csv';
      break;
    case 'influencers':
      data = dashboardData.top_influencers;
      filename = 'healthkart_influencer_insights.csv';
      break;
    case 'payouts':
      data = dashboardData.top_influencers.slice(0, 8).map((inf, index) => ({
        influencer: inf.name,
        platform: inf.platform,
        category: inf.category,
        revenue: inf.revenue,
        roi: inf.roi,
        roas: inf.roas,
        payment_model: index % 3 === 0 ? 'Per Order' : 'Per Post',
        status: Math.random() > 0.7 ? 'Pending' : 'Paid'
      }));
      filename = 'healthkart_payout_tracking.csv';
      break;
    default:
      console.error('Unknown export type:', type);
      return;
  }
  
  try {
    downloadCSV(data, filename);
    showNotification(`${filename} exported successfully!`, 'success');
  } catch (error) {
    console.error('Export failed:', error);
    showNotification('Export failed. Please try again.', 'error');
  }
}

function exportDashboardData() {
  console.log('Exporting complete dashboard data');
  
  const reportData = {
    summary: dashboardData.performance_summary,
    platforms: dashboardData.platform_data,
    brands: dashboardData.brand_performance,
    top_influencers: dashboardData.top_influencers.slice(0, 10),
    monthly_trends: dashboardData.monthly_trends,
    categories: dashboardData.categories,
    exported_at: new Date().toISOString()
  };
  
  try {
    downloadJSON(reportData, 'healthkart_dashboard_report.json');
    showNotification('Complete dashboard report exported successfully!', 'success');
  } catch (error) {
    console.error('Export failed:', error);
    showNotification('Export failed. Please try again.', 'error');
  }
}

function downloadCSV(data, filename) {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(',')
  );
  
  const csvContent = [csvHeaders, ...csvRows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadJSON(data, filename) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Notification system
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification-toast');
  existingNotifications.forEach(n => n.remove());
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification-toast ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    font-size: 14px;
    animation: slideInRight 0.3s ease;
  `;
  
  const closeButton = notification.querySelector('.notification-close');
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 12px;
    padding: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const content = notification.querySelector('.notification-content');
  content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .positive {
    color: #28a745 !important;
    font-weight: 600;
  }
  
  .negative {
    color: #dc3545 !important;
    font-weight: 600;
  }
  
  .data-table th.sort-asc .sort-icon::after {
    content: ' ↑';
  }
  
  .data-table th.sort-desc .sort-icon::after {
    content: ' ↓';
  }
`;
document.head.appendChild(styleSheet);

// Make functions globally available
window.sortTable = sortTable;
window.exportData = exportData;
window.exportDashboardData = exportDashboardData;

console.log('HealthKart Influencer Marketing Dashboard fully loaded!');