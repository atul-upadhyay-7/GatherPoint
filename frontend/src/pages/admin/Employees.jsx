import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Shield, ChefHat, UserCheck, ToggleLeft, ToggleRight,
  WifiOff, ShieldAlert, Check, X,
} from 'lucide-react';
import ApiService from '../../services/apiService';
import { demoStaff } from '../../data/demoData';

const ROLE_COLORS = {
  ADMIN: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  EMPLOYEE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  KITCHEN_STAFF: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const ROLE_ICONS = { ADMIN: Shield, EMPLOYEE: UserCheck, KITCHEN_STAFF: ChefHat };

const emptyForm = { name: '', email: '', password: '', role: 'EMPLOYEE', allowOfflineSelling: true };

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await ApiService.getEmployees();
      const list = Array.isArray(data) ? data : [];
      if (list.length === 0) {
        setEmployees(demoStaff.map((s) => ({ ...s, allowOfflineSelling: true })));
        setUsingDemo(true);
      } else {
        setEmployees(list);
        setUsingDemo(false);
      }
    } catch {
      setEmployees(demoStaff.map((s) => ({ ...s, allowOfflineSelling: true })));
      setUsingDemo(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setEditing(emp);
    setForm({
      name: emp.name,
      email: emp.email,
      password: '',
      role: emp.role,
      allowOfflineSelling: emp.allowOfflineSelling !== false,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (usingDemo) {
      setShowModal(false);
      return;
    }
    try {
      if (editing) {
        await ApiService.updateEmployee(editing.id, {
          name: form.name,
          email: form.email,
          role: form.role,
          active: editing.active,
          allowOfflineSelling: form.allowOfflineSelling,
        });
      } else {
        await ApiService.createEmployee({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          allowOfflineSelling: form.allowOfflineSelling,
        });
      }
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save employee');
    }
  };

  const handleToggleActive = async (emp) => {
    if (usingDemo) return;
    try {
      await ApiService.archiveEmployee(emp.id);
      fetchEmployees();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleToggleOffline = async (emp) => {
    if (usingDemo) {
      setEmployees((prev) =>
        prev.map((e) => e.id === emp.id ? { ...e, allowOfflineSelling: !e.allowOfflineSelling } : e)
      );
      return;
    }
    try {
      await ApiService.toggleOfflineSelling(emp.id, !emp.allowOfflineSelling);
      fetchEmployees();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (usingDemo || !window.confirm('Delete this employee?')) return;
    try {
      await ApiService.deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#FAF8F1] font-serif">Employee Management</h1>
          <p className="text-gray-400 text-base mt-1">Manage staff, roles, and offline POS selling permissions</p>
        </div>
        <div className="flex items-center gap-3">
          {usingDemo && (
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
              Demo Data
            </span>
          )}
          <button onClick={openAdd} className="flex items-center gap-2 bg-[#D4A373] text-[#071B14] px-5 py-3 rounded-xl font-bold hover:bg-[#E5B887] transition-colors cursor-pointer">
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl flex items-center gap-2 text-sm">
          <ShieldAlert size={18} /> {errorMsg}
        </div>
      )}

      <div className="bg-[#0A261C] border border-[#2D6A4F]/30 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b border-[#2D6A4F]/30 text-gray-400 text-xs uppercase tracking-wider bg-[#071B14]/50">
              <th className="py-4 px-6">Employee</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4">Role</th>
              <th className="py-4 px-4">Offline Selling</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="py-12 text-center text-gray-500">Loading employees...</td></tr>
            ) : employees.map((emp) => {
              const RoleIcon = ROLE_ICONS[emp.role] || UserCheck;
              return (
                <tr key={emp.id} className="border-b border-[#2D6A4F]/20 hover:bg-[#071B14]/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center font-bold">
                        {emp.name?.charAt(0)}
                      </div>
                      <span className="text-[#FAF8F1] font-semibold">{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{emp.email}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${ROLE_COLORS[emp.role] || ROLE_COLORS.EMPLOYEE}`}>
                      <RoleIcon size={12} />
                      {emp.role?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleOffline(emp)}
                      className="flex items-center gap-2 cursor-pointer group"
                      title={emp.allowOfflineSelling !== false ? 'Offline selling enabled' : 'Offline selling disabled'}
                    >
                      {emp.allowOfflineSelling !== false ? (
                        <>
                          <ToggleRight size={28} className="text-emerald-400" />
                          <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                            <WifiOff size={14} /> Enabled
                          </span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={28} className="text-gray-600" />
                          <span className="text-gray-500 text-sm">Disabled</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button onClick={() => handleToggleActive(emp)} className="cursor-pointer">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${emp.active !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {emp.active !== false ? 'Active' : 'Archived'}
                      </span>
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(emp)} className="p-2 rounded-lg bg-[#071B14] text-gray-400 hover:text-[#D4A373] cursor-pointer"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(emp.id)} className="p-2 rounded-lg bg-[#071B14] text-gray-400 hover:text-rose-400 cursor-pointer"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0A261C] border border-[#2D6A4F]/40 rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#FAF8F1] mb-4">{editing ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#071B14] border border-[#2D6A4F]/40 rounded-xl py-3 px-4 text-white" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[#071B14] border border-[#2D6A4F]/40 rounded-xl py-3 px-4 text-white" />
              {!editing && (
                <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-[#071B14] border border-[#2D6A4F]/40 rounded-xl py-3 px-4 text-white" />
              )}
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-[#071B14] border border-[#2D6A4F]/40 rounded-xl py-3 px-4 text-white">
                <option value="EMPLOYEE">Employee</option>
                <option value="KITCHEN_STAFF">Kitchen Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
              <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.allowOfflineSelling} onChange={(e) => setForm({ ...form, allowOfflineSelling: e.target.checked })} className="w-4 h-4" />
                <span className="flex items-center gap-2"><WifiOff size={16} className="text-[#D4A373]" /> Allow offline POS selling</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-[#D4A373] text-[#071B14] font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2"><Check size={16} /> Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-[#071B14] text-gray-400 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2"><X size={16} /> Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
