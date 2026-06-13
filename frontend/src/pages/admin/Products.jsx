const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#FAF8F1] font-serif">Product Management</h1>
          <p className="text-gray-400 text-sm mt-1">Add, edit, or remove menu items.</p>
        </div>
        <button className="bg-[#D4A373] text-[#071B14] px-4 py-2 rounded-lg font-bold hover:bg-[#E5B887] transition-colors">
          + Add Product
        </button>
      </div>
      
      <div className="bg-[#0A261C] border border-[#2D6A4F]/30 p-12 rounded-2xl text-center">
        <h3 className="text-gray-400">Product management interface will go here.</h3>
      </div>
    </div>
  );
};

export default Products;
