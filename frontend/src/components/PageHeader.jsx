export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#8A6623]">
          {title}
        </h1>
        {subtitle && <p className="text-gray-400 text-base mt-2">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-4 shrink-0">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, color = 'gold', subtext }) {
  const colors = {
    gold: 'from-[#D4AF37]/20 to-[#8A6623]/10 border-[#D4AF37]/30 text-[#D4AF37]',
    green: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-6 flex items-center gap-5 min-h-[110px]`}>
      {Icon && (
        <div className="p-3.5 rounded-xl bg-black/20 shrink-0">
          <Icon size={28} strokeWidth={2} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-3xl font-bold text-white mt-1.5 leading-tight">{value}</p>
        {subtext && <p className="text-gray-500 text-sm mt-1.5">{subtext}</p>}
      </div>
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      Demo Data
    </span>
  );
}

export function SectionCard({ title, icon: Icon, children, action }) {
  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl overflow-hidden">
      {(title || action) && (
        <div className="px-7 py-5 border-b border-gray-700/40 flex justify-between items-center gap-4">
          {title && (
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              {Icon && <Icon size={22} className="text-[#D4AF37]" />}
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      <div className="p-7">{children}</div>
    </div>
  );
}

export function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
        active
          ? 'bg-[#cfad56] text-black shadow-lg shadow-[#D4AF37]/20'
          : 'bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600'
      }`}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#b8943f] text-black font-bold text-base hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
