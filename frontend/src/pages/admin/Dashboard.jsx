import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShoppingBag, DollarSign, Users, Utensils } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import OrdersTable from '../../components/admin/OrdersTable';
import ProductList from '../../components/admin/ProductList';
import CafeFloorStatus from '../../components/admin/CafeFloorStatus';
import QuickActions from '../../components/admin/QuickActions';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const dashboardRef = useRef(null);

  useEffect(() => {
    // Live Clock
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Entrance Animation
    gsap.fromTo(
      dashboardRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  // Dummy Data
  const recentOrders = [
    { id: '1042', customer: 'Rahul Sharma', table: '4', amount: 850, status: 'Completed' },
    { id: '1043', customer: 'Priya Patel', table: '2', amount: 420, status: 'Preparing' },
    { id: '1044', customer: 'Amit Singh', table: '7', amount: 1200, status: 'Pending' },
    { id: '1045', customer: 'Sneha Verma', table: '1', amount: 350, status: 'Cancelled' },
    { id: '1046', customer: 'Vikram Mehta', table: '5', amount: 960, status: 'Completed' },
  ];

  const topProducts = [
    { id: 1, name: 'Cappuccino', category: 'Coffee', revenue: 15400, salesCount: 142, image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=150&q=80' },
    { id: 2, name: 'Margherita Pizza', category: 'Pizza', revenue: 24500, salesCount: 98, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=150&q=80' },
    { id: 3, name: 'Masala Chai', category: 'Tea', revenue: 8600, salesCount: 215, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150&q=80' },
    { id: 4, name: 'Fudge Brownie', category: 'Dessert', revenue: 12000, salesCount: 120, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=150&q=80' },
  ];

  const chartData = [40, 70, 45, 90, 65, 85, 120];

  return (
    <div ref={dashboardRef} className="space-y-8 pb-12">
      {/* SECTION 1: Header & Clock */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-[#0A261C]/40 backdrop-blur-sm p-6 rounded-[24px] border border-[#D4A373]/10">
        <div>
          <h1 className="text-3xl font-bold text-[#FAF8F1] font-serif tracking-wide">Good Morning, Admin</h1>
          <p className="text-gray-400 text-sm mt-2 tracking-wide">Manage your cafe operations from one central hub.</p>
        </div>
        <div className="text-right">
          <p className="text-[#D4A373] font-semibold tracking-widest uppercase text-sm mb-1">{formatDate(time)}</p>
          <p className="text-2xl font-bold font-serif text-[#FAF8F1] tracking-wider">{formatTime(time)}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={124500} 
          icon={DollarSign} 
          trend="up" 
          trendValue="+12.5%" 
          prefix="₹" 
          delay={0.1}
        />
        <StatsCard 
          title="Total Orders" 
          value={854} 
          icon={ShoppingBag} 
          trend="up" 
          trendValue="+8.2%" 
          delay={0.2}
        />
        <StatsCard 
          title="Active Tables" 
          value={12} 
          icon={Utensils} 
          trend="down" 
          trendValue="-2" 
          suffix="/20" 
          delay={0.3}
        />
        <StatsCard 
          title="Total Customers" 
          value={3240} 
          icon={Users} 
          trend="up" 
          trendValue="+18.4%" 
          delay={0.4}
        />
      </div>

      {/* SECTION 7: Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Chart + Orders) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* SECTION 6: Sales Analytics Chart (CSS Dummy) */}
          <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-[24px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#FAF8F1] font-semibold font-serif text-xl tracking-wide">Revenue Trend</h2>
              <div className="flex gap-2 bg-[#071B14] p-1 rounded-lg border border-[#D4A373]/20">
                <button className="px-3 py-1 text-xs font-medium bg-[#2D6A4F]/40 text-[#D4A373] rounded-md">Daily</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white">Weekly</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white">Monthly</button>
              </div>
            </div>
            
            <div className="h-64 w-full flex items-end justify-between gap-2 md:gap-4 mt-8 px-2 md:px-6">
              {chartData.map((height, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-3 group">
                  <div 
                    className="w-full bg-[#2D6A4F]/40 hover:bg-[#D4A373] rounded-t-sm transition-all duration-300 relative"
                    style={{ height: `${height}%`, maxHeight: '100%' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#D4A373] text-[#071B14] text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{height * 1000}
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs font-medium">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: Recent Orders */}
          <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-[24px]">
            <div className="p-6 border-b border-[#D4A373]/10 flex justify-between items-center">
              <h2 className="text-[#FAF8F1] font-semibold font-serif text-xl tracking-wide">Recent Orders</h2>
              <button className="text-[#D4A373] hover:text-white text-sm font-medium transition-colors hover:underline">
                View All
              </button>
            </div>
            <div className="p-2">
              <OrdersTable orders={recentOrders} />
            </div>
          </div>

        </div>

        {/* Right Column (Floor + Products) */}
        <div className="space-y-8">
          {/* SECTION 3: Cafe Floor Status */}
          <CafeFloorStatus />

          {/* SECTION 5: Top Products */}
          <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-[24px] h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#FAF8F1] font-semibold font-serif text-xl tracking-wide">Top Products</h2>
            </div>
            <ProductList products={topProducts} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
