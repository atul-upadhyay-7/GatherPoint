import { useState } from 'react';
import {
  Users, UtensilsCrossed, Tag, Settings, Plus, Edit2, Trash2,
  Shield, ChefHat, UserCheck, ToggleLeft, ToggleRight,
} from 'lucide-react';
import PageHeader, { StatCard, DemoBadge, FilterButton, PrimaryButton } from './PageHeader';
import {
  demoStaff, demoProducts, demoCategories, demoPromotions, demoFloors,
} from '../data/demoData';

const TABS = [
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed },
  { id: 'categories', label: 'Categories', icon: Tag },
  { id: 'promotions', label: 'Promotions', icon: Tag },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const ROLE_COLORS = {
  ADMIN: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  EMPLOYEE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  KITCHEN_STAFF: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const ROLE_ICONS = {
  ADMIN: Shield,
  EMPLOYEE: UserCheck,
  KITCHEN_STAFF: ChefHat,
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('staff');
  const [staff, setStaff] = useState(demoStaff);
  const [promotions, setPromotions] = useState(demoPromotions);

  const toggleStaffActive = (id) => {
    setStaff((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  };

  const togglePromotion = (id) => {
    setPromotions((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage staff, menu, promotions, and system settings"
        actions={<DemoBadge />}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Staff" value={staff.length} icon={Users} color="gold" />
        <StatCard label="Menu Items" value={demoProducts.length} icon={UtensilsCrossed} color="green" />
        <StatCard label="Categories" value={demoCategories.length} icon={Tag} color="blue" />
        <StatCard label="Active Promos" value={promotions.filter((p) => p.active).length} icon={Tag} color="rose" />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <FilterButton key={id} active={activeTab === id} onClick={() => setActiveTab(id)}>
            <span className="flex items-center gap-2"><Icon size={18} />{label}</span>
          </FilterButton>
        ))}
      </div>

      {/* Staff Management */}
      {activeTab === 'staff' && (
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden">
          <div className="px-7 py-5 border-b border-gray-700/40 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Staff Management</h2>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#cfad56] text-black text-sm font-bold cursor-pointer">
              <Plus size={18} /> Add Staff
            </button>
          </div>
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b border-gray-700/40 text-gray-400 font-bold uppercase text-xs tracking-wider bg-gray-800/50">
                <th className="py-4 px-7">Name</th>
                <th className="py-4 px-5">Email</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5">Joined</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => {
                const RoleIcon = ROLE_ICONS[member.role] || UserCheck;
                return (
                  <tr key={member.id} className="border-b border-gray-700/20 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-7">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <span className="text-white font-semibold">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-400">{member.email}</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${ROLE_COLORS[member.role]}`}>
                        <RoleIcon size={12} />
                        {member.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-400">{member.joinedAt}</td>
                    <td className="py-4 px-5">
                      <button onClick={() => toggleStaffActive(member.id)} className="cursor-pointer">
                        {member.active
                          ? <ToggleRight size={28} className="text-emerald-400" />
                          : <ToggleLeft size={28} className="text-gray-600" />}
                      </button>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-[#D4AF37] cursor-pointer"><Edit2 size={18} /></button>
                        <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-rose-400 cursor-pointer"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Menu Items */}
      {activeTab === 'menu' && (
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden">
          <div className="px-7 py-5 border-b border-gray-700/40 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Menu Items</h2>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#cfad56] text-black text-sm font-bold cursor-pointer">
              <Plus size={18} /> Add Item
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-7">
            {demoProducts.map((product) => {
              const cat = demoCategories.find((c) => c.id === product.categoryId);
              return (
                <div key={product.id} className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-5 flex items-start gap-4">
                  <span className="text-4xl">{product.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-base">{product.productName}</p>
                    <p className="text-gray-500 text-sm mt-1">{cat?.icon} {cat?.name}</p>
                    <p className="text-[#D4AF37] font-bold text-lg mt-2">₹{product.price}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {product.available ? 'Active' : 'Unavailable'}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#D4AF37] cursor-pointer"><Edit2 size={16} /></button>
                      <button className="p-2 text-gray-500 hover:text-rose-400 cursor-pointer"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demoCategories.map((cat) => {
            const count = demoProducts.filter((p) => p.categoryId === cat.id).length;
            return (
              <div key={cat.id} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 flex items-center gap-5">
                <span className="text-4xl">{cat.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{cat.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{count} items</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-[#D4AF37] cursor-pointer"><Edit2 size={18} /></button>
                  <button className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-rose-400 cursor-pointer"><Trash2 size={18} /></button>
                </div>
              </div>
            );
          })}
          <button className="border-2 border-dashed border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all cursor-pointer min-h-[120px]">
            <Plus size={32} />
            <span className="text-sm font-bold">Add Category</span>
          </button>
        </div>
      )}

      {/* Promotions */}
      {activeTab === 'promotions' && (
        <div className="space-y-5">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 flex items-center gap-5">
              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <Tag size={24} className="text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-lg">{promo.name}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {promo.discountType === 'PERCENTAGE' ? `${promo.discount}% off` : 'Free item'} · Valid until {promo.validUntil}
                </p>
              </div>
              <button onClick={() => togglePromotion(promo.id)} className="cursor-pointer">
                {promo.active
                  ? <ToggleRight size={32} className="text-emerald-400" />
                  : <ToggleLeft size={32} className="text-gray-600" />}
              </button>
              <div className="flex gap-2">
                <button className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-[#D4AF37] cursor-pointer"><Edit2 size={18} /></button>
                <button className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-rose-400 cursor-pointer"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-5">
          {[
            { label: 'Restaurant Name', value: 'GatherPoint Premium Dining', type: 'text' },
            { label: 'Address', value: '123 Dining Street, Cloud City', type: 'text' },
            { label: 'Phone', value: '+91 98765 43210', type: 'text' },
            { label: 'Tax Rate (%)', value: '5', type: 'number' },
            { label: 'Currency', value: 'INR (₹)', type: 'text' },
            { label: 'Opening Hours', value: '8:00 AM — 11:00 PM', type: 'text' },
          ].map((field) => (
            <div key={field.label} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
              <label className="text-sm text-gray-500 uppercase tracking-wider font-bold">{field.label}</label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full mt-3 bg-gray-900 border border-gray-700 rounded-xl py-3.5 px-4 text-white text-base focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          ))}

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Floors & Layout</h3>
            <div className="space-y-3">
              {demoFloors.map((floor) => (
                <div key={floor.id} className="flex items-center justify-between bg-gray-900/60 rounded-xl p-4 border border-gray-700/30">
                  <span className="text-white text-base font-medium">{floor.name}</span>
                  <span className="text-gray-500 text-sm">{floor.tableCount} tables</span>
                </div>
              ))}
            </div>
          </div>

          <PrimaryButton className="w-full">Save Settings</PrimaryButton>
        </div>
      )}
    </div>
  );
}
