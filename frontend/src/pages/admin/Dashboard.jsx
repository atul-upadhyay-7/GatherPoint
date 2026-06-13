import { ShoppingBag, DollarSign, Users, Utensils } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import OrdersTable from '../../components/admin/OrdersTable';
import ProductList from '../../components/admin/ProductList';

const Dashboard = () => {
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAF8F1] font-serif">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back to BrewBaithak admin panel.</p>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Chart + Orders) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sales Analytics Chart (CSS Dummy) */}
          <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#FAF8F1] font-semibold font-serif text-lg">Sales Analytics</h2>
              <select className="bg-[#071B14] border border-[#2D6A4F]/50 text-gray-300 text-sm rounded-lg px-3 py-1 outline-none">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
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

          {/* Recent Orders */}
          <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl">
            <div className="p-6 border-b border-[#2D6A4F]/30 flex justify-between items-center">
              <h2 className="text-[#FAF8F1] font-semibold font-serif text-lg">Recent Orders</h2>
              <button className="text-[#D4A373] hover:text-white text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <OrdersTable orders={recentOrders} />
          </div>

        </div>

        {/* Right Column (Top Products) */}
        <div className="bg-[#0A261C]/60 backdrop-blur-md border border-[#D4A373]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 rounded-2xl h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#FAF8F1] font-semibold font-serif text-lg">Top Products</h2>
          </div>
          <ProductList products={topProducts} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
