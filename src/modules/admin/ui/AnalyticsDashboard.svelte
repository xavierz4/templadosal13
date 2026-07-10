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
  import type { ChartData } from 'chart.js';
  import type {
    AnalyticsRPCResponse,
    DashboardAnalyticsRow,
    SourceAnalyticsResponse,
  } from '@core/domain/analyticsSchema';

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

  let { data, sources = [] }: { data: AnalyticsRPCResponse; sources?: SourceAnalyticsResponse } =
    $props();

  // Color palette AL13 B2B — alineada al acento cyan/emerald de la marca.
  // Los cortes del donut usan la paleta semántica de estados del Kanban.
  const BRAND_CYAN = '#38bdf8';
  const BRAND_RED = '#ef4444';
  const BRAND_GREEN = '#22c55e';
  const BRAND_AMBER = '#fbbf24';

  // ── Filtros (client-side sobre los datos ya agregados) ──
  let productFilter = $state('all');
  let periodFilter = $state('all'); // all | 3m | 6m | 12m

  const PRODUCT_OPTIONS = [
    { id: 'all', label: 'Todos los productos' },
    { id: 'cabina_ducha', label: 'Cabina de Ducha' },
    { id: 'divisor_oficina', label: 'Divisor de Oficina' },
    { id: 'fachada_monumental', label: 'Fachada Monumental' },
    { id: 'puerta_pivotante', label: 'Puerta Pivotante' },
  ];
  const PERIOD_OPTIONS = [
    { id: 'all', label: 'Todo el histórico' },
    { id: '3m', label: 'Últimos 3 meses' },
    { id: '6m', label: 'Últimos 6 meses' },
    { id: '12m', label: 'Últimos 12 meses' },
  ];

  const periodMonths: Record<string, number> = { '3m': 3, '6m': 6, '12m': 12 };

  const filteredData = $derived.by(() => {
    let cutoff = 0;
    if (periodFilter !== 'all') {
      const months = periodMonths[periodFilter];
      const now = new Date(data[0]?.record_month ?? '2026-01-01');
      cutoff = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1).getTime();
    }
    return data.filter((row: DashboardAnalyticsRow) => {
      if (productFilter !== 'all' && row.product_type !== productFilter) return false;
      if (cutoff && new Date(row.record_month).getTime() < cutoff) return false;
      return true;
    });
  });

  // 1. Process data for Pipeline Donut (By Status)
  let statusTotals = $derived.by(() => {
    const acc: Record<string, number> = {};
    filteredData.forEach((row: DashboardAnalyticsRow) => {
      acc[row.status] = (acc[row.status] || 0) + Number(row.leads_count);
    });
    return acc;
  });

  let statusChartData = $derived({
    labels: Object.keys(statusTotals),
    datasets: [
      {
        data: Object.values(statusTotals),
        backgroundColor: [BRAND_CYAN, BRAND_AMBER, BRAND_GREEN, BRAND_RED, '#a855f7'],
        borderWidth: 1,
        borderColor: '#090a0c',
      },
    ],
  });

  // 2. Process data for Bar Chart (Leads by Month)
  let monthTotals = $derived.by(() => {
    const acc: Record<string, number> = {};
    filteredData.forEach((row: DashboardAnalyticsRow) => {
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
        // Evita que con pocos meses la barra se estire a todo el ancho
        maxBarThickness: 64,
      },
    ],
  });

  // 3. KPI Cards Math
  let totalVolume = $derived(
    filteredData.reduce(
      (sum: number, row: DashboardAnalyticsRow) => sum + Number(row.total_estimated_value || 0),
      0
    )
  );
  let totalLeads = $derived(
    filteredData.reduce(
      (sum: number, row: DashboardAnalyticsRow) => sum + Number(row.leads_count || 0),
      0
    )
  );

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  // 4. Atribución por fuente (ordenada por volumen de leads desc)
  const sortedSources = $derived(
    [...sources].sort((a, b) => Number(b.leads_count ?? 0) - Number(a.leads_count ?? 0))
  );

  let barCanvas: HTMLCanvasElement | undefined = $state();
  let donutCanvas: HTMLCanvasElement | undefined = $state();
  let barChart: ChartJS | undefined;
  let donutChart: ChartJS | undefined;

  $effect(() => {
    if (barCanvas) {
      if (barChart) barChart.destroy();
      barChart = new ChartJS(barCanvas, {
        type: 'bar',
        data: monthChartData as ChartData<'bar'>,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e0e0e0' } } },
          scales: {
            y: { ticks: { color: '#a0a0a0' } },
            x: { ticks: { color: '#a0a0a0' } },
          },
        },
      });
    }

    if (donutCanvas) {
      if (donutChart) donutChart.destroy();
      donutChart = new ChartJS(donutCanvas, {
        type: 'doughnut',
        data: statusChartData as ChartData<'doughnut'>,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#e0e0e0' } } },
          cutout: '70%',
        },
      });
    }

    return () => {
      if (barChart) barChart.destroy();
      if (donutChart) donutChart.destroy();
    };
  });
</script>

<div class="analytics-container">
  <!-- Filtros -->
  <div class="filter-bar">
    <select class="filter-select" bind:value={productFilter} aria-label="Filtrar por producto">
      {#each PRODUCT_OPTIONS as opt (opt.id)}
        <option value={opt.id}>{opt.label}</option>
      {/each}
    </select>
    <select class="filter-select" bind:value={periodFilter} aria-label="Filtrar por período">
      {#each PERIOD_OPTIONS as opt (opt.id)}
        <option value={opt.id}>{opt.label}</option>
      {/each}
    </select>
    {#if productFilter !== 'all' || periodFilter !== 'all'}
      <button
        class="filter-clear"
        onclick={() => {
          productFilter = 'all';
          periodFilter = 'all';
        }}>Limpiar filtros</button
      >
    {/if}
  </div>

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

  <!-- Atribución de marketing (utm_source / utm_campaign) -->
  <div class="source-box">
    <h2 class="chart-header">Atribución de Leads por Fuente</h2>
    {#if sortedSources.length === 0}
      <p class="source-empty">Sin datos de atribución todavía.</p>
    {:else}
      <table class="source-table">
        <thead>
          <tr>
            <th>Fuente</th>
            <th>Campaña</th>
            <th class="num">Leads</th>
            <th class="num">Valor estimado</th>
          </tr>
        </thead>
        <tbody>
          {#each sortedSources as row (row.source + '|' + row.campaign)}
            <tr>
              <td><span class="source-tag">{row.source}</span></td>
              <td class="muted">{row.campaign}</td>
              <td class="num">{row.leads_count}</td>
              <td class="num">{formatter.format(Number(row.total_value ?? 0))}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .analytics-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  /* Filtros */
  .filter-bar {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .filter-select {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #e0e0e0;
    font-size: 0.82rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  .filter-select:focus {
    border-color: rgba(56, 189, 248, 0.5);
  }
  .filter-clear {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.78rem;
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-clear:hover {
    color: #fff;
    border-color: rgba(56, 189, 248, 0.4);
  }

  /* Atribución */
  .source-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 0.875rem;
    padding: 1.5rem;
  }
  .source-empty {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.35);
    padding: 0.5rem 0;
  }
  .source-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;
  }
  .source-table th {
    text-align: left;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .source-table td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    color: #d0d0d0;
  }
  .source-table .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .source-table .muted {
    color: rgba(255, 255, 255, 0.45);
  }
  .source-tag {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--color-al13-cyan);
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 999px;
    padding: 0.15rem 0.6rem;
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
