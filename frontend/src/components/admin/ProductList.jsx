
const ProductList = ({ products }) => {
  const maxRevenue = Math.max(...products.map(p => p.revenue));

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="flex flex-col p-4 rounded-xl hover:bg-[#2D6A4F]/10 transition-colors border border-transparent hover:border-[#D4A373]/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-[#2D6A4F]/30 bg-black/50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#FAF8F1] font-medium tracking-wide">{product.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[#FAF8F1] font-semibold tracking-wide">₹{product.revenue.toLocaleString('en-IN')}</p>
              <p className="text-gray-400 text-xs mt-0.5">{product.salesCount} Sales</p>
            </div>
          </div>
          
          {/* Revenue Progress Bar */}
          <div className="mt-4 w-full h-1.5 bg-[#071B14] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4A373] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
