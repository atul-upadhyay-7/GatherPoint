
import { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import { Calendar, User, DollarSign, Clock, Search, Eye, Mail, Printer, Check, X, ShieldAlert } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [errorMsg, setErrorMsg] = useState('');

  // Selected order details modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Email receipt modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await ApiService.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load orders history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleOpenEmailModal = (order) => {
    setSelectedOrder(order);
    setEmailInput(order.customer?.email || '');
    setEmailSuccess('');
    setShowEmailModal(true);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    try {
      setEmailLoading(true);
      setEmailSuccess('');
      // In the backend, send receipt requires payment ID, but if we don't have payment ID we can use a custom mock or sendReceipt(orderId, email) helper
      // Wait, let's look at the ApiService call: static async sendReceipt(orderId, email) { ... } -> actually `/api/payments/${orderId}/email`
      await ApiService.sendReceipt(selectedOrder.id, emailInput);
      setEmailSuccess(`Receipt successfully emailed to ${emailInput}!`);
    } catch (err) {
      setErrorMsg('Failed to email receipt.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePrintReceipt = (order) => {
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    const itemsHtml = order.items?.map(item => `
      <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;">
        <span>${item.quantity}x ${item.product?.productName || item.productName || 'Item'}</span>
        <span>₹${item.totalPrice?.toFixed(2)}</span>
      </div>
    `).join('') || '';

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt ${order.orderNumber}</title>
          <style>
            body { font-family: monospace; padding: 20px; color: #000; }
            .header { text-align: center; margin-bottom: 20px; }
            .divider { border-bottom: 1px dashed #000; margin: 15px 0; }
            .flex-between { display: flex; justify-content: space-between; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="header">
            <h2>GATHERPOINT CAFE</h2>
            <p>123 Dining Street, Cloud City</p>
            <p>Phone: +91 98765 43210</p>
          </div>
          <div class="divider"></div>
          <p>Order: <b>${order.orderNumber}</b></p>
          <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
          <p>Table: ${order.table?.tableNumber || 'Takeaway'}</p>
          <p>Cashier: ${order.employee?.name || 'Staff'}</p>
          <div class="divider"></div>
          ${itemsHtml}
          <div class="divider"></div>
          <div class="flex-between"><span>Subtotal:</span><span>₹${order.subtotal?.toFixed(2)}</span></div>
          <div class="flex-between"><span>Tax (5%):</span><span>₹${order.tax?.toFixed(2)}</span></div>
          ${order.discount > 0 ? `<div class="flex-between"><span>Discount:</span><span>-₹${order.discount?.toFixed(2)}</span></div>` : ''}
          <div class="divider"></div>
          <div class="flex-between bold" style="font-size: 16px;"><span>TOTAL:</span><span>₹${order.total?.toFixed(2)}</span></div>
          <div class="divider"></div>
          <p style="text-align: center; font-size: 12px; margin-top: 30px;">Thank You! Please Visit Again.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredOrders = orders
    .filter(o => statusFilter === 'ALL' || o.status === statusFilter)
    .filter(o => 
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.table?.tableNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase())
    );

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#8A6623]">
            Orders History
          </h1>
          <p className="text-gray-400 text-sm mt-1">Search past order receipts, verify payments, and reprint bills</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3 text-sm">
          <ShieldAlert size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-800/40 p-4 rounded-3xl border border-gray-700/40">
        <div className="relative w-full md:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
            placeholder="Search by Order #, Table, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          {['ALL', 'DRAFT', 'PAID', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#cfad56] text-black'
                  : 'bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-xs">Loading orders database...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/25 border border-gray-700/30 rounded-3xl">
          <Clock className="mx-auto text-gray-600 mb-2" size={40} />
          <p className="text-gray-400 font-bold text-sm">No Orders Found</p>
          <p className="text-gray-600 text-xs mt-1">Try modifying your search query or filters.</p>
        </div>
      ) : (
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700/40 text-gray-400 font-bold uppercase text-[10px] tracking-wider bg-gray-800/50">
                  <th className="py-4 px-6">Order Number</th>
                  <th className="py-4 px-4">Date & Time</th>
                  <th className="py-4 px-4">Table</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Cashier</th>
                  <th className="py-4 px-4 text-right">Amount</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/20">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-[#D4AF37] font-semibold">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white">
                      {order.table?.tableNumber || <span className="text-gray-500 font-normal">Takeaway</span>}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-300">
                      {order.customer?.name || <span className="text-gray-500">Walk-in</span>}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-400">
                      {order.employee?.name || 'System'}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-white">
                      ₹{order.total?.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                        order.status === 'PAID'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : order.status === 'CANCELLED'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => handleOpenDetails(order)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="View Invoice"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => handlePrintReceipt(order)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Print Receipt"
                        >
                          <Printer size={13} />
                        </button>
                        <button
                          onClick={() => handleOpenEmailModal(order)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Email Receipt"
                        >
                          <Mail size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 border border-gray-700 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Invoice Details</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Meta information */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-gray-900/40 p-4 rounded-2xl border border-gray-700/30">
                <div className="space-y-1">
                  <p className="text-gray-500">Date</p>
                  <p className="font-semibold text-white">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Status</p>
                  <p className="font-bold text-white uppercase">{selectedOrder.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Table</p>
                  <p className="font-semibold text-white">{selectedOrder.table?.tableNumber || 'Takeaway'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Cashier</p>
                  <p className="font-semibold text-white">{selectedOrder.employee?.name || 'Staff'}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items Summary</h4>
                <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-700/20">
                      <div>
                        <p className="font-semibold text-white">
                          {item.product?.productName || item.productName || 'Item'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x ₹{item.product?.price || item.productPrice || 0}
                        </p>
                      </div>
                      <span className="font-bold text-white">₹{item.totalPrice?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-gray-700/50 pt-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{selectedOrder.tax?.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-rose-400 font-semibold">
                    <span>Discount</span>
                    <span>-₹{selectedOrder.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-base text-white border-t border-gray-700/40 pt-2">
                  <span>Total Amount</span>
                  <span className="text-[#D4AF37]">₹{selectedOrder.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Receipt actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-700/50 justify-end">
              <button
                onClick={() => handlePrintReceipt(selectedOrder)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gray-700 hover:bg-gray-600 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer size={13} /> Print
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleOpenEmailModal(selectedOrder);
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gray-700 hover:bg-gray-600 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Mail size={13} /> Email
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl border border-gray-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 border border-gray-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h3 className="text-lg font-bold text-white">Email Receipt</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {emailSuccess ? (
              <div className="space-y-4 text-center py-6">
                <Check className="mx-auto text-emerald-400" size={40} />
                <p className="text-emerald-400 font-bold text-sm">{emailSuccess}</p>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-6 py-2 text-xs font-bold uppercase bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Customer Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. customer@example.com"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl border border-gray-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {emailLoading ? 'Sending...' : 'Send Receipt'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}