

const ProductList = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="flex items-center justify-between p-3 rounded-xl hover:bg-[#2D6A4F]/10 transition-colors border border-transparent hover:border-[#2D6A4F]/30 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-[#2D6A4F]/30 bg-black/50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-[#FAF8F1] font-medium">{product.name}</h4>
              <p className="text-xs text-gray-400">{product.category}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[#FAF8F1] font-medium">₹{product.revenue.toLocaleString()}</div>
            <div className="text-xs text-gray-400">{product.salesCount} Sales</div>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No top products available.
        </div>
      )}
    </div>
  );
};

export default ProductList;
