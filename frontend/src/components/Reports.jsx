import { useState } from 'react';
import {
  TrendingUp, ShoppingBag, Users, DollarSign, Download,
  BarChart3, CreditCard, Banknote, Smartphone,
} from 'lucide-react';
import PageHeader, { StatCard, DemoBadge, FilterButton } from './PageHeader';
import { demoReportStats } from '../data/demoData';

const PERIODS = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

const PAYMENT_ICONS = { CASH: Banknote, CARD: CreditCard, UPI: Smartphone };
const PAYMENT_COLORS = { CASH: 'bg-emerald-500', CARD: 'bg-blue-500', UPI: 'bg-purple-500' };

export default function Reports() {
  const [period, setPeriod] = useState('today');
  const stats = demoReportStats[period];
  const maxHourly = Math.max(...(stats.hourlySales?.map((h) => h.amount) || [1]));
  const totalPayments = Object.values(stats.paymentBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Track revenue, orders, and business performance at a glance"
        actions={
          <>
            <DemoBadge />
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white text-sm font-bold transition-all cursor-pointer">
              <Download size={18} /> Export
            </button>
          </>
        }
      />

      <div className="flex gap-3">
        {PERIODS.map((p) => (
          <FilterButton key={p.id} active={period === p.id} onClick={() => setPeriod(p.id)}>
            {p.label}
          </FilterButton>
        ))}
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={TrendingUp} color="gold" />
        <StatCard label="Total Orders" value={stats.orderCount} icon={ShoppingBag} color="green" />
        <StatCard label="Avg Order Value" value={`₹${stats.averageOrderValue.toFixed(0)}`} icon={DollarSign} color="blue" />
        <StatCard label="Customers Served" value={stats.customerCount} icon={Users} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-7">
          <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-[#D4AF37]" />
            Top Selling Products
          </h2>
          <div className="space-y-5">
            {stats.topProducts.map((product, idx) => {
              const maxRev = stats.topProducts[0].revenue;
              const pct = (product.revenue / maxRev) * 100;
              return (
                <div key={product.name}>
                  <div className="flex justify-between text-base mb-2">
                    <span className="text-white font-semibold">
                      <span className="text-[#D4AF37] mr-2">#{idx + 1}</span>
                      {product.name}
                    </span>
                    <span className="text-gray-400 text-sm">{product.quantity} sold · ₹{product.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8A6623] via-[#D4AF37] to-[#FFF2B2] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-7">
          <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <CreditCard size={24} className="text-[#D4AF37]" />
            Payment Methods
          </h2>
          <div className="space-y-5">
            {Object.entries(stats.paymentBreakdown).map(([method, amount]) => {
              const pct = ((amount / totalPayments) * 100).toFixed(1);
              const Icon = PAYMENT_ICONS[method];
              return (
                <div key={method} className="flex items-center gap-5">
                  <div className={`p-3.5 rounded-xl ${PAYMENT_COLORS[method]}/20 shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-base mb-2">
                      <span className="text-white font-semibold">{method}</span>
                      <span className="text-gray-400">₹{amount.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                      <div className={`h-full ${PAYMENT_COLORS[method]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-7 pt-5 border-t border-gray-700/40 grid grid-cols-3 gap-4 text-center">
            {Object.entries(stats.paymentBreakdown).map(([method, amount]) => (
              <div key={method} className="bg-gray-900/60 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-bold">{method}</p>
                <p className="text-white font-bold text-lg mt-1.5">₹{amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.hourlySales?.length > 0 && (
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-7">
          <h2 className="text-xl font-bold text-white mb-7">Hourly Sales — Today</h2>
          <div className="flex items-end gap-3 h-56">
            {stats.hourlySales.map((h) => (
              <div key={h.hour} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">₹{(h.amount / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-gradient-to-t from-[#8A6623] via-[#D4AF37] to-[#FFF2B2] rounded-t-xl transition-all duration-700 hover:opacity-80"
                  style={{ height: `${(h.amount / maxHourly) * 100}%`, minHeight: '12px' }}
                />
                <span className="text-xs text-gray-500 font-bold">{h.hour}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-700/40">
          <h2 className="text-xl font-bold text-white">Performance Summary</h2>
        </div>
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b border-gray-700/40 text-gray-400 font-bold uppercase text-xs tracking-wider bg-gray-800/50">
              <th className="py-4 px-7">Metric</th>
              <th className="py-4 px-5">Value</th>
              <th className="py-4 px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { metric: 'Revenue Target', value: `₹${stats.totalRevenue.toLocaleString()} / ₹${(stats.totalRevenue * 1.2).toFixed(0)}`, status: 'On Track', color: 'text-emerald-400' },
              { metric: 'Order Completion Rate', value: '94.2%', status: 'Good', color: 'text-emerald-400' },
              { metric: 'Average Wait Time', value: '12 min', status: 'Normal', color: 'text-amber-400' },
              { metric: 'Customer Satisfaction', value: '4.7 / 5.0', status: 'Excellent', color: 'text-emerald-400' },
              { metric: 'Table Turnover', value: '2.3x / day', status: 'Good', color: 'text-emerald-400' },
            ].map((row) => (
              <tr key={row.metric} className="border-b border-gray-700/20 hover:bg-gray-800/30 transition-colors">
                <td className="py-4 px-7 text-white font-medium">{row.metric}</td>
                <td className="py-4 px-5 text-gray-300">{row.value}</td>
                <td className={`py-4 px-5 font-bold ${row.color}`}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
