<script lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    BarController,
    DoughnutController,
    CategoryScale,
    LinearScale,
    ArcElement,
  } from 'chart.js';
  import type { AnalyticsRPCResponse, DashboardAnalyticsRow } from '@core/domain/analyticsSchema';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    BarController,
    DoughnutController,
    CategoryScale,
    LinearScale,
    ArcElement
  );

  let { data }: { data: AnalyticsRPCResponse } = $props();

  // Color palette AL13 B2B
  const BRAND_CYAN = '#38bdf8';
  const BRAND_GOLD = '#d4af37';
  const BRAND_RED = '#ef4444';
  const BRAND_GREEN = '#22c55e';
  const GLASS_BG = 'rgba(255, 255, 255, 0.05)';

  // 1. Process data for Pipeline Donut (By Status)
  let statusTotals = $derived.by(() => {
    const acc: Record<string, number> = {};
    data.forEach((row: DashboardAnalyticsRow) => {
      acc[row.status] = (acc[row.status] || 0) + Number(row.leads_count);
    });
    return acc;
  });

  let statusChartData = $derived({
    labels: Object.keys(statusTotals),
    datasets: [
      {
        data: Object.values(statusTotals),
        backgroundColor: [
          BRAND_CYAN,
          BRAND_GOLD,
          BRAND_GREEN,
          BRAND_RED,
          '#a855f7',
        ],
        borderWidth: 1,
        borderColor: '#090a0c',
      },
    ],
  });

  // 2. Process data for Bar Chart (Leads by Month)
  let monthTotals = $derived.by(() => {
    const acc: Record<string, number> = {};
    data.forEach((row: DashboardAnalyticsRow) => {
      // row.record_month comes as ISO string or Date depending on the DB bridge.
      const monthStr = new Date(row.record_month).toLocaleString('es-CO', {
        month: 'short',
        year: 'numeric',
      });
      acc[monthStr] = (acc[monthStr] || 0) + Number(row.leads_count);
    });
    return acc;
  });

  let monthChartData = $derived({
    labels: Object.keys(monthTotals),
    datasets: [
      {
        label: 'Leads Capturados',
        data: Object.values(monthTotals),
        backgroundColor: BRAND_CYAN,
        borderRadius: 4,
      },
    ],
  });

  // 3. KPI Cards Math
  let totalVolume = $derived(
    data.reduce((sum: number, row: DashboardAnalyticsRow) => sum + Number(row.total_estimated_value || 0), 0)
  );
  let totalLeads = $derived(
    data.reduce((sum: number, row: DashboardAnalyticsRow) => sum + Number(row.leads_count || 0), 0)
  );

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  let barCanvas: HTMLCanvasElement | undefined = $state();
  let donutCanvas: HTMLCanvasElement | undefined = $state();
  // We don't type the entire Chart config here to avoid bloat, we just need the controller
  let barChart: any;
  let donutChart: any;

  $effect(() => {
    if (barCanvas) {
      if (barChart) barChart.destroy();
      barChart = new ChartJS(barCanvas, {
        type: 'bar',
        data: monthChartData as any,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e0e0e0' } } },
          scales: {
            y: { ticks: { color: '#a0a0a0' } },
            x: { ticks: { color: '#a0a0a0' } },
          },
        }
      });
    }

    if (donutCanvas) {
      if (donutChart) donutChart.destroy();
      donutChart = new ChartJS(donutCanvas, {
        type: 'doughnut',
        data: statusChartData as any,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#e0e0e0' } } },
          cutout: '70%',
        }
      });
    }

    return () => {
      if (barChart) barChart.destroy();
      if (donutChart) donutChart.destroy();
    };
  });
</script>

<div class="analytics-container">
  <!-- KPI Grid -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <h3 class="kpi-title">Volumen Estimado Pipeline</h3>
      <p class="kpi-value">{formatter.format(totalVolume)}</p>
    </div>
    <div class="kpi-card">
      <h3 class="kpi-title">Total Leads Históricos</h3>
      <p class="kpi-value">{totalLeads}</p>
    </div>
    <div class="kpi-card">
      <h3 class="kpi-title">Costo Adquisición Orgánico</h3>
      <p class="kpi-value text-green-400">$0.00 COP</p>
      <p class="kpi-sub">SEO SSG Operativo al 100%</p>
    </div>
  </div>

  <!-- Charts Grid -->
  <div class="charts-grid">
    <div class="chart-box">
      <h2 class="chart-header">Evolución de Captación M/M</h2>
      <div class="chart-wrapper">
        <canvas bind:this={barCanvas}></canvas>
      </div>
    </div>

    <div class="chart-box">
      <h2 class="chart-header">Distribución por Pipeline Kanban</h2>
      <div class="chart-wrapper donut-wrapper">
        <canvas bind:this={donutCanvas}></canvas>
      </div>
    </div>
  </div>
</div>

<style>
  .analytics-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .kpi-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 1.5rem;
  }

  .kpi-title {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.5rem;
    font-family: 'Inter', sans-serif;
  }

  .kpi-value {
    font-size: 2rem;
    font-weight: 700;
    color: #f5f5f5;
    font-family: 'Outfit', sans-serif;
    line-height: 1.1;
  }

  .kpi-sub {
    font-size: 0.75rem;
    color: #a0a0a0;
    margin-top: 0.5rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.25rem;
  }

  .chart-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .chart-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #e0e0e0;
    margin-bottom: 1.25rem;
    font-family: 'Outfit', sans-serif;
  }

  .chart-wrapper {
    position: relative;
    height: 320px;
    width: 100%;
  }

  .donut-wrapper {
    height: 320px;
  }
</style>
