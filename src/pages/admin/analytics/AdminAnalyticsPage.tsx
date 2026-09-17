import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  PhoneCall,
  Download,
  Calendar,
  Building2,
  MapPin,
  Smartphone,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
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
import { api } from '../../../lib/api';
import { Button, Badge } from '../../../components/admin/ui/BasicPrimitives';

export const AdminAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | 'ytd'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  const [kpis, setKpis] = useState<any[]>([]);
  const [trafficSeries, setTrafficSeries] = useState<any[]>([]);
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [cityEnquiries, setCityEnquiries] = useState<any[]>([]);
  const [trafficSources, setTrafficSources] = useState<any[]>([]);
  const [deviceSplit, setDeviceSplit] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.analytics.getDashboardKpis(dateRange),
      api.analytics.getTrafficSeries(dateRange),
      api.analytics.getTopProjects(8),
      api.analytics.getEnquiriesByCity(),
      api.analytics.getTrafficSources(),
      api.analytics.getDeviceSplit(),
    ])
      .then(([k, t, p, c, s, d]) => {
        setKpis(k);
        setTrafficSeries(t);
        setTopProjects(p);
        setCityEnquiries(c);
        setTrafficSources(s);
        setDeviceSplit(d);
      })
      .finally(() => setIsLoading(false));
  }, [dateRange]);

  const COLORS = ['#A8823C', '#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#64748B'];

  const handleExport = () => {
    const data = trafficSeries;
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((r) => Object.values(r).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" /> Analytics & Investor Intelligence
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time portfolio footfall, luxury enquiry conversion funnels, and marketing attribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded p-0.5 text-xs">
            {(['today', '7d', '30d', '90d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 rounded font-semibold uppercase text-[11px] transition-colors ${
                  dateRange === r
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, idx) => (
          <div
            key={k.id || `kpi-${k.label || idx}`}
            className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-2"
          >
            <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
              {k.label}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">
                {k.format === 'currency'
                  ? `₹${((k.currentValue || 0) / 100000).toFixed(1)}L`
                  : k.format === 'percent'
                  ? `${k.currentValue || 0}%`
                  : (k.currentValue || 0).toLocaleString()}
              </span>
              <div className="flex items-center text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
              </div>
            </div>
            <span className="text-[10px] text-neutral-400">vs prior period</span>
          </div>
        ))}
      </div>

      {/* Traffic Trend Chart */}
      <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Visitor Traffic & Inbound Enquiries
            </h3>
            <p className="text-xs text-neutral-500">
              Unique portfolio visits plotted alongside luxury lead generation volume
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100" /> Visitors
            </span>
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Enquiries
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficSeries}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#737373" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#737373" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8823C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A8823C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.5} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#171717',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  border: 'none',
                }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#525252" fillOpacity={1} fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="leads" stroke="#A8823C" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Viewed Projects */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-600" /> Top Performing Projects
          </h3>
          <div className="space-y-3">
            {topProjects.map((p, idx) => (
              <div key={p.id || p.name || `project-${idx}`} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-neutral-400 font-bold w-4">{idx + 1}</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-neutral-500">{p.views?.toLocaleString()} views</span>
                  <span className="font-semibold text-amber-600">{p.enquiries} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Demand Breakdown */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" /> Regional Lead Origin
          </h3>
          <div className="space-y-3">
            {cityEnquiries.map((c, idx) => (
              <div key={c.city || `city-${idx}`} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{c.city}</span>
                  <span className="text-neutral-500 font-mono">{c.count} enquiries</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${Math.min(100, (c.count / 300) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Sources */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" /> Inbound Acquisition Channels
          </h3>
          <div className="space-y-3">
            {trafficSources.map((s, idx) => {
              const channelName = s.channel || s.name || `Channel ${idx + 1}`;
              const pct = s.percentage ?? s.value ?? 0;
              return (
                <div key={channelName || `source-${idx}`} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">{channelName}</span>
                  <span className="font-mono text-neutral-500">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
