import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logo from './customer/Logo';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'POS Terminal', href: '/pos', icon: '🛒' },
    { name: 'Orders', href: '/orders', icon: '📋' },
    { name: 'Customers', href: '/customers', icon: '👥' },
    { name: 'Tables', href: '/tables', icon: '🪑' },
    { name: 'Kitchen', href: '/kitchen', icon: '🍳' },
    { name: 'Reports', href: '/reports', icon: '📊' },
    { name: 'Session', href: '/session', icon: '🔐' },
    { name: 'Admin', href: '/admin', icon: '⚙️', admin: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex text-base">
      <aside className="w-72 shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="px-7 py-6 border-b border-gray-700 flex items-center gap-4">
          <Logo className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-[#D4AF37] font-cinzel">GatherPoint</h1>
        </div>

        <nav className="flex-1 px-5 py-6 space-y-2">
          {navigation.map((item) => {
            if (item.admin && user?.role !== 'ADMIN') return null;
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold shadow-lg shadow-[#D4AF37]/5'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/60 border border-transparent'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-base">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-6 border-t border-gray-700">
          <div className="flex items-center gap-4 mb-5 px-2">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-base">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase()?.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={async () => { await logout(); navigate('/staff-pos'); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors text-base cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-900/50">
        {children || <Outlet />}
      </main>
    </div>
  );
}
