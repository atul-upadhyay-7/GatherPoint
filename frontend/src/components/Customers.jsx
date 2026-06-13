import { useState, useEffect } from 'react';
import ApiService from '../services/apiService';
import { Plus, Edit2, Trash2, Search, User, Mail, Phone, Check, X, ShieldAlert } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form modals state
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await ApiService.getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load customers directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenModal = (customer = null) => {
    setSelectedCustomer(customer);
    setName(customer ? customer.name : '');
    setEmail(customer ? customer.email : '');
    setPhone(customer ? customer.phone : '');
    setShowModal(true);
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setErrorMsg('');
      const customerData = { name, email, phone };
      if (selectedCustomer) {
        await ApiService.updateCustomer(selectedCustomer.id, customerData);
      } else {
        await ApiService.createCustomer(customerData);
      }
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save customer.');
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      setErrorMsg('');
      await ApiService.deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete customer.');
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#8A6623]">
            Customers Directory
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage customer profiles and contacts for email receipts</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
        >
          <Plus size={14} /> Add Customer
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3 text-sm">
          <ShieldAlert size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex gap-4 justify-between items-center bg-gray-800/40 p-4 rounded-3xl border border-gray-700/40">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
            placeholder="Search by Name, Email, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-xs">Loading directory database...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/25 border border-gray-700/30 rounded-3xl">
          <User className="mx-auto text-gray-600 mb-2" size={40} />
          <p className="text-gray-400 font-bold text-sm">No Customers Found</p>
          <p className="text-gray-600 text-xs mt-1">Add a new customer profile to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-5 bg-gray-800/40 border border-gray-700/30 hover:border-[#D4AF37]/40 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-[#D4AF37] border border-gray-600/40">
                    {customer.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-tight">{customer.name}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">ID: #{customer.id}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-600" />
                    <span>{customer.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-600" />
                    <span>{customer.phone || 'No phone number'}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-1.5 pt-4 mt-4 border-t border-gray-700/30">
                <button
                  onClick={() => handleOpenModal(customer)}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-700/50 hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-800 border border-gray-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
              <h3 className="text-lg font-bold text-white">
                {selectedCustomer ? 'Edit Customer' : 'Add Customer Profile'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl border border-gray-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#cfad56] hover:bg-[#b8943f] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}