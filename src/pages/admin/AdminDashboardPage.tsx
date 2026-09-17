import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  FileDown,
  MousePointerClick,
  Clock,
  ArrowUpRight,
  Plus,
  Download,
  AlertCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../lib/admin/auth-store';
import { KpiMetric } from '../../lib/api/types';
import { Skeleton } from '../../components/admin/ui/BasicPrimitives';

export const AdminDashboardPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | 'ytd'>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState<KpiMetric[]>([]);
  const [trafficSeries, setTrafficSeries] = useState<any[]>([]);
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [cityEnquiries, setCityEnquiries] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [needsAttention, setNeedsAttention] = useState<any[]>([]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [kpiData, traffic, projects, cityData, srcData, devData, actFeed, attention] =
        await Promise.all([
          api.analytics.getDashboardKpis(dateRange),
          api.analytics.getTrafficSeries(dateRange),
          api.analytics.getTopProjects(6),
          api.analytics.getEnquiriesByCity(),
          api.analytics.getTrafficSources(),
          api.analytics.getDeviceSplit(),
          api.analytics.getRecentActivity(),
          api.analytics.getNeedsAttention(),
        ]);

      setKpis(kpiData);
      setTrafficSeries(traffic);
      setTopProjects(projects);
      setCityEnquiries(cityData.slice(0, 6));
      setSources(srcData);
      setDevices(devData);
      setActivityFeed(actFeed);
      setNeedsAttention(attention);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const exportWidgetDataAsCsv = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${dateRange}.csv`;
    a.click();
  };

  const formatKpiValue = (val: number, format: string) => {
    if (format === 'percent') return `${val.toFixed(2)}%`;
    if (format === 'duration') return `${Math.floor(val / 60)}m ${val % 60}s`;
    if (format === 'currency') return `₹${(val / 10000000).toFixed(2)} Cr`;
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6">
      {/* 1. Greeting Row & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Good day, {user?.name || 'Administrator'}
            </h1>
            <span className="text-[10px] font-semibold text-[#A8823C] bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            · Pan-India Luxury Township Inventory & Lead Pipeline
          </p>
        </div>

        {/* Date-Range Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Selector */}
          <div className="inline-flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
            {[
              { key: 'today', label: 'Today' },
              { key: '7d', label: '7D' },
              { key: '30d', label: '30D' },
              { key: '90d', label: '90D' },
              { key: 'ytd', label: 'YTD' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setDateRange(tab.key as any)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  dateRange === tab.key
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* 2. Six KPI Cards with Sparklines and Deltas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-2"
              >
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          : kpis.map((kpi) => {
              const delta = ((kpi.currentValue - kpi.previousValue) / kpi.previousValue) * 100;
              const isPositive = delta >= 0;

              return (
                <div
                  key={kpi.id}
                  className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs flex flex-col justify-between space-y-2 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 block truncate">
                      {kpi.label}
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {formatKpiValue(kpi.currentValue, kpi.format)}
                      </span>
                      <span
                        className={`inline-flex items-center text-[11px] font-medium ${
                          isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                        )}
                        {Math.abs(delta).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Tiny Sparkline */}
                  <div className="h-8 w-full pt-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={kpi.sparklineData.map((val, idx) => ({ val, idx }))}>
                        <Area
                          type="monotone"
                          dataKey="val"
                          stroke="#A8823C"
                          strokeWidth={1.5}
                          fill="#A8823C"
                          fillOpacity={0.15}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
      </div>

      {/* 3. Traffic Over Time & Top Projects Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Visitor Traffic Velocity
              </h3>
              <p className="text-xs text-neutral-500">
                Current period compared with previous period benchmark
              </p>
            </div>
            <button
              type="button"
              onClick={() => exportWidgetDataAsCsv(trafficSeries, 'traffic-velocity')}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              title="Export as CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="currentTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A8823C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A8823C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="previousTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#737373" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#737373" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" opacity={0.6} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737373' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#737373' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area
                  type="monotone"
                  name="Current Period"
                  dataKey="current"
                  stroke="#A8823C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#currentTraffic)"
                />
                <Area
                  type="monotone"
                  name="Previous Period"
                  dataKey="previous"
                  stroke="#737373"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#previousTraffic)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 10 Projects Horizontal Bar */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Top Developments
              </h3>
              <p className="text-xs text-neutral-500">Ranked by buyer page views & leads</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-[11px] font-medium text-[#A8823C] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {topProjects.map((p, idx) => (
              <div key={p.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[180px]">
                    {idx + 1}. {p.name}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    <strong>{p.views.toLocaleString()}</strong> views · {p.enquiries} leads
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A8823C] rounded-full"
                    style={{ width: `${Math.max(15, 100 - idx * 16)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Enquiries by City, Traffic Sources Donut & Device Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* City Enquiries */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Enquiries by Hub
            </h3>
            <span className="text-[11px] text-neutral-400">Pan-India distribution</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityEnquiries} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" opacity={0.6} />
                <XAxis dataKey="city" tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#737373' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" fill="#A8823C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Donut */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Acquisition Channels
            </h3>
            <span className="text-[11px] text-neutral-400">Visitor sources</span>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-neutral-600 dark:text-neutral-400">
            {sources.map((s) => (
              <span key={s.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.fill }} />
                {s.name} ({s.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Device Split & Platform */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Device Breakdown
            </h3>
            <span className="text-[11px] text-neutral-400">Screen categories</span>
          </div>

          <div className="space-y-4 pt-2">
            {devices.map((d) => (
              <div key={d.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-700 dark:text-neutral-300">{d.name}</span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{d.value}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${d.value}%`, backgroundColor: d.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Live Activity Feed & Needs Attention Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Attention Panel */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Action Items Requiring Attention
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {needsAttention.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 hover:border-amber-400 transition-colors"
              >
                <div className="space-y-1 max-w-sm">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A8823C] hover:underline shrink-0 ml-2"
                >
                  <span>Resolve</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Live Governance & Lead Stream
            </h3>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
              Real-time
            </span>
          </div>

          <div className="space-y-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {activityFeed.map((act) => (
              <div key={act.id} className="pt-2.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {act.title}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">{act.subtitle}</p>
                </div>
                <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                  {new Date(act.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
