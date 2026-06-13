const Tables = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FAF8F1] font-serif">Table Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage restaurant seating and table status.</p>
        </div>
        <button className="bg-[#D4A373] text-[#071B14] px-4 py-2 rounded-lg font-bold hover:bg-[#E5B887] transition-colors">
          + Add Table
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Dummy Table Cards */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-[#0A261C] border border-[#2D6A4F]/30 p-6 rounded-2xl flex flex-col items-center justify-center gap-2">
            <div className="text-3xl font-bold text-[#FAF8F1] font-serif">T{i}</div>
            <div className="text-sm text-gray-400">4 Seats</div>
            <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 mt-2">
              Available
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
