import { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import { Plus, Edit2, Trash2, Home, Grid, Check, X, ShieldAlert, Users } from 'lucide-react';

export default function Tables() {
  const [floors, setFloors] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [floorName, setFloorName] = useState('');

  const [showTableModal, setShowTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const [tableSeats, setTableSeats] = useState(4);
  const [tableFloorId, setTableFloorId] = useState('');
  const [tableActive, setTableActive] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const [floorsData, tablesData] = await Promise.all([
        ApiService.getFloors(),
        ApiService.getTables(),
      ]);
      setFloors(Array.isArray(floorsData) ? floorsData : []);
      setTables(Array.isArray(tablesData) ? tablesData : []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load floors and tables.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Floor handlers
  const handleOpenFloorModal = (floor = null) => {
    setSelectedFloor(floor);
    setFloorName(floor ? floor.name : '');
    setShowFloorModal(true);
  };

  const handleSaveFloor = async (e) => {
    e.preventDefault();
    if (!floorName.trim()) return;
    try {
      setErrorMsg('');
      if (selectedFloor) {
        await ApiService.updateFloor(selectedFloor.id, { name: floorName });
      } else {
        await ApiService.createFloor({ name: floorName });
      }
      setShowFloorModal(false);
      fetchData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save floor.');
    }
  };

  const handleDeleteFloor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this floor? All tables on it will be unassigned.')) return;
    try {
      setErrorMsg('');
      await ApiService.deleteFloor(id);
      fetchData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete floor.');
    }
  };

  // Table handlers
  const handleOpenTableModal = (table = null) => {
    setSelectedTable(table);
    setTableNumber(table ? table.tableNumber : '');
    setTableSeats(table ? table.seats : 4);
    setTableFloorId(table && table.floor ? table.floor.id : (floors[0]?.id || ''));
    setTableActive(table ? table.active : true);
    setShowTableModal(true);
  };

  const handleSaveTable = async (e) => {
    e.preventDefault();
    if (!tableNumber.trim() || !tableFloorId) return;
    try {
      setErrorMsg('');
      const tableData = {
        tableNumber,
        seats: parseInt(tableSeats),
        active: tableActive,
        floor: { id: parseInt(tableFloorId) }
      };

      if (selectedTable) {
        await ApiService.updateTable(selectedTable.id, tableData);
      } else {
        await ApiService.createTable(tableData);
      }
      setShowTableModal(false);
      fetchData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save table.');
    }
  };

  const handleDeleteTable = async (id) => {
    if (!window.confirm('Are you sure you want to delete this table?')) return;
    try {
      setErrorMsg('');
      await ApiService.deleteTable(id);
      fetchData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete table.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#8A6623]">
            Floors & Tables
          </h1>
          <p className="text-gray-400 text-sm mt-1">Configure layout, floors, and table capacities for Odoo Cafe</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3 text-sm">
          <ShieldAlert size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-xs">Loading layout data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Floors list (1/3 cols) */}
          <div className="bg-gray-800/40 border border-gray-700/60 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Home size={18} className="text-[#D4AF37]" /> Floors
              </h2>
              <button
                onClick={() => handleOpenFloorModal()}
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Floor
              </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {floors.length === 0 ? (
                <p className="text-gray-500 text-xs text-center py-8">No floors configured yet.</p>
              ) : (
                floors.map((floor) => (
                  <div
                    key={floor.id}
                    className="flex justify-between items-center p-3 bg-gray-900/60 border border-gray-700/30 rounded-xl hover:border-gray-600/50 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-white text-sm">{floor.name || 'Unnamed Floor'}</p>
                      <p className="text-[10px] text-gray-500 font-mono">ID: #{floor.id}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenFloorModal(floor)}
                        className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteFloor(floor.id)}
                        className="p-1.5 bg-gray-800 hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tables list (2/3 cols) */}
          <div className="lg:col-span-2 bg-gray-800/40 border border-gray-700/60 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid size={18} className="text-[#D4AF37]" /> Restaurant Tables
              </h2>
              <button
                disabled={floors.length === 0}
                onClick={() => handleOpenTableModal()}
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] px-3 py-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={12} /> Add Table
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {tables.length === 0 ? (
                <div className="md:col-span-2 py-12 text-center">
                  <p className="text-gray-500 text-xs">No tables configured yet.</p>
                </div>
              ) : (
                tables.map((table) => (
                  <div
                    key={table.id}
                    className="p-4 bg-gray-900/40 border border-gray-700/30 rounded-2xl flex justify-between items-start hover:border-gray-600/50 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base bg-gray-800 px-2.5 py-1 rounded-xl border border-gray-700/60">
                          {table.tableNumber}
                        </span>
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                          table.active
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                        }`}>
                          {table.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 space-y-0.5">
                        <p className="flex items-center gap-1.5">
                          <Users size={12} className="text-gray-500" /> {table.seats} Seats
                        </p>
                        <p className="text-[10px] text-gray-500">
                          Floor: <span className="text-gray-300 font-semibold">{table.floor?.name || 'Unassigned'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOpenTableModal(table)}
                        className="p-2 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteTable(table.id)}
                        className="p-2 bg-gray-800/80 hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floor Modal */}
      {showFloorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-800 border border-gray-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h3 className="text-lg font-bold text-white">
                {selectedFloor ? 'Edit Floor' : 'Create New Floor'}
              </h3>
              <button
                onClick={() => setShowFloorModal(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveFloor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                  Floor Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ground Floor"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                  value={floorName}
                  onChange={(e) => setFloorName(e.target.value)}
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowFloorModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-transparent hover:bg-gray-700/40 border border-gray-700 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Save Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-800 border border-gray-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h3 className="text-lg font-bold text-white">
                {selectedTable ? 'Edit Table' : 'Create New Table'}
              </h3>
              <button
                onClick={() => setShowTableModal(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTable} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Table Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. T5"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Seats Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    value={tableSeats}
                    onChange={(e) => setTableSeats(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                  Select Floor
                </label>
                <select
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm cursor-pointer"
                  value={tableFloorId}
                  onChange={(e) => setTableFloorId(e.target.value)}
                >
                  {floors.length === 0 ? (
                    <option disabled>No floors available</option>
                  ) : (
                    floors.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="tableActiveCheck"
                  className="w-4 h-4 rounded bg-gray-900 border-gray-700 text-[#D4AF37] focus:ring-0 cursor-pointer"
                  checked={tableActive}
                  onChange={(e) => setTableActive(e.target.checked)}
                />
                <label htmlFor="tableActiveCheck" className="text-sm text-gray-300 font-semibold select-none cursor-pointer">
                  Table is active and available
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setShowTableModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-transparent hover:bg-gray-700/40 border border-gray-700 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}