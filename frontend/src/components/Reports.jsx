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

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={DollarSign} title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} sub={`${paidOrders.length} paid orders`} />
            <KpiCard icon={ShoppingBag} title="Total Orders" value={totalOrders} sub={`${cancelledCount} cancelled`} color="#60a5fa" />
            <KpiCard icon={TrendingUp} title="Avg Order Value" value={`₹${avgOrderValue.toFixed(0)}`} sub="per paid order" color="#34d399" />
            <KpiCard icon={Award} title="Completion Rate" value={totalOrders > 0 ? `${Math.round((paidOrders.length / totalOrders) * 100)}%` : '—'} sub="paid vs total" color="#a78bfa" />
          </div>

          {/* Revenue Chart + Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-gray-800/40 border border-gray-700/50 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#D4AF37]" /> Revenue Trend
                </h2>
                <span className="text-xs text-gray-500">{DATE_RANGES.find(r => r.value === dateRange)?.label}</span>
              </div>
              {chartValues.length === 0 || maxVal === 1 ? (
                <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
                  No revenue data for this period
                </div>
              ) : (
                <div className="relative h-52 w-full">
                  <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={areaPath} fill="url(#rptGrad)" />
                    <path d={linePath} fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p, i) => (
                      <g key={i} className="group">
                        <circle cx={p.x} cy={p.y} r="5" fill="#020403" stroke="#D4AF37" strokeWidth="2.5" className="cursor-pointer" />
                        <text x={p.x} y={p.y - 14} fill="#FAF8F1" fontSize="12" fontWeight="bold" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{chartValues[i].toLocaleString('en-IN')}
                        </text>
                        {i % Math.max(1, Math.floor(chartKeys.length / 6)) === 0 && (
                          <text x={p.x} y={chartH + 22} fill="#6b7280" fontSize="11" textAnchor="middle">
                            {chartKeys[i]}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
              )}
            </div>

            {/* Status Breakdown */}
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-3xl p-6 space-y-4">
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Filter size={18} className="text-[#D4AF37]" /> Order Status
              </h2>
              <div className="space-y-3">
                {Object.entries(statusCounts).map(([status, count]) => {
                  const pct = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
                  const colors = { PAID: 'emerald', DRAFT: 'yellow', CANCELLED: 'rose' };
                  const c = colors[status] || 'gray';
                  return (
                    <div key={status} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className={`font-bold text-${c}-400`}>{status}</span>
                        <span className="text-gray-400">{count} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${c}-400 rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-700/50 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Total Orders</span><span className="text-white font-bold">{totalOrders}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Revenue Collected</span><span className="text-[#D4AF37] font-bold">₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-3xl p-6 space-y-4">
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              <Award size={18} className="text-[#D4AF37]" /> Top Products by Revenue
            </h2>
            {topProducts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No product data for this period.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700/50">
                      <th className="text-left py-3 pr-4">#</th>
                      <th className="text-left py-3 pr-4">Product</th>
                      <th className="text-right py-3 pr-4">Qty Sold</th>
                      <th className="text-right py-3">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/20">
                    {topProducts.map(([name, data], i) => (
                      <tr key={name} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 pr-4 text-gray-600 font-mono text-xs">{i + 1}</td>
                        <td className="py-3 pr-4 font-semibold text-white">{name}</td>
                        <td className="py-3 pr-4 text-right text-gray-400">{data.qty}</td>
                        <td className="py-3 text-right font-bold text-[#D4AF37]">₹{data.revenue.toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-3xl p-6 space-y-4">
            <h2 className="text-white font-bold text-base flex items-center gap-2">
              <Clock size={18} className="text-[#D4AF37]" /> Recent Orders
              <span className="text-xs text-gray-500 font-normal">({filteredOrders.length} total)</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-wider border-b border-gray-700/50">
                    <th className="text-left py-3 px-2">Order #</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Table</th>
                    <th className="text-left py-3 px-2">Customer</th>
                    <th className="text-right py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/20">
                  {filteredOrders.slice(0, 10).map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-mono text-[11px] text-[#D4AF37]">{order.orderNumber}</td>
                      <td className="py-3 px-2 text-xs text-gray-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}
                      </td>
                      <td className="py-3 px-2 text-xs text-white font-semibold">
                        {order.table?.tableNumber || <span className="text-gray-500">Takeaway</span>}
                      </td>
                      <td className="py-3 px-2 text-xs text-gray-300">
                        {order.customer?.name || <span className="text-gray-600">Walk-in</span>}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-white">
                        ₹{(order.total || order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                          order.status === 'PAID'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : order.status === 'CANCELLED'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <p className="text-center text-gray-600 text-sm py-10">No orders for this period.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
