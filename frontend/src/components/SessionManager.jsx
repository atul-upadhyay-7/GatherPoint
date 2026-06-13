
import { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import useAuth from '../hooks/useAuth';
import { Play, Lock, Unlock, Calendar, DollarSign, History, User, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

export default function SessionManager() {
  const { user } = useAuth();
  const [activeSession, setActiveSession] = useState(null);
  const [loadingActive, setLoadingActive] = useState(true);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [openingAmount, setOpeningAmount] = useState('');
  const [closingAmount, setClosingAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchActiveSession = async () => {
    try {
      setLoadingActive(true);
      setErrorMsg('');
      const session = await ApiService.getActiveSession();
      if (session && session.id) {
        setActiveSession(session);
      } else {
        setActiveSession(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to check active session status.');
    } finally {
      setLoadingActive(false);
    }
  };

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const data = await ApiService.getSessionHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchActiveSession();
    fetchHistory();
  }, []);

  const handleOpenSession = async (e) => {
    e.preventDefault();
    if (!openingAmount || isNaN(openingAmount) || parseFloat(openingAmount) < 0) {
      setErrorMsg('Please enter a valid non-negative opening amount.');
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMsg('');
      setSuccessMsg('');
      const res = await ApiService.createSession({ openingAmount: parseFloat(openingAmount) });
      setSuccessMsg('POS session opened successfully!');
      setActiveSession(res);
      setOpeningAmount('');
      fetchHistory();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to open session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSession = async (e) => {
    e.preventDefault();
    if (!closingAmount || isNaN(closingAmount) || parseFloat(closingAmount) < 0) {
      setErrorMsg('Please enter a valid non-negative closing amount.');
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMsg('');
      setSuccessMsg('');
      await ApiService.closeSession(activeSession.id, parseFloat(closingAmount));
      setSuccessMsg('POS session closed successfully!');
      setActiveSession(null);
      setClosingAmount('');
      fetchHistory();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to close session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#8A6623]">
            Session Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Open or close your register shift and review session logs
          </p>
        </div>
        {activeSession ? (
          <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            <Unlock size={14} /> Active Session Open
          </span>
        ) : (
          <span className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full text-xs font-bold uppercase tracking-widest">
            <Lock size={14} /> Session Closed
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3 text-sm">
          <ShieldAlert size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center gap-3 text-sm">
          <CheckCircle size={18} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Action Card */}
        <div className="lg:col-span-1 bg-gray-800/50 backdrop-blur-md border border-gray-700/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          {loadingActive ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-xs">Checking session status...</p>
            </div>
          ) : activeSession ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-700/50 pb-4">
                <Unlock className="text-[#D4AF37]" size={22} />
                <h2 className="text-lg font-bold text-white">Active Session Details</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-700/30">
                  <span className="text-gray-400">Cashier</span>
                  <span className="font-semibold text-white">{activeSession.employee?.name || user?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700/30">
                  <span className="text-gray-400">Session ID</span>
                  <span className="font-mono text-[#D4AF37]">#{activeSession.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700/30">
                  <span className="text-gray-400">Opened At</span>
                  <span className="text-white">{formatDate(activeSession.openedAt)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Opening Balance</span>
                  <span className="font-bold text-emerald-400">₹{activeSession.openingAmount?.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleCloseSession} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Enter Closing Cash (₹)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                      placeholder="e.g. 1500.00"
                      value={closingAmount}
                      onChange={(e) => setClosingAmount(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-rose-600/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Lock size={16} /> Close Session
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-700/50 pb-4">
                <Lock className="text-gray-500" size={22} />
                <h2 className="text-lg font-bold text-white">Start New POS Session</h2>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed">
                Before opening the POS Terminal interface to take orders, you must open a register session and declare the starting cash balance in the drawer.
              </p>

              <form onSubmit={handleOpenSession} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Opening Cash Balance (₹)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                      placeholder="e.g. 1000.00"
                      value={openingAmount}
                      onChange={(e) => setOpeningAmount(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#cfad56] to-[#b8943f] hover:opacity-90 text-[#0a100d] font-bold py-3 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#0a100d] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Play size={16} fill="currentColor" /> Open Session
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Session History Card */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-md border border-gray-700/60 rounded-3xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 border-b border-gray-700/50 pb-4 mb-4">
            <History className="text-[#D4AF37]" size={22} />
            <h2 className="text-lg font-bold text-white">Session History logs</h2>
          </div>

          <div className="flex-1 overflow-x-auto">
            {loadingHistory ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-xs">Loading session history...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                <Clock size={40} className="text-gray-600" />
                <p className="text-gray-400 font-semibold">No Sessions Registered</p>
                <p className="text-gray-600 text-xs max-w-sm">No past drawer sessions were found. Opened sessions will be shown here.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-700/40 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="pb-3 pr-4">ID</th>
                    <th className="pb-3 pr-4">Employee</th>
                    <th className="pb-3 pr-4">Opened</th>
                    <th className="pb-3 pr-4">Closed</th>
                    <th className="pb-3 pr-4 text-right">Opening Cash</th>
                    <th className="pb-3 text-right">Closing Cash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/25">
                  {history.map((session) => (
                    <tr key={session.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs text-[#D4AF37]">#{session.id}</td>
                      <td className="py-3 pr-4 font-medium text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                          {(session.employee?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        {session.employee?.name || 'Staff User'}
                      </td>
                      <td className="py-3 pr-4 text-xs">{formatDate(session.openedAt)}</td>
                      <td className="py-3 pr-4 text-xs">
                        {session.closedAt ? (
                          formatDate(session.closedAt)
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-extrabold rounded-md uppercase tracking-wider animate-pulse">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-gray-400">₹{session.openingAmount?.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-white">
                        {session.closedAt ? `₹${session.closingAmount?.toFixed(2)}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}