import { DollarSign } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FAF8F1] font-serif">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm mt-1">View revenue reports and export data.</p>
        </div>
        <button className="bg-[#0A261C] border border-[#D4A373] text-[#D4A373] px-4 py-2 rounded-lg font-bold hover:bg-[#D4A373]/10 transition-colors">
          Export CSV
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Daily Revenue" 
          value={12500} 
          icon={DollarSign} 
          trend="up" 
          trendValue="+5.2%" 
          prefix="₹" 
          delay={0.1}
        />
        <StatsCard 
          title="Weekly Revenue" 
          value={84200} 
          icon={DollarSign} 
          trend="up" 
          trendValue="+12.1%" 
          prefix="₹" 
          delay={0.2}
        />
        <StatsCard 
          title="Monthly Revenue" 
          value={345000} 
          icon={DollarSign} 
          trend="down" 
          trendValue="-2.4%" 
          prefix="₹" 
          delay={0.3}
        />
      </div>

      <div className="bg-[#0A261C] border border-[#2D6A4F]/30 p-12 rounded-2xl text-center mt-6">
        <h3 className="text-gray-400">Detailed reporting charts will go here.</h3>
      </div>
    </div>
  );
};

export default Reports;
